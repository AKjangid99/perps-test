export enum Side  { short = "short",
    long = "long"};
export enum Types { limit = "limit",
    market = "market"};

export enum OrderStatus {
  PartiallyFilled,
  Filled,
  Open,
  Cancelled
}

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
    symbol : string ,
    type : Types,
    qty : number,
    margin : string, 
    liquidationPrice : string,
    avragePrice : string 
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
  leverage: string,
}


// user data 
export const userdata : Map<string , Userdata> = new Map<string , Userdata>()

// wallet details
export const walletData: Map<string, Balance> = new Map <string, Balance>();

// user positions 

export const userPosition : Map < string , Map <string , Position >> = new Map() ; 
export const UserOrders : Map < string ,  Order[]> = new Map()