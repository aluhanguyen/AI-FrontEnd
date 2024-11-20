import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import {streamResponseSSE} from "../utils/Api";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);

    const handleSendMessage = (userMessage) => {
        // **Thêm tin nhắn của người dùng**
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'user', text: userMessage }, // Tin nhắn người dùng
            { sender: 'bot', text: 'Đang gõ...', isUpdating: true }, // **Tạo tin nhắn bot mới**
        ]);

        // **Gọi API SSE và xử lý chunk**
        streamResponseSSE(userMessage, (chunk) => {
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];

                // **Tìm tin nhắn bot cuối cùng (mới nhất) đang cập nhật**
                const botMessageIndex = updatedMessages.findLastIndex(
                    (msg) => msg.sender === 'bot' && msg.isUpdating === true
                );

                if (botMessageIndex !== -1) {
                    // **Cập nhật chunk vào tin nhắn bot mới**
                    updatedMessages[botMessageIndex] = {
                        ...updatedMessages[botMessageIndex],
                        text:
                            updatedMessages[botMessageIndex].text === 'Đang gõ...'
                                ? chunk + " " // Nếu là chunk đầu tiên, thay thế "Đang gõ..."
                                : updatedMessages[botMessageIndex].text + chunk + " ", // Nối chunk mới vào
                    };

                    // **Khi nhận chunk cuối `[DONE]`, xóa `isUpdating`**
                    if (chunk === '[DONE]') {
                        updatedMessages[botMessageIndex].isUpdating = false;
                    }
                }

                return updatedMessages;
            });
        });
    };

    return (
        <div style={styles.container}>
            <MessageList messages={messages} />
            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    );
};

const styles = {
    container: {
        width: '400px',
        height: '600px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    },
};

export default Chatbot;
