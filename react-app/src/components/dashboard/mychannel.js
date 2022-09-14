import React, { useState, useEffect } from 'react';
import { Switch, useParams, NavLink, useLocation, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import './dashboard.css'


import CreateChannelModalMenu from './channelmenu/channelmodalmenu.js';
import DiscordLogoWhite from '../SplashPage/DiscordLogoWhite.png'

const MyChannel = () => {

    const dispatch = useDispatch()
    const { serverid } = useParams()
    const { channelid } = useParams()

    const user = useSelector(state => state?.session.user)

    const servers = useSelector(state => state?.servers)
    const friends = useSelector(state=>state?.friends)
    console.log(friends)

    const channels = useSelector(state => state?.channels.list)
    let server = []
    if (servers && servers.list && servers.list.length > 0) server = servers.list.filter(server => server.id == serverid)





    return (




            <>
            <br></br>
            <ul className="friendslist">
                {Object.values(friends).map(user=>
                    <div>{user.username}</div>
                )}







            </ul>







        </>


    )
}

export default MyChannel
