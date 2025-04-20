import { useForm } from "react-hook-form";
import { BsFillSuitClubFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export const LoginComponent:React.FC<{setHeaderOption:React.Dispatch<React.SetStateAction<number>>}> = ({setHeaderOption}) => {

  const {register, handleSubmit, formState:{errors}, reset } = useForm()
  const navigate = useNavigate()
  const loginFunction = (body:any) => {
    fetch("http://localhost:3000/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(body)
    }).then(async(promise)=> {
      const res = await promise.json()
      if(Object.values(res).length==0){
        return alert("User not founded")
      }

      navigate('/home')
    })
  }

  return (
    <div className="bg-card w-[35rem] h-3/4 p-6">
      <form onSubmit={handleSubmit(loginFunction)} className="flex flex-col justify-evenly items-center border-1 w-full h-full">
        <h1 className="text-3xl text-center">Ingresar</h1>
        <div className="w-fit space-y-8 ">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Correo</label>
            <input {...register("email")} type="email" name="email" className="bg-gray-200 border-b p-2"  autoComplete="off"/>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Contraseña</label>
            <input {...register("password")} type="password" name="password" className="bg-gray-200 border-b p-2" autoComplete="off" />
          </div>
        </div>
        <div className="flex gap-8 justify-center items-end">
          <button type="submit" className="h-fit p-2 bg-emerald-700 rounded cursor-pointer"><BsFillSuitClubFill className="text-xl text-card" /></button>
          <span onClick={()=> setHeaderOption(0)} className="underline cursor-pointer">Cerrar</span>
        </div>
      </form>
    </div>
  )
}