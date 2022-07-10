import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ChannelMessages from './channelmessages';
import './dashboard.css'
import FriendsList from './friendslist';
import ServerNav from './ServerNav';
import TopHeader from './topheader';
import { get_servers } from '../../store/servers';
import {load_servers} from '../../store/allservers'



const Dashboard = ()=>{
    const user = useSelector(state=>state.session.user)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(load_servers())
        dispatch(get_servers(user.id))


    }, [])


    return(
    <div className = "dashboardcontainer">
        <ServerNav />
        <FriendsList />
        <ChannelMessages />
        <TopHeader />


    </div>
    )
}


export default Dashboard
