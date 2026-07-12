import type { Side } from "./userlist";

export type Bid = {
    orderId: string,
    userId: string,
    side: Side,
    filledQty: string,
    remainingQty: string,
    symbol: string,
    price: string,
    createdAt: Date
}

type Orderbook = {
    bids: Map<string, Bid[]>,
    asks: Map<string, Bid[]>,
}

export const Orderbooks: Map<string, Orderbook> = new Map<string, Orderbook>();


 