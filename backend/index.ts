import express from "express";
import { placeorder, userschema } from "./src/types/zod";
import  jwt  from "jsonwebtoken"

const app = express();





app.post("/api/reset" , async(req, res) => { 
   
}) 

app.post(" /api/users" , async ( req , res ) => { 
    const parseddata = userschema.safeParse( req.body)
    
    if ( parseddata.error ){
        res.json({ 
            msg : "invalid"
         })
        return 
    } 
  
     res.json({
         userId:  parseddata.data.userId
     })
})

app.post( "/api/orders" , async( req,res ) => {
    const parseddata = placeorder.safeParse( req.body)

    
})

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});