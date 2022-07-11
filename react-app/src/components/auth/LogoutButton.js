import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { unload_channels } from '../../store/channels';
import { unload_server } from '../../store/servers';
import { unload_allservers } from '../../store/allservers';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(unload_channels())
    await dispatch(unload_server())
    await dispatch(unload_allservers())
    await dispatch(logout());
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
