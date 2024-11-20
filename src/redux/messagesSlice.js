import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [], // Danh sách tin nhắn
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload); // Thêm một tin nhắn
        },
    },
});

export const { addMessage } = messagesSlice.actions; // Export action để sử dụng
export default messagesSlice.reducer;
