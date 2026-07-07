import type { Request, Response } from "express";
import { addBalanceSchema, placeorderSchema } from "../types/zod";
import { wallet } from "../class/wallet";

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
    
    if ( !parsedData.success ){
        res.status(400).json({
            success: false,
            error: "Invalid Engine Response"
        })
        return;
    }

    

    
}