import 'dotenv/config';
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { createServer } from 'http';

import {Server} from "socket.io"
import { authRouter } from './routes/auth.routes.js';
import { userRouter } from './routes/user.route.js';
import { chatRouter } from './routes/chat.routes.js';

const app = express()
const httpServer = createServer(app)
export const socket = new Server(httpServer,{
  cors:{
    origin:"http://localhost:5173"
  }
})


app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 204
}));

app.use('/auth', authRouter)
app.use('/users',userRouter)
app.use('/chats',chatRouter)

mongoose.connect(process.env.MONGODBURL as string)
  .then(()=>{
    console.log("Connected to mongo")
    httpServer.listen(process.env.PORT, ()=>{
      console.log("Server activated in port: ", process.env.PORT)
    })

  })
  .catch((error)=>{
    console.log("connection failed")
    console.log(error)
  })
