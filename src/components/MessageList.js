import React from 'react';

const MessageList = ({ messages }) => {
    return (
        <div style={styles.list}>
            {messages.map((msg, index) => (
                <div key={index} style={styles[msg.sender]}>
                    {msg.text || (msg.sender === 'bot' && 'Đang gõ...')}
                </div>
            ))}
        </div>
    );
};

const styles = {
    list: {
        flex: 1,
        padding: '10px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    user: {
        alignSelf: 'flex-end',
        backgroundColor: '#daf8cb',
        padding: '10px',
        borderRadius: '10px',
        maxWidth: '70%',
        wordBreak: 'break-word',
    },
    bot: {
        alignSelf: 'flex-start',
        backgroundColor: '#f1f0f0',
        padding: '10px',
        borderRadius: '10px',
        maxWidth: '70%',
        wordBreak: 'break-word',
    },
};

export default MessageList;
