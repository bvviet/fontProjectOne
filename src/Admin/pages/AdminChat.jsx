// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// const AdminChat = ({ conversationId }) => {
//     const [message, setMessage] = useState("");
//     const [messages, setMessages] = useState([]);
//     const socket = io("http://localhost:3000"); // Thay đổi theo URL của server

//     useEffect(() => {
//         socket.emit("join", { conversationId });

//         socket.on("receiveMessage", (newMessage) => {
//             setMessages((prevMessages) => [...prevMessages, newMessage]);
//         });

//         return () => {
//             socket.off("receiveMessage");
//         };
//     }, [conversationId, socket]);

//     const handleSendMessage = () => {
//         socket.emit("sendMessage", { conversationId, message, sender: "admin" });
//         setMessage("");
//     };

//     return (
//         <div className="chat-container">
//             <div className="messages">
//                 {messages.map((msg, index) => (
//                     <div key={index} className={msg.sender === "admin" ? "message admin" : "message user"}>
//                         {msg.content}
//                     </div>
//                 ))}
//             </div>
//             <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Type your message..."
//             />
//             <button onClick={handleSendMessage}>Send</button>
//         </div>
//     );
// };

// export default AdminChat;

const AdminChat = () => {
  return (
    <div>AdminChat</div>
  )
}
export default AdminChat