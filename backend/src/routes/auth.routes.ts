import { Router } from "express";
import type { Request, Response } from "express";

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { User } from "../models/users.model.js";
import { UserT } from "../types.js";

const authRouter = Router()

authRouter.post("/login",async (req:Request,res:Response)=>{
  try{
    const { email } = req.body
    const userFound = await User.findOne({ email }).exec() as UserT
    console.log(userFound)
    if(userFound==null){
      res.status(200).send({})
      return
    }

    const jwtToken = jwt.sign({id:userFound.id,name:userFound.name,email:userFound.email}, process.env.JWT_SECRET!, {expiresIn:'1h'})
    res.status(302).send({user:userFound, token:jwtToken})
  }catch(error){
    const err = error as Error
    console.log(err.message)
    res.status(500).send({err})
  }
})

authRouter.post("/signUp",async (req:Request, res:Response)=>{
  try{
    const {password, ...rest} = req.body as UserT
    const salt = await bcrypt.genSalt(10)
    const data = {
      ...rest,
      password:await bcrypt.hash(password, salt)
    }
    const user = await User.create(data)  
    res.status(201).send({message:"User created succesfully"})
  }catch(error){
    const err = error as Error
    console.log(err.message)
    res.status(500).send({message:err.message})
  }
})

export { authRouter }