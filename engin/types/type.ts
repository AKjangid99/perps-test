
import { Side, Types } from "../store/userlist"


export enum OrderStatus {
    Filled = "filled",
    PertilaFilled = "PartialFilled",
    Cancelled = "Canceeled",
    Open = "Open"
}

export type CreateOrder = {
    "userId": string,
    "symbol": string,
    "side": Side,
    "type": Types,
    "price": string,
    "quantity": string,
    "leverage": string,
}

export type cancelOrder = {
    userId: string,
    orderId: string,
    symbol: string
}

export type Order = {
    orderId: string,
    userId: string,
    status: OrderStatus,
    side: Side,
    type: Types,
    quantity: string,
    filledQty: string,
    price: string,
    symbol: string,
    createdAt: Date,
    leverage: string
}


export type Fills = {
    makerId: string,
    takerId: string,
    quantity: string,
    price: string,
    makerOrderId: string,
    takerOrderId: string,
    symbol: string,
    long: string,
    short: string
}