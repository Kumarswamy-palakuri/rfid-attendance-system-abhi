import {useState} from "react"
import api from "../services/api"

export default function Login(){

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")

 const login = async()=>{

  const res = await api.post("/login",{email,password})

  localStorage.setItem("token",res.data.token)

  window.location="/dashboard"

 }

 return(
  <div className="flex h-screen items-center justify-center">

   <div className="p-10 shadow">

    <input placeholder="Email"
     onChange={e=>setEmail(e.target.value)} />

    <input placeholder="Password"
     type="password"
     onChange={e=>setPassword(e.target.value)} />

    <button onClick={login}>Login</button>

   </div>

  </div>
 )
}