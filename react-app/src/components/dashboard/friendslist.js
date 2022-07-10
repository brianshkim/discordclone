import React, { useState, useEffect } from 'react';
import { Switch, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import './dashboard.css'
import ProtectedRoute from '../auth/ProtectedRoute';

const FriendsList = () => {
   const {serverid}=useParams()
   const servers= useSelector(state=>state?.servers?.list)
   let channels;
   if (servers) channels = servers.filter(server=>server.id==serverid)

    return (
        <div className="friendslistcontainer">
            <ul>
            {channels && channels.length>0 &&
            channels[0].channels.map(channel=>
            <li><a>{channel.name}</a></li>)}
            </ul>

        </div>
    )
}

export default FriendsList
