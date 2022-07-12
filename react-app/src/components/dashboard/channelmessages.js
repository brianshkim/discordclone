import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";

import './dashboard.css'
import Chat from '../Chat/chat';

const ChannelMessages = () =>{
    const {serverid, channelid} = useParams()
    return(
    <div className = "CMContainer">
        {!!serverid && !!channelid && <Chat />}




    </div>
    )
}

export default ChannelMessages
