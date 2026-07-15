import type { Side } from "./userlist";

export type RestingOrder = {
    orderId: string,
    userId: string,
    side: Side,
    filledQty: string,
    remainingQty: string,
    symbol: string,
    price: string,
    createdAt: Date
}

type OrderBook = {
    bids: Map<string, RestingOrder[]>,
    asks: Map<string, RestingOrder[]>,
}

export const ORDERBOOKS: Map<string, OrderBook> = new Map<string, OrderBook>();