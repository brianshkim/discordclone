import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { get_channels } from '../../store/channels';
import './dashboard.css'

const TopHeader = () => {
    const dispatch = useDispatch()
    const channels = useSelector(state => state.channels.list)
    const { serverid } = useParams()
    const {channelid} = useParams()
    let channel = []
    if (channels) {channel = channels.filter((channel)=>channel.id==channelid)}

    useEffect(()=>{
        dispatch(get_channels(serverid))

    }, [])


    return (
        <div className="THContainer">
            <div className="ChannelTitle">
                <span className="channelhash"><i className="fa-solid fa-hashtag fa-lg"/> </span>
                <span className="ChannelName">{!!channels && channel.length >0 &&  channel[0].name}</span>
                </div>


        </div>
    )
}

export default TopHeader
