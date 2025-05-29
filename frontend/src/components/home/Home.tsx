import { useEffect, useState } from "react"
import { Header } from "../Header"
import { ChatComponent } from "./Chat"
import { useForm } from "react-hook-form"
import { BsFillSuitDiamondFill } from "react-icons/bs"
import { ChatT, UserT } from "@/types"

export const HomeComponent:React.FC = () => {

  const [headerOption, setHeaderOption] = useState<number>(0)
  const [receptor, setReceptor] = useState<string | undefined>() 
  const [receptorChat, setReceptorChat] = useState<UserT>({_id:"",name:"",email:""}) 
  const [chatId, setChatId] = useState<string>("")
  const [chats, setChats] = useState<(UserT|string)[][]>([])
  const [ res, setRes] = useState<any>()
    
  const { register, handleSubmit, reset } = useForm()
  const userProfile = JSON.parse(localStorage.getItem("user")!).user
  const userId = userProfile._id

  const sendRequest = (data:Record<string,string>) => {
    fetch(`http://localhost:3000/users/email/${data.receptorEmail}`).then(res=>res.json()).then(res => {

      const anotherUser = res.user
      if(res.user==null) return alert("Usuario no encontrado registrado")   
      if(anotherUser._id==userId) return alert("No puedes iniciar una conversacion contigo mismo")

      fetch(`http://localhost:3000/chats/exist/${userId}/${anotherUser._id}`).then(res=>res.json()).then(res=>{
        console.log(res)
        if(res.exist==true){
          return alert("Ya tienes una conversacion con el correo ingresado")
        }

        const chatData = {
          user_1:userId,
          user_2:anotherUser._id,
          messages:[]
        }

        fetch(`http://localhost:3000/chats/`,{
          method:"POST",
          headers:{
            "Content-type":"application/json"
          },
          body:JSON.stringify(chatData)
        }).then(res => res.json()).then(res=>{
          if(res.chat==null) return alert("Fallo en la creacion del chat")

          setReceptorChat(anotherUser)
          setReceptor(anotherUser._id)
          setChatId(res.chat._id)
          
          reset()
        })
      })
    })
  }

  const fetchingChats = async() => {
    const resChatObjects = await fetch(`http://localhost:3000/chats/${userId}`)
    const chatObjects = (await resChatObjects.json()).chats
    setRes(chatObjects)
    
    const receptorsId = chatObjects.map((record:ChatT) => {
      if(record.user_2==userId){
        return record.user_1
      } 
      
      return record.user_2
    })
    const chatIds = chatObjects.map((record:ChatT) => record._id)

    const receptorPromises = receptorsId.map(async (id:string) => {
      const resUser = await fetch(`http://localhost:3000/users/${id}`)
      const user = (await resUser.json()).user
      return user
    });
    const allReceptors = (await Promise.all(receptorPromises)).map((record,index) => [record,chatIds[index]])
    setChats(allReceptors)
  }

  useEffect(()=>{
      fetchingChats()
  },[])


  return (
    <div className='w-full h-screen flex flex-col items-center p-8 gap-4'>
      <Header options={["Chats", "Inicio", "Perfil"]} setHeaderOption={setHeaderOption}/>
      <div className="h-full relative">
      <div className="bg-card rounded absolute top-0 translate-x-[-110%] left-0 flex flex-col gap-2">
        {
          chats.map((record:any)=>(
            <span key={record[0]._id} onClick={()=>{setReceptorChat(record[0]);setReceptor(record[0]._id);setChatId(record[1])}} className="py-4 px-8 text-start cursor-pointer hover:bg-amber-50 transition-colors">{record[0].name}</span>
          ))
        }
      </div>

      <ChatComponent userId={userId} chatId={chatId} register={register} handleSubmit={handleSubmit} reset={reset} receptor={receptor} sendRequest={sendRequest} chats={chats} receptorChat={receptorChat} />

      <div className="bg-card grid gap-2 py-4 px-8 absolute top-0 translate-x-[110%] right-0 text-xs">
        <h4 className="text-xl">Informacion de perfil</h4>
        <div className="grid gap-1">
          <span><b>Nombre: </b>{userProfile.name}</span>
          <span><b>Correo: </b>{userProfile.email}</span>
        </div>
      </div>
      {
        receptor ? (
          <form onSubmit={handleSubmit(sendRequest)} className=" bg-card rounded py-4 px-8 absolute bottom-0  translate-x-[110%] right-0 flex flex-col gap-2">
            <span className="text-sm">Iniciar Conexión</span>
            <div className="flex items-center justify-center gap-4 text-xs">
              <input {...register("receptorEmail")} name="receptorEmail" type="text" className="bg-gray-200 border-b p-2 text-sm" placeholder="ej: AntMontana@gmail.com" autoComplete="off"/>
              <button type="submit" className="h-fit p-2 bg-blue-400 rounded cursor-pointer"><BsFillSuitDiamondFill className=" text-card" /></button>
            </div>
          </form>
        ):<></>
      }
      </div>
    </div>
  )
}