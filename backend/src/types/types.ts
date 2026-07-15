
export type ToEngine = {
    messageType: "create_order"
    "userId": string,
    "symbol": "BTC-PERP",
    "side": "long" | "short",
    "type": "limit" | "market",
    "price": string,
    "quantity": string,
    "leverage": string,
} | {
    messageType: "create_user",
    userId: string,
    initialBalance: string
} | {
    messageType: "",
}
