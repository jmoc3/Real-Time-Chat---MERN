export const Header:React.FC<{setHeaderOption:React.Dispatch<React.SetStateAction<number>>}> = ({setHeaderOption}) => {
  return (
    <>
    <div className="flex w-[35rem] bg-card justify-center items-center">
      <ul className="flex w-full py-4 underline justify-evenly">
        <li onClick={()=>setHeaderOption(1)} className="cursor-pointer">Ingresar</li>
        <li onClick={()=>setHeaderOption(2)} className="cursor-pointer">Registrarse</li>
      </ul>
    </div>
    </>
  )
}