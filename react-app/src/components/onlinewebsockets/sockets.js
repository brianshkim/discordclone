import io from "socket.io-client"

let socket = null;
export const connectToServer = () =>{
    socket = io("http://localhost:")
}
