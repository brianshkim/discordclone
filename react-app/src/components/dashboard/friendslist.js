import React, { useState, useEffect } from 'react';

import { Switch, useParams, NavLink, useLocation, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import './dashboard.css'
import ProfilePageMenu from './profilepage';

import { get_channels } from '../../store/channels';
import { get_servers } from '../../store/servers';

import CreateChannelModal from './createchannel';
import EditServerModal from './editservermodal';
import DeleteServerModal from './deleteservermodal';
import LeaveServerModal from './leaveservermodal';
import { getallfriends } from '../../store/friends';
import ChannelList from './channellist';
import MyChannel from './mychannel';
import CreateChannelModalMenu from './channelmenu/channelmodalmenu.js';
import DiscordLogoWhite from '../SplashPage/DiscordLogoWhite.png'

const FriendsList = () => {
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
    useEffect(() => {
        dispatch(get_servers(user.id))
        dispatch(getallfriends(user.id))
        dispatch(get_channels(serverid))

    }, [dispatch])


    useEffect(() => {


        document.addEventListener("click", handleClick);
        document.addEventListener('contextmenu', stopmenu)
        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("contextmenu", stopmenu);
        };
    }, [])

    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
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


        <div className="friendslistcontainer">
            <div className="friendslistheader">{!!servers && !!servers.list && servers.list.length > 0 && server.length > 0 && server[0].name}
                   {!!serverid && !!servers && servers.list && servers.list.length > 0 && server.length > 0 && server[0].name && <div className="dropdown">
                        <button className="dropbtn"><i className="fa-solid fa-circle-chevron-down"></i></button>
                        <div className="dropdown-content">
                            <div><DeleteServerModal serverid={serverid}/></div>
                            <div><EditServerModal serverid={serverid}/></div>
                            <div><CreateChannelModal serverid={serverid}/></div>
                            {server[0].adminId != user.id && <div><LeaveServerModal serverid={serverid}/></div>}
                        </div>
                    </div>}

            </div>

            
            <ChannelList />
 






            <footer className="userbar" >
                <span className="userusercont"><div className="usercontainer" >{!user.avatar &&<div className="useravatar"><img className="discordavatar4" src={DiscordLogoWhite} height="16" width="16"></img> <div className="onlinestatusshape2"></div></div>}
              {!!user.avatar &&<div className="useravatar"><img className="discordavatar3" src={user.avatar} height="32" width="32"></img> <div className="onlinestatusshape"></div></div>}</div></span>

                <span className="usernamefoot">{user.username}</span>


                <span className="logoutbutton"><ProfilePageMenu /></span>

            </footer>


        </div>


    )
}

export default FriendsList
