import { BsFillSuitDiamondFill } from "react-icons/bs";

export const ChatComponent:React.FC = () => {
  return (
    <div className="bg-card w-[35rem] h-3/4 p-6">
      <div className="flex flex-col justify-evenly items-center border-1 w-full h-full">
        <div className="flex flex-col gap-6 items-center">
          <div className="flex flex-col gap-4 items-center">
            <span className="text-xl">Iniciar Conexión</span>
            <span className="text-sm opacity-50">Correo de la persona con la que quieras hablar</span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <input type="text" className="bg-gray-200 border-b p-2 text-sm" placeholder="ej: AntMontana@gmail.com" autoComplete="off"/>
            <button className="h-fit p-2 bg-blue-400 rounded cursor-pointer"><BsFillSuitDiamondFill className=" text-card  " /></button>
          </div>
        </div>

      </div>
    </div>
  )
}