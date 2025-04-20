import { useState } from "react"
import { Header } from "../Header"
import { ChatComponent } from "./Chat"

export const HomeComponent:React.FC = () => {
  const [headerOption, setHeaderOption] = useState<number>(0)
  
  return (
    <div className='w-full h-screen flex flex-col items-center justify-between p-12'>
      <Header options={["Chats", "Inicio", "Perfil"]} setHeaderOption={setHeaderOption}/>
      <ChatComponent />
      <a href="https://www.instagram.com/l3bl0nd/" target='_blank' className='opacity-60'>@l3bl0nd</a>
    </div>
  )
}