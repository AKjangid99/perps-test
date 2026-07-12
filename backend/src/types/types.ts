import { Types, type Side } from "../strore/userlist"

export enum OrderStatus  {
    Filled = "filled" , 
    PertilaFilled = "PartialFilled",
    Cancelled = "Canceeled",
    Open = "Open"
} 

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


export type Create_order = {
    "userId": string,
    "symbol": string,
    "side": Side,
    "type": Types,
    "price": string,
    "quantity": string,
    "leverage": string ,
    // "postOnly": false
}

export type Fills = {
    makerId : string,
    takerId  : string,
    quantity : string,
    price : string,
    makerOrderId :string,
    takerOrderId :string,
    symbol :string,
    long : string,
    short : string
}
