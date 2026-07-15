import { z } from "zod";


export enum Side {
    short = "short",
    long = "long"
};
export enum Types {
    limit = "limit",
    market = "market"
};

export const addBalanceSchema = z.object({
    amount: z.string().trim(),
    sym: z.string().trim()
})

export const authSchema = z.object({
    "username": z.string().trim().min(1),
    "password": z.string().trim().min(1)
})


export const createOrderSchema = z.object({
    "symbol": z.string().trim().min(1),
    "side": z.enum(Side),
    "type": z.enum(Types),
    "price": z.string().trim(),
    "qty": z.string().trim(),
    "leverage": z.string().trim(),
})

