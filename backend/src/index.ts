import 'dotenv/config';
import express, {Request, Response} from "express"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 204
}));

app.get("/", (req:Request, res:Response)=>{
  res.send("In the back of my mind")
})

app.post("/registrar",(req:Request, res:Response)=>{
  const {email, password} = req.body
  console.log(email, password)
  res.send("Enviado")
})

app.listen(process.env.PORT, ()=>{
  console.log("Server activated in port: ", process.env.PORT)
})