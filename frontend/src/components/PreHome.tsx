import { useState } from "react"
import { Header } from "./Header"
import { LoginComponent } from "./Login"
import { SignUpComponent } from "./SignUp"

export const PreHomeComponent:React.FC = () => {
  const [headerOption, setHeaderOption] = useState<number>(0)
  
  return (
    <div className='w-full h-screen flex flex-col items-center justify-between p-12'>
      <Header setHeaderOption={setHeaderOption}/>

      {
        headerOption==1 ? 
        <LoginComponent setHeaderOption={setHeaderOption} /> : <></>
      }
      {
        headerOption==2 ?
        <SignUpComponent setHeaderOption={setHeaderOption} />:<></>
      }

      <a href="https://www.instagram.com/l3bl0nd/" target='_blank' className='opacity-60'>@l3bl0nd</a>
    </div>
  )
}