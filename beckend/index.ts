import express from "express";
import { placeorder, userschema } from "./zod";
import  jwt  from "jsonwebtoken"
import { loopback } from "./loopbackfunction";

const app = express();





app.post("/api/reset" , async(req, res) => { 
    const responseFromEngine = await loopback( {
        messageType : "Reset"
    } ) 
}) 

app.post(" /api/users" , async ( req , res ) => { 
    const parseddata = userschema.safeParse( req.body)
    
    if ( parseddata.error ){
        res.json({ 
            msg : "invalid"
         })
        return 
    } 
    
    const response = await loopback( { messageType :"CreateUser" , 
        userId : parseddata.data.userId,
        initialBalance : parseddata.data.initialBalance
     })

     res.json({
         userId:  parseddata.data.userId
     })
})

app.post( "/api/orders" , async( req,res ) => {
    const parseddata = placeorder.safeParse( req.body)

    if( parseddata.error) { 
        res.json({ 
            msg : ""
        }) 
        return 
    }
})

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});