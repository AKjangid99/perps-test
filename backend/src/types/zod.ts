import { z } from "zod";
import { Side, Types } from "../strore/userlist";

export const addBalanceSchema = z.object({
    amount : z.string().trim(),
    sym : z.string().trim()
})

export const authSchema = z.object ({
    "username" : z.string().trim().min(1),
    "password" : z.string().trim().min(1)
})


export const placeorderSchema = z.object({
    "symbol": z.string().trim().min(1),
    "side": z.enum(Side),
    "type": z.enum(Types),
    "price": z.string().trim(),
    "quantity": z.string().trim(),
    "leverage": z.string().trim(),
})