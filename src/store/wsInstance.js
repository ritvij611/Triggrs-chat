import { connect, disconnect, receiveMessage } from "./webSocketSlice";

let wsInstance = null;
let heartbeatInterval = null;

export const wsInitiate = (dispatch, phoneID) =>{
    if(wsInstance) return wsInstance;

    const socket = new WebSocket(process.env.NEXT_PUBLIC_WS_ENDPOINT+"?phoneID="+phoneID);

    socket.onopen = () => {
        console.log("websocket connected");
        dispatch(connect(socket));

        socket.send(JSON.stringify({
            action: "clientReady",
            phoneID,
        }));

        heartbeatInterval = setInterval(() => {
            if(socket.OPEN){
                socket.send(JSON.stringify({
                    action: "heartbeat",
                }));
            }
        },480000) // 8 min
    };

    socket.onclose = () => {
        console.log("websocket disconnected");
        dispatch(disconnect());
        wsInstance = null;

        if(heartbeatInterval){
            clearInterval(heartbeatInterval);
        }
        heartbeatInterval = null;
    };

    socket.onerror = (err) => {
        console.error('websocket error:', err);
    }

    socket.onmessage = (message) => {
        if(message?.data){
            console.log("websocket message received: ", message.data);
            const msg = JSON.parse(message.data);
            dispatch(receiveMessage(msg));
        }
    };

    wsInstance = socket;

    return wsInstance;
}