import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { authSchema } from "../types/zod.js";
import { createToken } from "../utils/auth.js";
import { sendValidationError } from "../utils/validation.js";
import { userdata } from "../strore/userlist.js";

export async function signup(req: Request, res: Response): Promise<void> {
  const parsedBody = authSchema.safeParse(req.body);
  if (!parsedBody.success) {
    sendValidationError(res, parsedBody.error);
    return;
  }
  const { username, password } = parsedBody.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const id = crypto.randomUUID()
  userdata.set( id , { id  , username , password : hashedPassword } )

  res.status(200).json(
     { id  , username , token : createToken ({ userId : id }) }
  )
}

export async function signin(req: Request, res: Response): Promise<void> {
  const signInBody = req.body;
  const parsedBody = authSchema.safeParse(signInBody);
  if (!parsedBody.data || !req.Id){
    res.status(403).json({error : "Incorrect"});
    return;
  }
  
  let userDetails = userdata.get(req.Id)

  if (!userDetails){
    res.status(404).json({error : "User Not Found"});
    return;
  }

  const checkPassword = await bcrypt.compare(parsedBody.data.password!, userDetails.password);
  if (!checkPassword){
    res.status(403).json({
      error : "Invalid Password"
    })
    return;
  }

  res.status(200).json({
    token : createToken ( { userId : req.Id } )
  })
}