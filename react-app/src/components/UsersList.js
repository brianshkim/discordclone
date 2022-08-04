import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { refreshuser } from '../store/session'
import {get_servers} from '../store/servers'
import { io } from "socket.io-client"
import './onlinestatus.css'
import DiscordLogoWhite from './SplashPage/DiscordLogoWhite.png'
let socket;

function UsersList() {
  const { serverid } = useParams()
  const dispatch = useDispatch()
  const [users, setUsers] = useState([]);
  const user = useSelector(state => state.session.user)
  const [usersOnline, setUsersOnline] = useState([])
  const servers = useSelector(state => state.servers?.list)

  let server = servers?.filter(server => server.id == serverid)


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);



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
    })





    //if (servers && servers.list && servers.list.length>0 && servers.list[0] && channels && channels.list && channels.list.length>0 &&channels.list[0]){
    //
    //    dispatch(get_channels(servers.list[0].id)).then(()=>history.push(`/channels/${servers.list[0].id}/${channels.list[0].id}`))
    //}

  }, [socket])



  if (serverid) {

    return (
      <div className="UserListContainer">
        <p className="userlistonline">ONLINE - {usersOnline.length} </p>
        <ul>
          {!!servers && servers.length > 0 && server && server.length > 0 && server[0].users.filter(user => usersOnline.includes(user.id)).map((user) => (


            <li className="userslist" key={user.id}>
              <div className="usercontainer" > {!user.avatar &&<div className="useravatar"><img className="discordavatar" src={DiscordLogoWhite} height="16" width="16"></img> {usersOnline.includes(user.id) ? <div className="onlinestatusshapelogo"></div> : null}</div>}
              {!!user.avatar &&<div className="useravatar"><img className="discordavatar3" src={user.avatar} height="32" width="32"></img> {usersOnline.includes(user.id) ? <div className="onlinestatusshape"></div> : null}</div>}</div>

              <span className="usernametext">{user.username}</span>
            </li>

          ))}
        </ul>
        <p className="userlistonline">OFFLINE - {servers && servers.length > 0 && server && server.length > 0 && server[0].users.length - usersOnline.length}</p>
        <ul className="usersoffline">
          {!!servers && servers.length > 0 && server && server.length > 0 && server[0].users.filter(user => !usersOnline.includes(user.id)).map((user) => (


            <li className="userslist2" key={user.id}>
              <div className="usercontainer" >{!user.avatar &&<div className="useravatar"><img className="discordavatar" src={DiscordLogoWhite} height="16" width="16"></img> {usersOnline.includes(user.id) ? <div className="onlinestatusshape"></div> : null}</div>}
              {!!user.avatar &&<div className="useravatar"><img className="discordavatar3" src={user.avatar} height="32" width="32"></img> {usersOnline.includes(user.id) ? <div className="onlinestatusshape"></div> : null}</div>}</div>
              <span className="usernametext">{user.username}</span>
            </li>

          ))}
        </ul>
      </div >
    );
  }
  else {
    return (null)
  }
}

export default UsersList;
