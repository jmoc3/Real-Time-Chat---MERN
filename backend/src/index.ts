import 'dotenv/config';
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { authRouter } from './routes/auth.routes.js';

const app = express()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 204
}));

app.use('/auth', authRouter)


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
