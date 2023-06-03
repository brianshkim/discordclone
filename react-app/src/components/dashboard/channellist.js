import React, { useState, useEffect } from 'react';
import { Switch, useParams, NavLink, useLocation, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import './dashboard.css'

import CreateChannelModal from './createchannel';
import EditServerModal from './editservermodal';
import DeleteServerModal from './deleteservermodal';
import LeaveServerModal from './leaveservermodal';

import CreateChannelModalMenu from './channelmenu/channelmodalmenu.js';
import DiscordLogoWhite from '../SplashPage/DiscordLogoWhite.png'

const ChannelList = () => {
    const location = useLocation()
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



    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [channelId, setChannelId] = useState(null)
    const [display, setDisplay] = useState("none")
    const stopmenu = (e) => {

        e.preventDefault()
        const CcontextMenu = document.getElementById('servercontextmenu')



        setDisplay("none")

    }

    const handleClick = () => {
        setDisplay("none")
    }




    const rightonclick = (e, channelid) => {


        e.stopPropagation()
        e.preventDefault()
        setChannelId(channelid)
        setDisplay("flex")
        setX(e.pageX - 100)
        setY(e.pageY)



    }

    const hidechannels = (e) =>{
        e.stopPropagation()
        let hidebutton;
         if(document.getElementsByClassName("fa-solid fa-angle-down fa-xs").length > 0) {
            hidebutton = document.getElementsByClassName("fa-solid fa-angle-down fa-xs")[0]
            hidebutton.className="fa-solid fa-angle-right fa-xs"
         }
         else if(document.getElementsByClassName("fa-solid fa-angle-right fa-xs").length > 0) {
            hidebutton = document.getElementsByClassName("fa-solid fa-angle-right fa-xs")[0]
            hidebutton.className="fa-solid fa-angle-down fa-xs"
         }
         console.log(hidebutton.className)


        let channels = document.getElementsByClassName("channellist")
        for (let i = 0;i<channels.length;i++){
            if(channels[i].style.display === "none"){
                channels[i].style.display = "flex"
            }
            else{
                channels[i].style.display = "none"
            }

        }

    }

    const voice = (e) =>{
        e.stopPropagation()
        let hidebutton;
         if(document.getElementsByClassName("v fa-solid fa-angle-down fa-xs").length > 0) {
            hidebutton = document.getElementsByClassName("v fa-solid fa-angle-down fa-xs")[0]
            hidebutton.className="v fa-solid fa-angle-right fa-xs"
         }
         else if(document.getElementsByClassName("v fa-solid fa-angle-right fa-xs").length > 0) {
            hidebutton = document.getElementsByClassName("v fa-solid fa-angle-right fa-xs")[0]
            hidebutton.className="v fa-solid fa-angle-down fa-xs"
         }



        let channels = document.getElementsByClassName("channellistvoice")
        for (let i = 0;i<channels.length;i++){
            if(channels[i].style.display === "none"){
                channels[i].style.display = "flex"
            }
            else{
                channels[i].style.display = "none"
            }

        }

    }

    return (


        <>

            <>
            <br></br>
            <ul className="listofchannels">


                {serverid!=="@me" &&
                <div className="textchanneldropdown" onClick={e=>hidechannels(e)}>
                    <span className="angle"><i className="fa-solid fa-angle-down fa-xs" ></i></span>
                    <span className="textchannelstitle">TEXT CHANNELS</span>
                </div>
}
                {!!channels && channels.length > 0 &&
                    channels.filter(channel=>!channel.voice).map(channel => <>
                        <div  key={channel.id} className={channelid==channel.id?"channellistfocus":"channellist"} onContextMenu={(e) => rightonclick(e, channel.id)} >

                            <NavLink className={channelid==channel.id?"friendslistlistfocus":"friendslistlist"} to={`/channels/${channel.serverId}/${channel.id}`} ><span><i className="fa-solid fa-hashtag fa-lg" /></span> {channel.name.length > 15 && !!servers && servers.list && servers.list.length > 0 && server.length > 0 && server[0].adminId == user.id ? channel.name.slice(0, 15) + "..." : channel.name}{channelId == channel.id}
                            </NavLink>

                            {!!servers && servers.list && servers.list.length > 0 && server.length > 0 && server[0].adminId == user.id && <CreateChannelModalMenu channelid={channel.id} />}


                        </div>

                    </>)
                }

            </ul>

            <ul className="listofchannels">
                {serverid!=="@me" &&
                <div className="voicechanneldropdown" onClick={e=>voice(e)}>
                    <span className="angle"><i className="v fa-solid fa-angle-down fa-xs" ></i></span>
                    <span className="textchannelstitle">VOICE CHANNELS</span>
                </div>
}
                {!!channels && channels.length > 0 &&
                    channels.filter(channel=>channel.voice).map(channel => <>
                        <div  key={channel.id} className={channelid==channel.id?"channellistvoicefocus":"channellistvoice"} onContextMenu={(e) => rightonclick(e, channel.id)} >

                            <NavLink className={channelid==channel.id?"friendslistlistfocus":"friendslistlist"} to={`/channels/${channel.serverId}/${channel.id}`} ><span><i className="fa-solid fa-hashtag fa-lg" /></span> {channel.name.length > 15 && !!servers && servers.list && servers.list.length > 0 && server.length > 0 && server[0].adminId == user.id ? channel.name.slice(0, 15) + "..." : channel.name}{channelId == channel.id}
                            </NavLink>

                            {!!servers && servers.list && servers.list.length > 0 && server.length > 0 && server[0].adminId == user.id && <CreateChannelModalMenu channelid={channel.id} />}


                        </div>

                    </>)
                }


            </ul>


            </>




        </>


    )
}

export default ChannelList
