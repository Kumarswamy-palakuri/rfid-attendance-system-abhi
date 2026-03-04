import {useEffect,useState} from "react"
import api from "../services/api"

export default function TeacherDashboard(){

 const [data,setData] = useState({})

 useEffect(()=>{

  const load = async()=>{

   const res = await api.get("/dashboard/teacher",{
    headers:{Authorization:"Bearer "+localStorage.token}
   })

   setData(res.data)
  }

  load()

 },[])

 return(

  <div>

   <h1>Total Students: {data.totalStudents}</h1>
   <h1>Today Attendance: {data.todayAttendance}</h1>
   <h1>Absent: {data.absent}</h1>

  </div>

 )
}