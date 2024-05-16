import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './Pages/Post/Home'
import CreatePost from './Pages/Post/CreatePost'
import Post from './Pages/Post/Post'
import Register from './Pages/Users/Register'
import Login from './Pages/Users/Login'

const App = () => {
  const [userLoggedin,setuserLoggedin]=useState(false)
  const[username,setUsername]=useState('')
  return (
    <BrowserRouter>
      <Navbar userLoggedin={userLoggedin} username={username}/>
      <Routes>
        <Route path='/' element={<HomeComponent />} />
        <Route path='/home' element={<HomeComponent />} />
        <Route path='/createpost' element={<CreatePost />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login setuserLoggedin={setuserLoggedin} setUsername={setUsername}/>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

const HomeComponent = () => {
  return (
    <div>
      <Home />
    </div>
  )
}

export default App
