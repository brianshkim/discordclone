import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import ChannelMessages from './channelmessages';
import './dashboard.css'
import FriendsList from './friendslist';
import ServerNav from './ServerNav';
import TopHeader from './topheader';
import { get_servers } from '../../store/servers';
import {load_servers} from '../../store/allservers'
import { get_channels } from '../../store/channels';
import { io } from 'socket.io-client';
import UsersList from '../UsersList';
import {getallusers} from "../../store/allusers"
let socket;



const Dashboard = ()=>{
    const history = useHistory()
    const user = useSelector(state=>state.session.user)
    const dispatch = useDispatch()
    const servers = useSelector(state=>state.servers)
    const channels = useSelector(state=>state.channels)
    const [usersOnline, setUsersOnline] = useState([])




    useEffect(() => {

        console.log(socket?.ids)

        dispatch(load_servers())
        dispatch(get_servers(user.id))

        //if (servers && servers.list && servers.list.length>0 && servers.list[0] && channels && channels.list && channels.list.length>0 &&channels.list[0]){
//
        //    dispatch(get_channels(servers.list[0].id)).then(()=>history.push(`/channels/${servers.list[0].id}/${channels.list[0].id}`))
        //}

    }, [user.id])




    if (!user) return (<div>Loading</div>)
    else{
    return(
    <div className = "dashboardcontainer">
        <ServerNav />
        <FriendsList />
        <ChannelMessages />
        <TopHeader />
        <UsersList />




    </div>
    )
    }
}


export default Dashboard
