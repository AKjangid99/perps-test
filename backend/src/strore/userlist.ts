export enum Types  {"short", "long"};
export enum orderType { "limit" , "market"};
export enum OrderStatusType { "Filled" , "Cancelled", "PartiallyFilled"}

export type Userdata = {
    "id" : string ,
    "username" : string ,
    "password" : string
}

export type Balance ={
    availble : string,
    locked : string
}

export type Position ={
    market : string ,
    type : Types,
    qty : number,
    margin : string, 
    liquidationPrice : string,
    avragePrice : string 
}

export type Order = {
    orderId : string ,
    market : string ,
    type : Types,
    qty : number,
    margin : string,
    orderType : orderType,
    status : OrderStatusType
}


// user data 
export const userdata : Map<string , Userdata> = new Map<string , Userdata>()

// wallet details
export const walletData: Map<string, Balance> = new Map <string, Balance>();

// user positions 

export const userPosition : Map < string , Map <string , Position >> = new Map() ; 
export const UserOrders : Map < string ,  Order[]> = new Map()