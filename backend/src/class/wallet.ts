import { walletData, type Balance } from "../strore/userlist";
import { addStrings, SubtractStrings } from "../utils/stringCalculation";

export const wallet = {
    createWallet ( userId : string ,  ){
        let userwallet = walletData.get( userId )
        let balance : Balance = {
            availble : "0",
            locked : "0"
        }
        if( !userwallet){
            walletData.set( userId, balance)
        }
   
    },
    addBalance( userId : string  , amount : string  ){
        let currentBalance = walletData.get(userId)
        let val1 =  currentBalance?.availble!
        let val2 = amount

        let updatedBalance : Balance  = {
            availble : addStrings( val1 , val2 ),
            locked : currentBalance!.locked
        }

        walletData.set( userId ,  updatedBalance )
    },

    deleteWallet ( userId: string  , ){
        walletData.delete(userId)
    },
    reduceBalance( userId : string  , amount : string ){
        let currentBalance = walletData.get(userId)
        let val1 =  currentBalance?.availble!
        let val2 = amount

        let updatedBalance : Balance  = {
            availble : SubtractStrings( val1 , val2 ),
            locked : currentBalance!.locked
        }

        walletData.set( userId, updatedBalance)
    },

    getbalance( userId : string ) {
        return walletData.get( userId )
    }
}