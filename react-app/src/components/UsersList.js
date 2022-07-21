import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"

import { NavLink } from 'react-router-dom';
import { io } from "socket.io-client"
let socket;

function UsersList() {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([]);
  const user = useSelector(state => state.session.user)
  const [usersOnline, setUsersOnline] = useState([])

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

  const userComponents = users.map((user) => {
    return (
      <li key={user.id}>
        <NavLink to={`/users/${user.id}`}>{user.username}{usersOnline.includes(user.id) ? "Online" : "Offline"}</NavLink>
      </li>
    );
  });

  return (
    <>
      <h1>User List: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default UsersList;
