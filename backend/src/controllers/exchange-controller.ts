import type { Request, Response } from "express";
import { addBalanceSchema, createOrderSchema } from "../types/zod";
import { sendToEngine } from "../utils/client-engine";

function getUserId(req: Request): string {
    if (!req.Id) throw new Error("Missing authenticated user");
    return req.Id;
}



export async function addbalance(req: Request, res: Response) {
    const userId = getUserId(req)
    let parsedData = addBalanceSchema.safeParse(req.body)

    if (!parsedData.success) {
        res.status(400).json({
            success: false,
            error: "Invalid Engine Response"
        })
        return;
    }
    let { amount, sym } = parsedData.data

    const engineResponse = await sendToEngine("addBalance", { userId, amount, sym })

    res.status(engineResponse.ok ? 200 : 400).json(engineResponse.ok ? engineResponse.data : {
        error: engineResponse.error,
    });
}


export async function createOrder(req: Request, res: Response) {

    const userId = getUserId(req);

    let parsedBody = createOrderSchema.safeParse(req.body)
    if (!parsedBody.success) {
        res.status(400).json({
            success: false,
            error: "Invalid Engine Response"
        })
        return;
    }

    const { type, side, price, qty, symbol } = parsedBody.data

    const engineResponse = await sendToEngine("createOrder",
        {
            userId,
            type,
            side,
            symbol,
            price,
            qty,
        }
    )

    res.status(engineResponse.ok ? 200 : 400).json(engineResponse.ok ? engineResponse.data : {
        error: engineResponse.error,
    });
}



export async function cancelOrder(req: Request, res: Response) {

}

export async function getDepth(req: Request, res: Response) {

}



export async function getUserBalance(req: Request, res: Response) {

}

export async function getOrder(req: Request, res: Response) {

}

