import { Request, Response, Router } from "express";
import { Chat } from "../models/chats.model.js";
import { socket } from "../index.js";

const chatRouter = Router()

chatRouter.get("/", async (_,res:Response)=>{
  try{
    const chats = await Chat.find()
    res.send({chats})
  }catch(error){
    const err = error as Error
    console.log(err.message)
    res.status(500).send({err})
  }
})

chatRouter.get("/:userId", async (req:Request,res:Response)=>{
  try{
    const chats = await Chat.find({$or:[{user_1:req.params.userId},{user_2:req.params.userId}]})
    res.send({chats})
  }catch(error){
    const err = error as Error
    console.log(err.message)
    res.status(500).send({err})
  }
})

chatRouter.get("/:userId1/:userId2", async (req:Request,res:Response)=>{
  try{
    const usersWithChat = await Chat.findOne({user_1:req.params.userId1,user_2:req.params.userId2})
    console.log(req.params.userId1,req.params.userId2)
    res.send(usersWithChat)
  }catch(error){
    const err = error as Error
    console.log(err.message)
    res.status(500).send({err})
  }
})

chatRouter.get("/exist/:userId1/:userId2", async (req:Request,res:Response)=>{
  try{
    const usersWithChat = await Chat.findOne({user_1:req.params.userId1,user_2:req.params.userId2})
    let exist = true
    if(usersWithChat==null){
      exist = false
    }
    res.send({exist})
  }catch(error){
    const err = error as Error
    console.log(err.message)
    res.status(500).send({err})
  }
})


chatRouter.post("/", async (req:Request,res:Response)=>{
  try{
    const data = req.body
    const chatCreated = await Chat.create(data)
    res.send({"chat":chatCreated})
  }catch(error){
    const err = error as Error
    console.log(err.message)
    res.status(500).send({err})
  }
})

chatRouter.patch("/message/:userId/:chatId", async (req:Request,res:Response)=>{
  try{
    const message = req.body.message
    const hour = req.body.time
    const chat = req.params.chatId
    const writer = req.params.userId
    
    Chat.findOne({_id:chat}).then(async (chat) => {
      const messageAdded = await Chat.updateOne({_id:chat},{messages:[...chat!.messages,{user:writer,message,hour}]})
      socket.emit("newMessage")
      console.log("added: ", messageAdded)
      res.send({"Chat Updated":true})
    })

  }catch(error){
    const err = error as Error
    console.log(err.message)
    res.status(500).send({err})
  }
})

export { chatRouter }