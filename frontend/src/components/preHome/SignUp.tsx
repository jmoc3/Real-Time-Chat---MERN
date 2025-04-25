import { useForm } from "react-hook-form";
import { BsFillSuitClubFill } from "react-icons/bs";

export const SignUpComponent:React.FC<{setHeaderOption:React.Dispatch<React.SetStateAction<number>>}> = ({setHeaderOption}) => {

  const { register, handleSubmit, formState: {errors} , reset } = useForm()
  
  const registerFunction = (body:any) => {
    if(body.password != body.confirmacion){
      return alert("Contraseñas deben ser iguales")
    }
    console.log(body)
    fetch("http://localhost:3000/auth/signUp", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(body)
    }).then((promise)=> promise.json()).then(response=>{
      console.log(response)
      setHeaderOption(1)
    })
  }

  return (
    <div className="bg-card w-[35rem] h-3/4 p-6">
      <form onSubmit={handleSubmit(registerFunction)} className="flex flex-col justify-evenly items-center border-1 w-full h-full">
        <h1 className="text-3xl text-center">Registrarse</h1>
        <div className="w-fit space-y-8 ">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Nombre</label>
              <input {...register("name", {required:true})} type="text" name="name" className="bg-gray-200 border-b p-1"  autoComplete="off"/>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Correo</label>
              <input {...register("email", {required:true})} type="email" name="email" className="bg-gray-200 border-b p-1"  autoComplete="off"/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Contraseña</label>
              <input {...register("password", {required:true})} type="password" name="password" className="bg-gray-200 border-b p-1" autoComplete="off" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmacion">Confirmar Contraseña</label>
              <input {...register("confirmacion", {required:true})} type="password" name="confirmacion" className="bg-gray-200 border-b p-1" autoComplete="off" />
          </div>
          </div>

        </div>
        <div className="flex gap-8 justify-center items-end">
          <button type="submit" className="h-fit p-2 bg-purple-700 rounded cursor-pointer"><BsFillSuitClubFill className="text-xl text-card" /></button>
          <span onClick={()=> setHeaderOption(0)} className="underline cursor-pointer">Cerrar</span>
        </div>
      </form>
    </div>
  )
}