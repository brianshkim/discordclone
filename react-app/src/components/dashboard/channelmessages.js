import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import VoiceChat from '../Chat/voicechat';
import UsersList from '../UsersList';

import './dashboard.css'
import Chat from '../Chat/chat';
import MyChannel from './mychannel';

const ChannelMessages = () =>{
    const {serverid, channelid} = useParams()
    console.log(channelid)
    const channels = useSelector(state=>state.channels)
    console.log(channels)
    let channel = []
    if(channels && channels.list && channels.list.length>0)channel = channels.list.filter(channel=>channel.id == channelid)


    return(

    <div className = "CMContainer">
        {!!serverid && !!channelid && channels && channels.list && channels.list.length>0&& !!channel && channel.length > 0 && !channel[0].voice && <Chat />}
        {!!serverid && !!channelid && channels && channels.list && channels.list.length>0&& !!channel && channel.length > 0 && channel[0].voice && <VoiceChat />}
        {serverid === "@me" && <MyChannel/>}




    </div>
    )
}

export default ChannelMessages
