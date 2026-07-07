type Bid = {
    openOrders: { userId: number, qty: number, filledQty: number, orderId: number, createdAt: Date }[]
}

type Orderbook = {
    bids: Map<string, Bid>,
    asks: Map<string, Bid>,
}



export const Orderbooks : Map <string ,Orderbook> = new Map <string, Orderbook>()