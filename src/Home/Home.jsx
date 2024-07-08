import { useEffect, useState } from "react"
import {io} from "socket.io-client"
//import "./Home.scss"
import "./Home.css"
//import axios from 'axios'
import ScrollToBottom from 'react-scroll-to-bottom';
const App = () => {
  const socket=io("https://chatappbackend-ow6q.onrender.com/")
 const[message,setmessage]=useState("")
 const[chat,setChat]=useState([])
 const[name,setname]=useState("")
 const[data,setData]=useState(localStorage.getItem("chatUser"))
useEffect(()=>{
  socket.on("connect",()=>{
    console.log("connected",socket.id)
  })

},[socket])

const handleNamesubmit=(e)=>{
  e.preventDefault()
  if(!name) alert("Please enter your name")
    localStorage.setItem("chatUser",name)
   setData("data")
}

const handlesubmit=async(e)=>{
  e.preventDefault()
   setChat((prev)=>[...prev,{comments:message,sending:true,name:data}])
  socket.emit("getMessage",{message,data})
  setmessage("")
}
// socket.on("sendMessage",(datapart)=>{
//     console.log(datapart)
    
//   })

useEffect(() => {
  socket.on("sendMessage",({ message, name })=>{
    setChat((prev)=>[...prev,{comments:message,sending:false,name}])
  })
 
  return () => {
    socket.off()
  };
}, [chat])


 
  return (
  <>
   {data?<main>
     <div>
   <ScrollToBottom className="scrool " >
      {
        chat.map((data,i)=>(
          <li key={i} style={{background:`${data.sending&&"greenyellow"}
          `,border:"1px solid black",width:"fit-content",borderRadius:".5rem",display:"flex"}} className={`message  ${data.sending&&"right"}`} >
            <p>{data.name}:--</p>{data.comments}</li>
        ))
      }
   </ScrollToBottom>
   <form action=""onSubmit={handlesubmit} style={{padding:"1rem"}}>
      <input type="text" placeholder="send message" value={message} onChange={(e)=>setmessage(e.target.value)} style={{padding:"1rem"}}/>
      <input type="submit" value={">"}  style={{padding:"1rem",cursor:"pointer"}}/>
    </form>
    </div>
   </main>:<form onSubmit={handleNamesubmit} style={{height:"80vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
    
    <input type="text" placeholder="Enter your name"
    value={name}
    onChange={(e)=>setname(e.target.value)}
     style={{padding:"1rem",borderRadius:"2rem"}}/>
     <button type="Submit" style={{marginTop:".5rem",width:"12.3rem",height:"3rem",background:"green",color:"white",borderRadius:"2rem",cursor:'pointer'}}>Add</button>
    
    </form>}
  </>
  )
}

export default App
