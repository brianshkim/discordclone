import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import {useParams} from "react-router-dom"

import { NavLink } from 'react-router-dom';
import { io } from "socket.io-client"
import './onlinestatus.css'
import DiscordLogoWhite from './SplashPage/DiscordLogoWhite.png'
let socket;

function UsersList(){
  const {serverid} = useParams()
  const dispatch = useDispatch()
  const [users, setUsers] = useState([]);
  const user = useSelector(state => state.session.user)
  const [usersOnline, setUsersOnline] = useState([])
  const servers = useSelector(state=> state.servers?.list)

  let server = servers?.filter(server=>server.id == serverid)
  console.log(servers)

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
    console.log(socket?.ids)
    socket.connect()

    socket.on("disconnection", (users)=>{
      const newusers = [...users.users]
      console.log(newusers)
      setUsersOnline(newusers)

    })


    socket.on("connection", (users) => {
      console.log(users)
      const newusers = [...users.users]
      console.log(newusers)
      setUsersOnline(newusers)
      console.log(usersOnline)

    })

    socket.emit("connection", ({ userId: user.id }))

    return (()=>{
      socket.disconnect()
    })





    //if (servers && servers.list && servers.list.length>0 && servers.list[0] && channels && channels.list && channels.list.length>0 &&channels.list[0]){
    //
    //    dispatch(get_channels(servers.list[0].id)).then(()=>history.push(`/channels/${servers.list[0].id}/${channels.list[0].id}`))
    //}

  })



if(serverid){

  return (
    <div className="UserListContainer">
      <p className="userlistonline">ALL USERS - {!!servers && servers.length>0 && server && server.length >0 && server[0].users.length} </p>
      <ul>
        {!!servers && servers.length>0 && server && server.length >0 && server[0].users.map((user) => (


          <li className="userslist" key={user.id}>
          <div className="usercontainer" ><div className="useravatar"><img className="discordavatar" src={DiscordLogoWhite} height="18" width="18"></img> {usersOnline.includes(user.id) ? <div className="onlinestatusshape"></div>:null}</div> </div>
          <span className="usernametext">{user.username}</span>
          </li>

    ))}
    </ul>
    </div>
  );
}
else{
  return(null)
}
}

export default UsersList;
