import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { get_messages, create_message } from "../../store/messages";
import { io } from 'socket.io-client';
import DiscordLogoWhite from '../SplashPage/DiscordLogoWhite.png'
import './chat.css'
let socket;


const Chat = () => {
    const dispatch = useDispatch()
    const { serverid, channelid } = useParams()

    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [userWelcome, setuserWelcome] = useState("")
    const user = useSelector(state => state.session.user)
    const messageslist = useSelector(state => state.messages)
    const channels = useSelector(state => state.channels)
    const ch = channels.list.filter(channel => channel.id == channelid)
    console.log(messageslist)

    let d = new Date()
    let month = (d.getMonth())





    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)

    useEffect(() => {
        dispatch(get_messages(channelid))

    }, [dispatch, channelid])



    useEffect(() => {
        localStorage.setItem(serverid, channelid)
    }, [channelid, serverid])

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();
        socket.on("welcome", (msg) => {
            console.log(msg)



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
        let d = new Date()

        dispatch(create_message(chatInput, channelid, user.username, user.id, d.getTime()))

        socket.emit("chat", { user: user.username, msg: chatInput, channelId: channelid });

        setChatInput("")
    }

    return (user && (
        <div className="chatcontainer">

            <div className="messagecontainer">


                <div id="messagebox">
                    <div className="startmessage">
                        <div className="startmessagetext"><i className="fa-solid fa-hashtag fa-3x"></i></div>
                        <div className="startmessagetitle">Welcome to #{ch[0].name} </div>
                        <div className="startmessagepara">This is the start of the #{ch[0].name} channel</div>


                    </div>
                    {
                        !!messageslist && messageslist.list && messageslist.list.length > 0 && messageslist.list.map(message =>
                            <>
                                <div className="previousmessagescont" id={`message-${message.id}}`}>
                                    <span><div className="useravatar2"><img className="discordavatar2" src={DiscordLogoWhite} height="18" width="18"></img> </div> </span>
                                    <span className="previousmessage">
                                        <div className="previoususer">
                                            <span className="previoususername">{message.username}</span>
                                            <span className="messagedatetime">{new Date(message.createdate).getMonth() == d.getMonth() &&
                                                new Date(message.createdate).getDay() == d.getDay() &&
                                                new Date(message.createdate).getFullYear() == d.getFullYear() ? `Today at ${new Date(message.createdate).getHours() > 12 ? new Date(message.createdate).getHours() - 12 : new Date(message.createdate).getHours()}:${new Date(message.createdate).getMinutes()} ${new Date(message.createdate).getHours() > 12 ? "PM" : "AM"}` : null}
                                                {new Date(message.createdate).getMonth() == d.getMonth() &&
                                                    new Date(message.createdate).getDay() == d.getDay() - 1 && new Date(message.createdate).getFullYear() == d.getFullYear() ? "yesterday" : null}
                                                {new Date(message.createdate).getMonth() !== d.getMonth() &&
                                                    new Date(message.createdate).getDay() !== d.getDay() &&
                                                    new Date(message.createdate).getFullYear() !== d.getFullYear() && `${new Date(message.createdate).getMonth() + 1}/${new Date(message.createdate).getDay()}/${new Date(message.createdate).getFullYear()}`}

                                            </span>
                                        </div>
                                        <div className="messageprevious"> {message.content}</div>
                                    </span>
                                </div>

                                <br></br>
                            </>
                        )
                    }

                    {!!messages && messages.map((message, ind) => (
                        !!message.user && <>
                            <div className="currentmessage" key={ind}>
                                {message.user != user.username &&
                                    <>
                                        <div>{message.user}</div><div>{message.msg}</div>


                                    </>
                                }
                            </div>
                        </>

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
                <button className="submitchat" type="submit" onClick={(e) => sendChat(e)} disabled={chatInput.length < 1}>Send</button>
            </form>
        </div>

    )
    )
};


export default Chat;
