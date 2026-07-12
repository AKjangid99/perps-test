export const sellOrderPrice: number[] = []
export const buyOrderPrice: number[] = []

export type Payload = {
    userId: string,
    qty: number,
    price: number,
    side: "Sort" | "Long"
    lavrage: number
}

export type pricelevel = {
    userId: string,
    OrderId: string,
    qty: number,
    FilledQty: number,
    price: number,
    side: "Sort" | "Long"
}

export type Orderbook = {
    bids: Map<number, order[]>
    asks: Map<number, order[]>
}


export type order = {
    userId: string,
    OrderId: string,
    qty: number,
    FilledQty: number,
    price: number,
    side: "Sort" | "Long"
    lavrage: number,
    status: "filled" | "Open" | "cloased" | "parsiallyFilled"
}

export const asks: Map<number, order[]> = new Map<number, order[]>()
export const bids: Map<number, order[]> = new Map<number, order[]>()

export const orderBook: Orderbook = { asks, bids }


type Users = {
    userId: string,
    initialBalance: number
}

export const Userdetails: Users[] = []