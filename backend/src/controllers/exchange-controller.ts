import type { Request, Response } from "express";
import { addBalanceSchema, placeorderSchema } from "../types/zod";
import { wallet } from "../class/wallet";
import type { Create_order, Fills } from "../types/types";
import { OrderStatus, walletData, type Order } from "../strore/userlist"; 
import { addStrings, claculateMargin, compareStringNumbers, SubtractStrings } from "../utils/stringCalculation";
import { Orderbooks, type Bid } from "../strore/exchange-store";
import { sortNumericStringsAsce, sortNumericStringsDesc } from "../utils/shortStringArray";

export async function addbalance(req : Request, res : Response){

    let parsedData = addBalanceSchema.safeParse(req.body)
    const userId = req.Id;

    if (!parsedData.success) {
        res.status(400).json({
            success: false,
            error: "Invalid Engine Response"
        })
        return;
    }
    let body = parsedData.data

    wallet.createWallet( userId! )
    wallet.addBalance( userId!, body.amount )

    res.status(200).json({
        success : true, 
        msg : "Balance added to your wallet"
    })
} 


export async function createOrder ( req : Request, res : Response){
 
    let parsedData = placeorderSchema.safeParse(req.body)
    let userId :string  = req.Id!;
    if ( !parsedData.success ){
        res.status(400).json({
            success: false,
            error: "Invalid Engine Response"
        })
        return;
    }
    let body : Create_order = { userId , ...parsedData.data}  
    await performExchange(body)
}




async function performExchange( body : Create_order ){

   const balance = walletData.get(body.userId);
    if (!balance) {
        return {
            status: 404,
            msg: "Wallet not found"
        };
    }
    const userbalance = balance.availble;

    let margin = claculateMargin(body.quantity , body.price , body.leverage)
    if( compareStringNumbers( userbalance , margin , "<" )  ) {
        return { 
            status : 201 ,
            msg : "Insuffisient Balance"
        }
    }
    
    wallet.lockBalance( body.userId , margin)
    let newOrder : Order = {
        orderId: crypto.randomUUID(),
        userId: body.userId,
        status: OrderStatus.Open,
        side: body.side,
        type: body.type,
        quantity: body.quantity,
        filledQty: "0",
        price: body.price,
        symbol: body.symbol,
        createdAt: new Date(),
        leverage: body.leverage,
    }
    let newbid : Bid ={
          orderId: newOrder.orderId,
            userId: newOrder.userId,
            side: newOrder.side,
            filledQty: newOrder.filledQty,
            remainingQty:body.quantity ,
            symbol:  newOrder.symbol,
            price: newOrder.price,
            createdAt: new Date()
    }
      
    if ( body.type == "limit" ) {

        if (body.side == "long") {
            if( !Orderbooks.has( body.symbol ) ) {
                return {
                    status : 404 , 
                    msg : "market not found"
                }
            }   
            
            const orderBook =Orderbooks.get(body.symbol)
            if (!orderBook) {
                 return {
                    status : 404 , 
                    msg : "Orderbook not found"
                }
             }

            let asksKeysArray : string [] = [ ...orderBook.asks.keys()]
            let bestPriceArray : string[] =  await sortNumericStringsAsce( asksKeysArray )
            
            if ( bestPriceArray.length !== 0 || compareStringNumbers( bestPriceArray[0]! , newOrder.price, "<=" ) ){

                matchBestprice( newOrder , bestPriceArray )
            }else {
                let oldBids =  Orderbooks.get(body.symbol)?.bids.get(body.price)
                 oldBids ? Orderbooks.get(body.symbol)?.bids.set(body.price ,[ ...oldBids, newbid ]) : Orderbooks.get(body.symbol)?.bids.set( body.price ,[ newbid ])
            } 
        }
        if( body.side == "short" ) {
              if( !Orderbooks.has( body.symbol ) ) {
                return {
                    status : 404 , 
                    msg : "market not found"
                }
            }   
            const orderBook =Orderbooks.get(body.symbol)
            if (!orderBook) {
                 return {
                    status : 404,
                    msg : "Orderbook not found"
                }
             }

            let bidsKeysArray : string [] = [ ...orderBook.bids.keys()]
            let bestPriceArray : string[] =  await sortNumericStringsDesc( bidsKeysArray )
            if ( bestPriceArray.length !== 0 || compareStringNumbers( bestPriceArray[0]! , newOrder.price, "<=" ) ){
                matchBestprice( newOrder , bestPriceArray )
            }else {
                let oldAsks =  Orderbooks.get(body.symbol)?.asks.get(body.price)
                 oldAsks ? Orderbooks.get(body.symbol)?.asks.set(body.price ,[ ...oldAsks, newbid ]) : Orderbooks.get(body.symbol)?.asks.set( body.price ,[ newbid ])
            }            
        }

    }else {
        if ( body.side ==  "long") { 
               const orderBook =Orderbooks.get(body.symbol)
            if (!orderBook) {
                 return {
                    status : 404 , 
                    msg : "Orderbook not found"
                }
             }

            let asksKeysArray : string [] = [ ...orderBook.asks.keys()]
            let bestPriceArray : string[] =  await sortNumericStringsAsce( asksKeysArray )
            matchBestprice( newOrder ,bestPriceArray ) 
        }
        else {
             const orderBook =Orderbooks.get(body.symbol)
            if (!orderBook) {
                 return {
                    status : 404,
                    msg : "Orderbook not found"
                }
             }

            let bidsKeysArray : string [] = [ ...orderBook.bids.keys()]
            let bestPriceArray : string[] =  await sortNumericStringsDesc( bidsKeysArray )

            matchBestprice( newOrder , bestPriceArray )
        }
    }
}

function matchBestprice( order : Order , bestPriceArray : string[]  ){

    let isBuyer = order.side== "long" ? true : false 
    let counterSide : "asks" | "bids" = isBuyer ? "asks" : "bids"
    const orderBook = Orderbooks.get(order.symbol);
    let fills: Fills[] = [];

    if (!orderBook) return;

    let remainingQty = order.quantity;

   for (let i = 0; i < bestPriceArray.length; i++) {

    const currentPriceStr : string = bestPriceArray[i]!;
    
    if (isBuyer) {
            if (compareStringNumbers(currentPriceStr, order.price, ">")) break;
        } else {
            if (compareStringNumbers(currentPriceStr, order.price, "<")) break;
        }
        
        let counterOrders = orderBook[counterSide].get(currentPriceStr) ?? [];

       while (counterOrders.length > 0 && compareStringNumbers(remainingQty, "0", ">")) {
        let makerOrder = counterOrders[0];

        if ( !makerOrder) {
            return;
        }

        let matchqty = compareStringNumbers( remainingQty , makerOrder.remainingQty, "<" ) ? remainingQty : makerOrder.remainingQty

        makerOrder.remainingQty = SubtractStrings( makerOrder.remainingQty , matchqty)
        makerOrder.filledQty = addStrings( makerOrder.filledQty , matchqty)

        remainingQty = SubtractStrings( remainingQty , matchqty )
        order.filledQty = addStrings( order.filledQty , matchqty ); 

        fills.push({
                makerId: makerOrder.userId,
                takerId: order.userId,
                quantity: matchqty,
                price: currentPriceStr,
                makerOrderId: makerOrder.orderId,
                takerOrderId: order.orderId,
                symbol: order.symbol,
                long: isBuyer ? order.userId : makerOrder.userId,
                short: isBuyer ? makerOrder.userId : order.userId
            });

        if (compareStringNumbers(makerOrder.remainingQty, "0", "==")) {
                counterOrders.shift(); 
            }           
        }


        if (counterOrders.length === 0) {
            orderBook[counterSide].delete(currentPriceStr);
        } else {
            orderBook[counterSide].set(currentPriceStr, counterOrders);
        }
        
    }
    if (compareStringNumbers(remainingQty, "0", "==")) {
        order.status = OrderStatus.Filled;
    } else {
        order.status = compareStringNumbers(order.filledQty, "0", ">") 
            ? OrderStatus.PartiallyFilled 
            : OrderStatus.Open;

        // ONLY Limit orders rest in the book if unfilled
        if (order.type === "limit") {
            let newBid: Bid = {
                orderId: order.orderId,
                userId: order.userId,
                side: order.side,
                filledQty: order.filledQty,
                remainingQty: remainingQty,
                symbol: order.symbol,
                price: order.price,
                createdAt: new Date()
            };

            let mySide: "asks" | "bids" = isBuyer ? "bids" : "asks";
            let existingOrders = orderBook[mySide].get(order.price) ?? [];
            orderBook[mySide].set(order.price, [...existingOrders, newBid]);
        } else {
            // Market orders that run out of liquidity are cancelled/expired immediately
            order.status = OrderStatus.Cancelled;
        }


        
    }

}
