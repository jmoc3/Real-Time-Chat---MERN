import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { LoginComponent } from './components/Login'
import { SignUpComponent } from './components/SignUp'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PreHomeComponent } from './components/PreHome'
import { HomeComponent } from './components/Home'
function App() {
  const [headerOption, setHeaderOption] = useState<number>(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PreHomeComponent/>}/>
        <Route path='/home' element={<HomeComponent />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
