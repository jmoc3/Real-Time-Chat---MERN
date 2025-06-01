import { ChatT, UserT } from "@/types";
import { useEffect, useRef, useState } from "react";
import type { UseFormRegister, FieldValues, UseFormHandleSubmit, UseFormReset } from "react-hook-form";
import { BsFillSuitDiamondFill } from "react-icons/bs";
import { BsSuitSpadeFill, BsFileEarmarkArrowUp, BsFillMicFill } from "react-icons/bs";
import { socket } from "./Home";


interface ChatProps {
  userId:string,
  chatId:string,
  register: UseFormRegister<FieldValues>,
  handleSubmit: UseFormHandleSubmit<FieldValues,FieldValues>,
  reset:UseFormReset<FieldValues>,
  receptor:string | undefined,
  chats:(string | UserT)[][],
  receptorChat:Record<string,string>,
  sendRequest: (data:Record<string,string>) => void
}

export const ChatComponent:React.FC<ChatProps> = ({userId, chatId,register, handleSubmit,reset, receptor, chats, receptorChat, sendRequest}) => {
  
  const [chatInfo, setChatInfo] = useState<Record<string,string>[]>([{}])
  const [newMessage, setNewMessage] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const submitHandler  = (data:Record<string,string>)=>{
    console.log()
    if(!data.message || data.message.split(" ").every(string=>string=="")) return
    fetch(`http://localhost:3000/chats/message/${userId}/${chatId}`,{
      method:"PATCH",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({message:data.message,time:`${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`})
    })
    reset()
  }

  const getMessages = async(receptor:string) => {
    const chatRes = await fetch(`http://localhost:3000/chats/${userId}`)
    const chats = (await chatRes.json()).chats
    const chat = chats.filter((record:any) => {
      console.log(receptor)
      return record.user_1 == receptor || record.user_2 == receptor 
    })[0]

    setChatInfo(chat.messages)
  }

  socket.on("newMessage",()=>setNewMessage(!newMessage))
  
  useEffect(()=>{
    getMessages(receptor!).then(_=>{
      setTimeout(()=>{
        messagesEndRef.current?.scrollIntoView({behavior:"smooth"})
      },100)
    })
    
  },[receptor,newMessage])



  return (
    <div className="bg-card w-[30rem] h-full p-4 overflow-hidden">
      <div className={`flex flex-col ${receptor==undefined ? "justify-evenly items-center" : ""} p-4 border-1 w-full h-full`}>
        {
          receptor==undefined ? (
            <form onSubmit={handleSubmit(sendRequest)} className="flex flex-col gap-6 items-center">
              <div className="flex flex-col gap-4 items-center">
                <span className="text-xl">Iniciar Conexión</span>
                <span className="text-sm opacity-50">Correo de la persona con la que quieras hablar</span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <input {...register("receptorEmail")} name="receptorEmail" type="text" className="bg-gray-200 border-b p-2 text-sm" placeholder="ej: AntMontana@gmail.com" autoComplete="off"/>
                <button type="submit" className="h-fit p-2 bg-blue-400 rounded cursor-pointer"><BsFillSuitDiamondFill className=" text-card" /></button>
              </div>
            </form>
          ):
          (
            <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col h-full justify-between bg-[url(./src/assets/images/bg.png)] bg-repeat ">
              <div className="flex flex-col h-fit p-2 bg-card">
                <span className="">{receptorChat.name}</span>
                <span className="opacity-50">{receptorChat.email}</span>
              </div>
              <div className={`w-full max-h-[15rem] px-2 flex flex-col gap-2 text-sm items-end overflow-auto`}>
              {
                chatInfo.length>0 &&
                chatInfo.map(record => (
                  <div className="flex flex-col items-end max-w-[90%]">
                    <div className={`${record.user==userId ? "opacity-90" : "self-start"} bg-sky-50 py-2 px-4 rounded w-fit"`}>{record.message}</div>
                    <span className="text-xs opacity-75">{record.hour}</span>
                  </div>
                ))
              }
              <div ref={messagesEndRef}></div>
              </div>
              <div className=" flex items-center gap-2 h-1/5 px-4">
                <input {...register("message")} name="message" type="text" className="text-sm bg-card text-gray-700 border border-gray-600 rounded w-full px-2 py-1 outline-0" autoComplete="off"/>
                <span onClick={()=>alert("Uploading File...")} className="h-fit p-1 rounded cursor-pointer"><BsFileEarmarkArrowUp className="text-xl"/></span>
                <span onClick={()=>alert("Uploading sound...")} className="h-fit p-1 rounded cursor-pointer"><BsFillMicFill className="text-xl"/></span>
                <button type="submit" className="h-fit p-2 bg-blue-700 rounded cursor-pointer"><BsSuitSpadeFill className="text-xl text-card"/></button>
              </div>
            </form>
          )
        }
      </div>
      
    </div>
  )
}