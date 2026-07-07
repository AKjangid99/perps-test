import { z } from "zod";

export const userschema = z.object({
    "userId": z.string().trim().min(1),
    "initialBalance": z.number
})

export const authSchema = z.object ({
    "username" : z.string().trim().min(1),
    "password" : z.string().trim().min(1)
})

const side = z.enum(["short", "long"]);
const type = z.enum(["limit", "market"])
export const placeorder = z.object({
    "userId": z.string().trim().min(1),
    "symbol": z.string().trim().min(1),
    "side": side,
    "type": type,
    "price": z.number(),
    "quantity": z.number(),
    "leverage": z.number(),
    "postOnly": false
})