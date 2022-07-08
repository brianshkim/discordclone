import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ChannelMessages from './channelmessages';
import './dashboard.css'
import FriendsList from './friendslist';
import ServerNav from './ServerNav';
import TopHeader from './topheader';



const Dashboard = ()=>{


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
