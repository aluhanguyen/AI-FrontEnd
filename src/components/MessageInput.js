import React, {useRef, useState} from 'react';

const MessageInput = ({ onSendMessage }) => {
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const inputRef = useRef(null);

    const handleSend = () => {
        if (isProcessing || !input.trim()) return; // Ngăn duplicate hoặc input rỗng

        setIsProcessing(true); // Đặt trạng thái đang xử lý
        onSendMessage(input.trim()); // Gửi tin nhắn
        setInput(''); // Reset input sau khi gửi

        setTimeout(() => {
            setIsProcessing(false); // Reset trạng thái xử lý
            inputRef.current.focus(); // Đặt focus lại vào input
        }, 0);// Reset trạng thái sau khi xử lý xong
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Chặn hành vi mặc định
            handleSend();
        }
    };

    return (
        <div style={styles.inputContainer}>
            <input
                ref={inputRef} // Gắn Ref vào ô input
                style={styles.input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown} // Xử lý sự kiện Enter
                placeholder="Nhập tin nhắn..."
                disabled={isProcessing} // Vô hiệu hóa input khi đang xử lý
            />
            <button
                style={styles.button}
                onClick={handleSend}
                disabled={isProcessing} // Vô hiệu hóa nút khi đang xử lý
            >
                Gửi
            </button>
        </div>
    );
};

const styles = {
    inputContainer: {
        display: 'flex',
        padding: '10px',
        borderTop: '1px solid #ccc',
    },
    input: {
        flex: 1,
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginRight: '10px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default MessageInput;
