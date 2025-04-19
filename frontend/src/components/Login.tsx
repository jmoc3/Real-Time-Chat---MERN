import { BsFillSuitClubFill } from "react-icons/bs";

export const LoginComponent:React.FC<{setHeaderOption:React.Dispatch<React.SetStateAction<number>>}> = ({setHeaderOption}) => {

  return (
    <div className="bg-card w-[35rem] h-3/4 p-6">
      <div className="flex flex-col justify-evenly items-center border-1 w-full h-full">
        <h1 className="text-3xl text-center">Ingresar</h1>
        <div className="w-fit space-y-8 ">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Correo</label>
            <input type="email" name="email" className="bg-gray-200 border-b p-2"  autoComplete="off"/>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contraseña">Contraseña</label>
            <input type="password" name="contraseña" className="bg-gray-200 border-b p-2" autoComplete="off" />
          </div>
        </div>
        <div className="flex gap-8 justify-center items-end">
          <button className="h-fit p-2 bg-emerald-700 rounded cursor-pointer"><BsFillSuitClubFill className="text-xl text-card" /></button>
          <span onClick={()=> setHeaderOption(0)} className="underline cursor-pointer">Cerrar</span>
        </div>
      </div>
    </div>
  )
}