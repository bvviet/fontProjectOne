import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import { UserContext } from "../hooks/UserContextUser";

// Kết nối với server WebSocket
const socket = io("https://project-one-navy.vercel.app");

const UserChat = () => {
    const { conversationId } = useParams();
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [change, setChange] = useState(false);
    const [product, setProduct] = useState();
    const { userData } = useContext(UserContext);
    const [user, setUser] = useState(null);

    // Đặt userData vào state user
    useEffect(() => {
        setUser(userData);
    }, [userData]);

    // Kết nối với server và lắng nghe tin nhắn mới
    useEffect(() => {
        // Lắng nghe tin nhắn mới từ server
        socket.on("on-chat", (message) => {
            setChange(!change);
            // Cập nhật danh sách tin nhắn với tin nhắn mới
            setMessages((prevMessages) => [...prevMessages, message.message]);
        });

        // Tham gia cuộc trò chuyện (room)
        socket.emit("joinConversation", conversationId);

        // Cleanup khi component unmount
        return () => {
            socket.off("on-chat");
        };
    }, [conversationId, change]);

    // Tải danh sách tin nhắn khi conversationId thay đổi
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`https://project-one-navy.vercel.app/api/messages/${conversationId}`);
                setMessages(res.data);
            } catch (error) {
                console.log("Lỗi khi tải tin nhắn:", error);
            }
        };

        fetchMessages();
    }, [conversationId, change]);

    // Hàm gửi tin nhắn
    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            try {
                const message = {
                    conversationId,
                    sender: user._id,
                    content: newMessage,
                };

                const res = await axios.post("https://project-one-navy.vercel.app/api/messages", message);

                console.log("Message sent to server:", res.data);
                // Phát tin nhắn qua socket để các client khác nhận được
                socket.emit("on-chat", res.data);

                setNewMessage("");
            } catch (error) {
                console.log("Lỗi khi gửi tin nhắn:", error);
            }
        }
    };

    // Lấy sản phẩm
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await axios.get(`https://project-one-navy.vercel.app/api/conversations/${conversationId}`);
                setProduct(data.data?.productId);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProduct();
    }, [conversationId]);

    console.log(product);

    return (
        <div
            className="flex justify-center h-screen items-center h-screen p-4 "
            style={{ background: "var(--header-bg)", color: "var(--text-color)", height: "calc(100vh - 150px)" }}
        >
            <div
                className="max-w-[1340px] w-full h-full flex flex-col justify-between"
                style={{ border: "solid 1px #908f8f", padding: "30px", borderRadius: "3px" }}
            >
                <div className="mb-4 text-lg font-bold">Cuộc trò chuyện ID: {conversationId}</div>
                {/* Phần hiển thị sản phẩm */}
                <div
                    className="mb-4 p-4 bg-white border border-gray-300 rounded-lg shadow-sm"
                    style={{ background: "var(--header-bg)" }}
                >
                    <div className="flex items-center">
                        <img
                            src={product?.imageURL}
                            alt={product?.name}
                            className="w-28 h-28 object-cover rounded-lg"
                        />
                        <div className="ml-4">
                            <p className="text-xl font-semibold mb-2">{product?.name}</p>
                            <p className="text-gray-500">{product?.price}</p>
                        </div>
                    </div>
                </div>

                {/* Phần hiển thị tin nhắn */}
                <div
                    className="flex-1 overflow-auto mb-4 bg-white p-4 border border-gray-300 rounded-lg shadow-sm"
                    style={{ background: "var(--header-bg)" }}
                >
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex mb-4 ${msg.sender._id === user?._id ? "justify-end" : "justify-start"}`}
                        >
                            {msg.sender._id !== user?._id && (
                                <img
                                    src={
                                        msg.sender?.avatar
                                            ? msg.sender?.avatar
                                            : "https://placehold.co/276x350?text=%22No%20Image%22"
                                    }
                                    alt=""
                                    className="w-12 h-12 rounded-full mr-2 object-cover"
                                />
                            )}
                            <div
                                className={`max-w-[70%] w-fit p-3 rounded-lg px-5 py-4 ${
                                    msg.sender._id === user?._id
                                        ? "bg-blue-500 text-white flex flex-col items-end"
                                        : "bg-gray-500"
                                }`}
                            >
                                <p className={`font-semibold ${msg.sender._id === user?._id ? "text-right" : ""}`}>
                                    {msg.sender.userName}
                                </p>
                                <p>{msg.content}</p>
                            </div>
                            {msg.sender._id === user?._id && (
                                <img
                                    src={
                                        user?.avatar
                                            ? user?.avatar
                                            : "https://placehold.co/276x350?text=%22No%20Image%22"
                                    }
                                    alt=""
                                    className="w-12 h-12 rounded-full ml-2 object-cover"
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Phần nhập tin nhắn */}
                <div className="flex items-center" style={{ background: "var(--header-bg)" }}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Nhập tin nhắn..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg mr-2"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Gửi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserChat;
