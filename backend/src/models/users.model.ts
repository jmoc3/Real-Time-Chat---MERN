import mongoose from "mongoose"
import { UserT } from "../types.js"

const userSchema = new mongoose.Schema<UserT>({
  name:{
    type:String,
    require:true    
  },
  email:{
    type:String,
    require:true
  },
  password:{
    type:String,
    require:true
  }
})

export const User = mongoose.model('user',userSchema)