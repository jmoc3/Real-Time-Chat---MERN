import { Navigate, Outlet } from "react-router-dom"

export const AuthComponent:React.FC = () => {
  try{
    const token = localStorage.getItem("token")
    if(!token){
      return <Navigate to="/" />
    }      

    return <Outlet />  

  }catch(error){
    const err = error as Error
    console.log("Error accediendo al storage: ", err.message)
  }
} 