import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import UsersList from '../UsersList';

import './dashboard.css'
import Chat from '../Chat/chat';

const ChannelMessages = () =>{
    const {serverid, channelid} = useParams()
    const channels = useSelector(state=>state.channels)
    //
    return(

    <div className = "CMContainer">
        {!!serverid && !!channelid && channels && channels.list && channels.list.length>0&& <Chat />}






    </div>
    )
}

export default ChannelMessages
