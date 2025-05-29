type HeaderProps = {
  options:string[],
  setHeaderOption:React.Dispatch<React.SetStateAction<number>>
}

export const Header:React.FC<HeaderProps> = ({options,setHeaderOption}) => {
  return (
    <>
    <div className="flex w-[20rem] bg-card justify-center items-center">
      <ul className="flex w-full py-4 underline justify-evenly text-sm">
        {
          options.map((option, index) => <li key={index} onClick={()=>setHeaderOption(index+1)} className="cursor-pointer">{option}</li>)
        }
      </ul>
    </div>
    </>
  )
}