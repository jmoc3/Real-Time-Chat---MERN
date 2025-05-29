import mongoose from "mongoose"
import { ChatT } from "../types.js"

const chatSchema = new mongoose.Schema<ChatT>({
  user_1:{
    type:String,
    require:true    
  },
  user_2:{
    type:String,
    require:true
  },
  messages:{
    type:[]
  }
})

export const Chat = mongoose.model('chat',chatSchema)