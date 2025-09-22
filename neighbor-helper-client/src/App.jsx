import React from "react"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import StartUp from "./pages/StartUp"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import CreateTask from "./pages/CreateTask"
import MyTask from "./pages/MyTask"
import UserWallet from "./pages/UserWallet"
import Setting from "./pages/Settings"
import Message from "./pages/Message"
import TaskDetail from "./pages/TaskDetails"
import Payment from "./pages/Payment"


function App() {

  return (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<StartUp/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/createtask" element={<CreateTask/>}/>
        <Route path="/mytask" element={<MyTask/>}/>
        <Route path="/userwallet" element={<UserWallet/>}/>
        <Route path="/setting" element={<Setting/>}/>
        <Route path="/message" element={<Message/>}/>
        <Route path="/taskdetail/:id" element={<TaskDetail/>}/>
        <Route path="/payment" element={<Payment/>}/>
      </Routes>
    </div>
  </Router>
  )
}

export default App
