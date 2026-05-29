import type { ToEngine } from "./types"
import  
    import { Userdetails } from "./storage";



export function engine(ToEngine: ToEngine) {

    switch (ToEngine.messageType) {
        case "create_user":
            createUser(ToEngine.userId, ToEngine.initialBalance)
            break;
    }
}



function createUser(userId: string, initialBalance: number) {

    Userdetails.push({ userId, initialBalance })

}


async function createOrder(payload: Payload) {

    CheckAndlockBalance(payload.userId, payload.lavrage, payload.qty, payload.price)

    const newOrder: order = {
        userId: payload.userId,
        OrderId: new Date().toISOString(),
        qty: payload.qty,
        FilledQty: 0,
        price: payload.price,
        side: payload.side,
        lavrage: payload.lavrage,
        status: "Open"
    }

    if (newOrder.side == "Long") {

        if (buyOrderPrice.length > 0 && newOrder.price <= buyOrderPrice[0]!) {



        } else {



            PushInOrderbook(newOrder.price, "acc")
            let bids = orderBook.bids.get(newOrder.price)
            bids!.push(newOrder)
            orderBook.bids.set(newOrder.price, bids!)
        }
    } else {

        if (sellOrderPrice.length > 0 && newOrder.price <= sellOrderPrice[0]!) {

            await matching(newOrder.price, newOrder.userId, newOrder.qty, newOrder.side)

        } else {
            PushInOrderbook(newOrder.price, "dec")
            let asks = orderBook.asks.get(newOrder.price)
            asks!.push(newOrder)
            orderBook.bids.set(newOrder.price, asks!)
        }

    }
}


function PushInOrderbook(price: number, sorttype: "acc" | "dec") {
    sellOrderPrice.push(price)
    sorttype ? sellOrderPrice.sort((a, b) => a - b) : sellOrderPrice.sort((a, b) => b - a)
}

function CheckAndlockBalance(userId: string, lavrage: number, qty: number, price: number): Boolean {

    let userbalance = balances.get(userId)
    let MI = price * qty / lavrage;
    if (userbalance!.amount < MI) {
        return false
    }
    userbalance!.amount = userbalance!.amount - MI
    userbalance!.lockedAmount = userbalance!.lockedAmount + MI
    return true
}


function matching(price: number, userId: string, qty: number, side: "Sort" | "Long") {


    while (qty == 0 || sellOrderPrice[0]! > price) {
        let lowestprice: number = sellOrderPrice[0]!
        let isbuyer: boolean = side == "Long"
        let OrdersatlowestPrice = isbuyer ? orderBook.asks.get(lowestprice)! : orderBook.bids!.get(lowestprice)!

        for (let i = 0; qty == 0 || OrdersatlowestPrice.length > 0; i++) {
            let exchangeOrder = OrdersatlowestPrice[i]!
            let minqty = Math.min(exchangeOrder?.price, qty);




        }


    }


}

createOrder(payload)