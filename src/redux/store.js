import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './messagesSlice';

export const store = configureStore({
    reducer: {
        messages: messagesReducer, // Reducer cho tin nhắn
    },
    devTools: true, // Bật Redux DevTools
});

export default store;
