import {io} from "socket.io-client";
import React,{useState,useEffect} from "react";
const socket = io("http://localhost:8080");
socket.on("hello",(args)=>{
  console.log(args);
})
function App() {
  const [msg,setMsg] = useState("");
  const sendMsg = ()=>{
    socket.emit("howdy",msg);
    setMsg("");
  }
  useEffect(()=>{
    socket.on("client",(args)=>alert(args));
  },[])
  return (
    <>
    <div className="App">
     <input type="text" placeholder = "Message..." onChange={(e)=>setMsg(e.target.value)} value={msg}/>
     <button onClick={sendMsg}>Send</button>
    </div>
    </>
  );
}

export default App;
