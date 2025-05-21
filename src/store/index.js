import { configureStore } from '@reduxjs/toolkit';
import websocketReducer from './webSocketSlice';

export const store = configureStore({
  reducer: {
    websocket: websocketReducer,
  },
});