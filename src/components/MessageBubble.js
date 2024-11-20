import React from 'react';

const MessageBubble = ({ sender, text }) => {
    const isUser = sender === 'user';

    return (
        <div
            style={{
                ...styles.bubble,
                alignSelf: isUser ? 'flex-end' : 'flex-start',
                backgroundColor: isUser ? '#daf8cb' : '#f1f0f0',
            }}
        >
            {text}
        </div>
    );
};

const styles = {
    bubble: {
        maxWidth: '70%',
        padding: '10px',
        borderRadius: '10px',
        wordBreak: 'break-word',
    },
};

export default MessageBubble;
