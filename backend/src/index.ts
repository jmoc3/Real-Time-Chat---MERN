import 'dotenv/config';
import express, {Request, Response} from "express"
import mongoose from "mongoose"
import cors from "cors"
import { User } from './models/users.model.js';

const app = express()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 204
}));

app.get("/", (_, res:Response)=>{
  res.status(200).send("In the back of my mind")
})

app.post("/login",async (req:Request,res:Response)=>{
  try{
    const userFound = await User.find(req.body).exec()
    res.status(302).send(userFound[0])
  }catch(error){
    const err = error as Error
    console.log(err.message)
    res.status(500).send()
  }
})

app.post("/signUp",async (req:Request, res:Response)=>{
  try{
    const user = await User.create(req.body)  
    res.status(201).send({message:"User created succesfully"})
  }catch(error){
    const err = error as Error
    console.log(err.message)
    res.status(500).send({message:err.message})
  }
})

mongoose.connect(process.env.MONGODBURL as string)
  .then(()=>{
    console.log("Connected to mongo")
    app.listen(process.env.PORT, ()=>{
      console.log("Server activated in port: ", process.env.PORT)
    })

  })
  .catch((error)=>{
    console.log("connection failed")
    console.log(error)
  })
