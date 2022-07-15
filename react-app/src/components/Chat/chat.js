import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';
import './chat.css'
let socket;


const Chat = () => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [userWelcome, setuserWelcome] = useState("")
    const user = useSelector(state => state.session.user)
    const { serverid, channelid } = useParams()



    useEffect(() => {
        localStorage.setItem(serverid, channelid)
    }, [channelid, serverid])

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();
        socket.on("welcome", (msg) => {


            setuserWelcome("Welcome to the chat " + msg)
        })
        socket.emit('join', { channelId: channelid, username: user.username })

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })
        // when component unmounts, disconnect

        return (() => {
            socket.disconnect()
            setMessages("")
        })
    }, [channelid, user.username])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", { user: user.username, msg: chatInput, channelId: channelid });

        setChatInput("")
    }

    return (user && (
        <div className="chatcontainer">
            <div className="messagecontainer">

                    <div className="messagebox">
                    {!!userWelcome && userWelcome}
                        {!!messages && messages.map((message, ind) => (
                            !!message.user &&<> <div key={ind}>{`${message.user} : ${message.msg}`}</div><div className="messageseparator"></div><br></br></>

                        ))}
                    </div>

            </div>
            <form className="chatbox" onSubmit={sendChat}>
                <input
                className="chatboxinput"
                    value={chatInput}
                    onChange={updateChatInput}
                    placeholder="Send your message here"
                />
                <button className="submitchat" type="submit" onClick={(e) => sendChat(e)}>Send</button>
            </form>
        </div>

    )
    )
};


export default Chat;
