import { Route, Routes } from "react-router-dom"
import Header from "./components/Header/Header"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import Chat from "./pages/Chat/Chat"
import NotFound from "./pages/NotFound/NotFound"
import {useAuth } from "./context/AuthContext"

function App() {
    const auth = useAuth();
  return (
  <main>
  <Header/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
     {auth?.isLoggedIn && auth.user && (
          <Route path="/chat" element={<Chat />} />
        )}
    <Route path="" element={<NotFound/>}/>
    </Routes>  
  </main>
  )
}

export default App
