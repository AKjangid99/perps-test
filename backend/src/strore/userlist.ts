export type Userdata = {
    "id" : string ,
    "username" : string ,
    "password" : string
}

export type Balance ={
    availble : string,
    locked : string
}

// user data 
export const userdata : Map<string , Userdata> = new Map<string , Userdata>()

// wallet details
export const walletData: Map<string, Map<string, Balance>> = new Map();
 