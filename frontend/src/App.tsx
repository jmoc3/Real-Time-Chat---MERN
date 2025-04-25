import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PreHomeComponent } from './components/preHome/PreHome'
import { AuthComponent } from './components/Auth'
import { HomeComponent } from './components/home/Home'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PreHomeComponent/>}/>
        <Route element={<AuthComponent />}>
          <Route path='/home' element={<HomeComponent />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
