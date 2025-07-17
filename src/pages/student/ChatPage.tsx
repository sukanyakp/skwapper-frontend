import socket from "@/config/socket";
import { useEffect, useRef, useState } from "react";

interface Message {
  sender: "student" | "tutor";
  text: string;
  timestamp: string;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // TODO: Replace with actual socket connection or API fetch
  const currentUser = "student"; // or "tutor"

  useEffect(() => {
    // Auto-scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      sender: currentUser as "student" | "tutor",
      text: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");


  //  Emit to backend so the server forwards it to the other user
  socket.emit("message", newMessage);
  };



  useEffect(() => {
  socket.on("message", (incomingMessage: Message) => {
    setMessages((prev) => [...prev, incomingMessage]);
  });

  return () => {
    socket.off("message");
  };
}, []);


  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="bg-cyan-600 p-4 text-lg font-bold">
        Tutor-Student Chat
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${
              msg.sender === currentUser
                ? "bg-cyan-500 text-white self-end ml-auto"
                : "bg-gray-700 text-gray-200 self-start mr-auto"
            }`}
          >
            <p>{msg.text}</p>
            <small className="block text-xs text-gray-300 mt-1">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </small>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4 flex gap-2 bg-gray-800">
        <input
          type="text"
          className="flex-1 rounded-md p-2 text-black"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700"
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default ChatPage;
