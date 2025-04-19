import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  nombre:{
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