import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ProtectedLayout from "./pages/ProtectedLayout"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import Tasks from "./pages/Tasks"
import Messages from "./pages/Messages"
import Users from "./pages/Users"
import './App.css'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<ProtectedLayout />}>
                <Route path="/" element={<Layout />}>
                    <Route path="home" element={<Home />} />
                    <Route path="projects" element={<Projects />}/>
                    <Route path="tasks" element={<Tasks />}/>
                    <Route path="messages" element={<Messages />}/>
                    <Route path="users" element={<Users />}/>
                </Route>
            </Route>
            <Route path='login' element={<Login />}/>
            <Route path="signup" element={<Signup />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App