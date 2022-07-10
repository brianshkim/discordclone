import React, { useState, useEffect } from 'react';
import { Switch, useParams, Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import './dashboard.css'
import ProtectedRoute from '../auth/ProtectedRoute';

const FriendsList = () => {
   const {serverid}=useParams()
   const servers= useSelector(state=>state?.servers?.list)
   const channels = useSelector(state=>state?.channels?.list)



    return (
        <div className="friendslistcontainer">
            <ul>
            {!!channels && channels.length>0 &&
            channels.map(channel=>
            <li><Link to={`/channels/${channel.serverId}/${channel.id}`}>{channel.name}</Link></li>)}
            </ul>

        </div>
    )
}

export default FriendsList
