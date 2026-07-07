import { z } from "zod";

export const addBalanceSchema = z.object({
    amount : z.string().trim(),
    sym : z.string().trim()
})

export const authSchema = z.object ({
    "username" : z.string().trim().min(1),
    "password" : z.string().trim().min(1)
})

const side = z.enum(["short", "long"]);
const type = z.enum(["limit", "market"])
export const placeorderSchema = z.object({
    "userId": z.string().trim().min(1),
    "symbol": z.string().trim().min(1),
    "side": side,
    "type": type,
    "price": z.string().trim(),
    "quantity": z.number(),
    "leverage": z.number(),
})