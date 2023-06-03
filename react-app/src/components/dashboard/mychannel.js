import React, { useState, useEffect } from 'react';
import { Switch, useParams, NavLink, useLocation, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import './dashboard.css'
import CreateChannelModalMenu from './channelmenu/channelmodalmenu.js';
import DiscordLogoWhite from '../SplashPage/DiscordLogoWhite.png'
import { io } from "socket.io-client"
let socket;

const MyChannel = () => {

    const dispatch = useDispatch()
    const { serverid } = useParams()
    const { channelid } = useParams()
    const [usersOnline, setUsersOnline] = useState([])

    const user = useSelector(state => state?.session.user)

    const servers = useSelector(state => state?.servers)
    const friends = useSelector(state => state?.friends)
    console.log(friends)

    const channels = useSelector(state => state?.channels.list)
    let server = []
    if (servers && servers.list && servers.list.length > 0) server = servers.list.filter(server => server.id == serverid)

    useEffect(() => {
        socket = io()
    
        socket.connect()
    
        socket.on("disconnection", (users) => {
          const newusers = [...users.users]
    
          setUsersOnline(newusers)
    
        })
    
    
    
        socket.on("connection", (users) => {
    
          const newusers = [...users.users]
    
    
          setUsersOnline(newusers)
    
    
        })
    
        socket.emit("connection", ({ userId: user.id }))
    
        return (() => {
          socket.disconnect()
          socket.off()
        })
    }, [socket])
    return (

        <div className="listofchannels-me">
            <br></br>
            <ul className="friendslist">
                {Object.values(friends).map(user =>
                                <li className="userslist" key={user.id}>
                                <div className="usercontainer" > {!user.avatar &&<div className="useravatar"><img className="discordavatar" src={DiscordLogoWhite} height="16" width="16"></img> {usersOnline.includes(user.id) ? <div className="onlinestatusshapelogo"></div> : null}</div>}
                                {!!user.avatar &&<div className="useravatar"><img className="discordavatar3" src={user.avatar} height="32" width="32"></img> {usersOnline.includes(user.id) ? <div className="onlinestatusshape"></div> : null}</div>}</div>
                  
                                <span className="usernametext">{user.username}</span>
                              </li>
                )}


            </ul>

        </div>


    )
}

export default MyChannel
