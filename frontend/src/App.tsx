import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PreHomeComponent } from './components/preHome/PreHome'
import { HomeComponent } from './components/home/Home'
function App() {

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
