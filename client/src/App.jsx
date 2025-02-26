import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/SignIn'
import Register from './pages/SignUp'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import AddTask from './components/AddTask'
import TaskList from './components/TasksList'
import Landingpage from './pages/Landingpage'

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!localStorage.getItem('token'))
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/homepage')
    }
  }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/signUp" element={<Register />} />
        <Route path="/signIn" element={<Login />} />

        {
          isUserLoggedIn && <>
            {/* <Navbar /> */}
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/create" element={<AddTask />} />
            <Route path="/tasks" element={<TaskList />} />


          </>
        }
      </Routes>
    </>
  )
}

export default App
