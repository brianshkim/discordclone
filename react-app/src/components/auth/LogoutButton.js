import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import { unload_channels } from '../../store/channels';
import { unload_server } from '../../store/servers';
import { unload_allservers } from '../../store/allservers';
import '../dashboard/dashboard.css'
import { io } from 'socket.io-client';
let socket;


const LogoutButton = () => {
  const user = useSelector(state=>state.session.user)
  const history = useHistory()
  const dispatch = useDispatch()



  const onLogout = async (e) => {
    socket = io()
    socket.emit('disconnection', {userId: user.id})




    await dispatch(unload_channels())
    await dispatch(unload_server())
    await dispatch(unload_allservers())
    await dispatch(logout());
    history.push('/')
  };

  return <button className="logoutbut" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
