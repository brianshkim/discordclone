import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getallusers } from "../../store/allusers";
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { get_messages, create_message, update_message } from "../../store/messages";



import { io } from 'socket.io-client';
import DiscordLogoWhite from '../SplashPage/DiscordLogoWhite.png'
import './chat.css'
let socket;


const Chat = () => {
    const dispatch = useDispatch()
    const { serverid, channelid } = useParams()
    const messagesEnd = useRef(null)
    const [input, setInput] = useState("");

    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [userWelcome, setuserWelcome] = useState("")
    const user = useSelector(state => state.session.user)
    const messageslist = useSelector(state => state.messages)
    const channels = useSelector(state => state.channels)
    const ch = channels.list.filter(channel => channel.id == channelid)
    const allusers = useSelector(state => state.allusers)
    const [editMessage, setEditMessage] = useState('')


    let d = new Date()

    let month = (d.getMonth())

    useEffect(() => {
        (
            dispatch(getallusers())

        )
    }, [])


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

            dispatch(get_messages(channelid))
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

    const scrollToBottom = () => {
        console.log(messagesEnd)
        messagesEnd.current?.scrollIntoView({ behavior: "smooth", block: 'end', inline: 'nearest' })

    }

    const editbutton = (e, id) => {
        e.preventDefault()
        let msgdiv = document.getElementById(`messagebox${id}`)
        let mesinstr = document.getElementById(`${id}instruc`)
        mesinstr.style.display="flex"
        console.log(msgdiv)
        msgdiv.contentEditable = "true"
        msgdiv.focus()
        msgdiv.addEventListener('keydown', (e) => {


            if (e.key === "Escape") {
                msgdiv.blur()
                msgdiv.contentEditable = "false"
                msgdiv.innerText = msgdiv.innerText
                mesinstr.style.display="none"
            }

        })
        document.addEventListener('click', (e) => {
            e.preventDefault()



                msgdiv.focus()





        })
    }

    const editeddiv = (e, id, userId, originalmessage) => {
        let om = originalmessage
        console.log(om)
        let value = e.target.innerText
        let mesinstr = document.getElementById(`${id}instruc`)
        console.log(mesinstr)
        mesinstr.style.display="flex"

        let message = e.target



        message.addEventListener('keydown', (e) => {

            if (e.key === "Enter") {
                (console.log(value))
                if (userId == user.id && value.length > 0) {
                    dispatch(update_message(id, value))
                }
                console.log("enter")
                message.blur()
                message.contentEditable = "false"
                mesinstr.style.display="none"

            }
            if (e.key === "Escape") {
                message.blur()
                message.contentEditable = "false"
                message.innerText = om
                mesinstr.style.display="none"
            }

        })

        document.addEventListener('click', (e) => {

            message.focus()

        })


    }

    useEffect(() => {
        scrollToBottom()

    }, [messageslist.list.length, messages])

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
                                    <span>{!!allusers && !!allusers[message.userId] && !allusers[message.userId].avatar && <div className="useravatar"><img className="discordavatar4" src={DiscordLogoWhite} height="16" width="16"></img> </div>}
                                        {!!allusers && !!allusers[message.userId] && !!allusers[message.userId].avatar && <div className="useravatar"><img className="discordavatar3" src={allusers[message.userId].avatar} height="32" width="32"></img></div>} </span>
                                    <span className="previousmessage">
                                        <div className="previoususer">
                                            <span className="previoususername">{message.username}</span>
                                            <span className="messagedatetime">{new Date(message.createdate).getMonth() == d.getMonth() &&
                                                new Date(message.createdate).getDay() == d.getDay() &&
                                                new Date(message.createdate).getFullYear() == d.getFullYear() ? `Today at ${new Date(message.createdate).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}` : null}
                                                {new Date(message.createdate).getMonth() == d.getMonth() &&
                                                    new Date(message.createdate).getDay() == d.getDay() - 1 && new Date(message.createdate).getFullYear() == d.getFullYear() ? `Yesterday at ${new Date(message.createdate).getHours() > 12 ? new Date(message.createdate).getHours() - 12 : new Date(message.createdate).getHours()}:${new Date(message.createdate).getMinutes() < 10 ? "00" + new Date(message.createdate).getMinutes() : new Date(message.createdate).getMinutes()} ${new Date(message.createdate).getHours() > 12 ? "PM" : "AM"}` : null}
                                                {new Date(message.createdate).getMonth() !== d.getMonth() &&
                                                    new Date(message.createdate).getDay() !== d.getDay() &&
                                                    new Date(message.createdate).getFullYear() !== d.getFullYear() && `${new Date(message.createdate).getMonth() + 1}/${new Date(message.createdate).getDay()}/${new Date(message.createdate).getFullYear()}`}


                                            </span>
                                        </div>
                                        <div className={message.userId === user.id ? "messageboxcontainer" : "messageboxcontainernull"}>
                                            <div className="messagebuttonbox">
                                                <span><button className="editmbutton" onClick={(e) => editbutton(e, message.id)}><i class="fa-solid fa-pencil"></i></button></span>

                                            </div>
                                        </div>
                                        <div>
                                            <div contentEditable="false" suppressContentEditableWarning="true" onInput={(e) => editeddiv(e, message.id, message.userId, message.content)} id={`messagebox${message.id}`} className="messageprevious"> {message.content}</div>
                                            <div id={`${message.id}instruc`} className="messageinstruc">Press Esc to Cancel or Enter to Submit Changes</div>
                                        </div>

                                    </span>

                                </div>


                                <br></br>
                            </>
                        )
                    }

                    {!!messages && messages.map((message, ind) => (
                        !!message.user && <>
                            <div className="previousmessagescont2" key={ind}>
                                {message.user != user.username &&
                                    <>
                                        <span>{!user.avatar && <div className="useravatar"><img className="discordavatar" src={DiscordLogoWhite} height="16" width="16"></img></div>}
                                            {!!user.avatar && <div className="useravatar"><img className="discordavatar3" src={user.avatar} height="32" width="32"></img> </div>} </span>
                                        <span className="previousmessage2">
                                            <div className="previoususer">
                                                <span className="previoususername">{message.user}</span>
                                                <span className="messagedatetime">{new Date().getMonth() == d.getMonth() &&
                                                    new Date().getDay() == d.getDay() &&
                                                    new Date().getFullYear() == d.getFullYear() ? `Today at ${new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}` : null}
                                                    {new Date().getMonth() == d.getMonth() &&
                                                        new Date().getDay() == d.getDay() - 1 && new Date().getFullYear() == d.getFullYear() ? `Yesterday at ${new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours()}:${new Date().getMinutes() < 10 ? "00" + new Date().getMinutes() : new Date().getMinutes()} ${new Date().getHours() > 12 ? "PM" : "AM"}` : null}
                                                    {new Date().getMonth() !== d.getMonth() &&
                                                        new Date().getDay() !== d.getDay() &&
                                                        new Date().getFullYear() !== d.getFullYear() && `${new Date(message.createdate).getMonth() + 1}/${new Date(message.createdate).getDay()}/${new Date(message.createdate).getFullYear()}`}


                                                </span>
                                            </div>
                                            <div className="messageprevious">{message.msg}</div>
                                        </span>


                                    </>
                                }
                            </div>
                        </>

                    ))}
                    <div className="dummydiv" ref={messagesEnd}></div>
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
