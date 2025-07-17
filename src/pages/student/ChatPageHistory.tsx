import socket from "@/config/socket";
import { useEffect, useRef, useState } from "react"

interface Message {
  sender : 'student' | 'tutor',
  text : string ,
  timestamp : string
}

const ChatPageHistory = () => {

  const [messages,setMessages] = useState<Message[]>([]);
  const [input,setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentUser = 'student';

  // Receive message from server

  useEffect(()=>{
    socket.on("message",(msg : Message) =>{
      setMessages((prev) => [...prev,msg])
    })

    return ()=>{
      socket.off("message") // cleanup
    }
  },[])


  const handleSend = ()=>{
    if(!input.trim()) return;

    const newMessage : Message ={
      sender : currentUser,
      text : input,
      timestamp : new Date().toISOString(),
    }

    socket.emit("message",newMessage) // send to server
    setMessages((prev) => [...prev,newMessage]);
    setInput("");
  }


  //autoScroll to bottom 

    useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);



  return (
  <div className="flex flex-col  h-screen  bg-grey-900 text-white">
    <header  className='bg-cyan-600 p-4 text-lg font-bold'> 
       Tutor-Student Chat

    </header>

      <main className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {messages.map((msg , index) =>(
          <div
          key={index}
          className={`p-2 rounded-md max-w-xs ${msg.sender === currentUser ? "bg-blue-500 self-end" :  "bg-gray-700 self-start"} `}
          
          >

          </div>
        ))}
      hello

    </main>

    <footer className="p-4 flex gap-2">
      <input type="text" 
      className="flex-1 p-2 rounded bg-gray-800 border border-gray-700"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type a message ... "
      />

      <button 
      onClick={handleSend}
      className="bg-cyan-600 px-4 py-2 rounded font-semibold">
        Send 
      </button>


    </footer>
  <div>Item 1</div>
  <div>Item 2</div>
</div>

  )
}

export default ChatPageHistory
