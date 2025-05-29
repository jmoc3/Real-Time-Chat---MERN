import { Request, Response, Router } from "express";
import { User } from "../models/users.model.js";
import { UserT } from "../types.js";

const userRouter = Router()

userRouter.get("/:id", async (req:Request,res:Response)=>{
  try{
    const id = req.params.id
    const userFounded = await User.findOne({ _id:id }).exec() as UserT
    res.send({"user":userFounded})
  }catch(error){
    const err = error as Error
    console.log(err.message)
    res.status(500).send({err})
  }
})

userRouter.get("/email/:email", async (req:Request,res:Response)=>{
  try{
    const email = req.params.email
    const userFounded = await User.findOne({ email }).exec() as UserT
    console.log(userFounded)
    res.send({"user":userFounded})
  }catch(error){
    const err = error as Error
    console.log(err.message)
    res.status(500).send({err})
  }
})

export { userRouter }