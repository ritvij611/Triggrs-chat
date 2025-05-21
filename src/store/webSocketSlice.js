import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
  connected: false,
  messages: [],
  read: false
};

const websocketSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        connect(state, action){
            state.socket = action.payload;
            state.connected = true;
        },
        disconnect(state){
            if(state.socket){
                state.socket.close();
            }
            state.socket = null;
            state.connected = false;
            state.messages = [];
        },
        receiveMessage(state, action){
            state.messages.push(action.payload);
            state.read = false;
        },
        markRead(state){
            state.read = true;
        },
    }
});

export const { connect, disconnect, receiveMessage, markRead } = websocketSlice.actions;
export default websocketSlice.reducer;

