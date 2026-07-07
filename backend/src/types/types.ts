export type ToEngine = {
    messageType: "create_order"
    "userId": string,
    "symbol": "BTC-PERP",
    "side": "long" | "short",
    "type": "limit" | "market",
    "price": number,
    "quantity": number,
    "leverage": number,
    "postOnly": false
} | {
    messageType: "create_user",
    userId: string,
    initialBalance: number
} | {
    messageType: "reset_store",
}


export type create_order = {
    "userId": string,
    "symbol": "BTC-PERP",
    "side": "long" | "short",
    "type": "limit" | "market",
    "price": number,
    "quantity": number,
    "leverage": number,
    "postOnly": false
}

