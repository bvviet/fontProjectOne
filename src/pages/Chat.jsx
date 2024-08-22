import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { UserContext } from "../hooks/UserContextUser";
import { useModelContext } from "../contexts/ModalProvider";

const socket = io("https://project-one-navy.vercel.app");

const Chat = () => {
    const [conversations, setConversations] = useState([]);
    const [latestMessages, setLatestMessages] = useState({});

    const { userData } = useContext(UserContext);
    const [user, setUser] = useState(null);

    const { setIsShowing } = useModelContext();

    // Đặt userData vào state user
    useEffect(() => {
        setUser(userData);
    }, [userData]);

    // Lấy danh sách các cuộc trò chuyện
    useEffect(() => {
        const fetchConversations = async () => {
            if (!user?._id) {
                return;
            }
            try {
                const res = await axios.get(`https://project-one-navy.vercel.app/api/conversations/user/${user?._id}`);
                setConversations(res.data);
            } catch (error) {
                console.error("Lỗi khi lấy cuộc trò chuyện:", error);
            }
        };
        fetchConversations();
    }, [user?._id]);

    // Lấy tin nhắn mới nhất cho mỗi cuộc trò chuyện
    const fetchLatestMessages = async () => {
        const messages = {};
        for (const conversation of conversations) {
            try {
                const res = await axios.get(`https://project-one-navy.vercel.app/api/messages/${conversation._id}`);
                messages[conversation._id] = res.data.length > 0 ? res.data[res.data.length - 1] : null;
            } catch (error) {
                console.error(`Lỗi khi lấy tin nhắn cho cuộc trò chuyện ${conversation._id}:`, error);
            }
        }
        setLatestMessages(messages);
    };

    useEffect(() => {
        if (conversations.length > 0) {
            fetchLatestMessages();
        }
    }, [conversations]);

    // Lắng nghe tin nhắn mới từ WebSocket
    useEffect(() => {
        console.log("Connecting to WebSocket...");
        socket.on("connect", () => {
            console.log("WebSocket connected");
        });

        socket.on("on-chat", (message) => {
            console.log("Received message:", message);
            setLatestMessages((prevMessages) => ({
                ...prevMessages,
                [message.conversationId]: message,
            }));
        });

        // Cleanup khi component unmount
        return () => {
            socket.off("on-chat");
            console.log("WebSocket disconnected");
        };
    }, []);

    // Xử lý xóa cuộc trò chuyện
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/conversations/${id}`);
            setConversations(conversations.filter((conversation) => conversation._id !== id));
        } catch (error) {
            console.error("Lỗi khi xóa cuộc trò chuyện:", error);
        }
    };

    return (
        <div
            className="p-6 space-y-6 h-[70vh] overflow-y-auto w-[25vw]"
            style={{ background: "var(--bg-addToCard-item)", color: "var(--text-color)" }}
        >
            <p className="my-6 font-bold">Lịch sử chat 📨</p>
            {conversations.map((value) => (
                <div
                    key={value._id}
                    className="flex items-center p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer"
                    style={{ background: "background-color: var(--bg-detail)" }}
                >
                    <Link
                        to={`/userChat/${value._id}`}
                        onClick={() => setIsShowing(false)}
                        className="flex items-center w-full"
                    >
                        <img
                            src={value.productId?.imageURL}
                            alt={value.productId?.name}
                            className="w-20 h-20 rounded-full object-cover mr-6 border-4 border-gray-200"
                        />
                        <div className="flex-grow">
                            <div className="flex gap-3">
                                <p className="text-xl font-bold mb-1">{value.productId?.name}</p>
                                <p className="text-base mb-2">
                                    {new Date(value.productId?.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            {latestMessages[value._id] && (
                                <p className="text-md truncate">
                                    <span className="font-semibold">
                                        {latestMessages[value._id]?.sender?.userName}:{" "}
                                    </span>
                                    {latestMessages[value._id].content}
                                </p>
                            )}
                        </div>
                    </Link>
                    <button onClick={() => handleDelete(value._id)} className="text-red-500">
                        Xóa
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Chat;
