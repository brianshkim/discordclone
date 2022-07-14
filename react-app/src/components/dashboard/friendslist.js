import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Switch, useParams, NavLink, useLocation, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import './dashboard.css'
import ChannelMenu from './channelmenu/channelmenu'
import { get_channels } from '../../store/channels';
import { get_servers } from '../../store/servers';
import DeleteChannelModal from './channelmenu/deletechannelmodal';
import EditChannelModal from './channelmenu/editchannelmodal';
import LogoutButton from '../auth/LogoutButton'
import CreateChannelModal from './createchannel';
import EditServerModal from './editservermodal';
import DeleteServerModal from './deleteservermodal';


const FriendsList = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const { serverid } = useParams()
    const { channelid } = useParams()


    const user = useSelector(state => state.session.user)

    const servers = useSelector(state => state?.servers)
    console.log(servers)
    const channels = useSelector(state => state.channels.list)
    let server = []
    if (servers && servers.list && servers.list.length > 0) server = servers.list.filter(server => server.id == serverid)
    console.log(server)


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
        dispatch(() => get_servers(user.id))
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
        console.log(channelid)
        e.stopPropagation()
        e.preventDefault()
        setChannelId(channelid)
        setDisplay("flex")
        setX(e.pageX - 100)
        setY(e.pageY)


    }


    return (


        <div className="friendslistcontainer">
            <div className="friendslistheader">{!!servers && !!servers.list && servers.list.length > 0 && server.length > 0 && server[0].name}
                   {!!serverid && !!servers && servers.list && servers.list.length > 0 && server.length > 0 && server[0].name && <div class="dropdown">
                        <button class="dropbtn"><i class="fa-solid fa-circle-chevron-down"></i></button>
                        <div class="dropdown-content">
                            <div><DeleteServerModal serverid={serverid}/></div>
                            <div><EditServerModal serverid={serverid}/></div>
                            <div><CreateChannelModal serverid={serverid}/></div>
                        </div>
                    </div>}

            </div>


            <br></br>
            <ul className="listofchannels">
                {!!channels && channels.length > 0 &&
                    channels.map(channel => <>
                        <div className="channellist" onContextMenu={(e) => rightonclick(e, channel.id)} >
                            <NavLink className="friendslistlist" to={`/channels/${channel.serverId}/${channel.id}`} ><div><i class="fa-solid fa-hashtag fa-lg" /></div> {channel.name.length > 7 && !!servers && servers.list && servers.list.length > 0 && server.length > 0 && server[0].adminId == user.id ? channel.name.slice(0, 4) + "..." : channel.name}{channelId == channel.id}
                            </NavLink>
                            {!!servers && servers.list && servers.list.length > 0 && server.length > 0 && server[0].adminId == user.id && <EditChannelModal channelid={channel.id} />}
                            {!!servers && servers.list && servers.list.length > 0 && server.length > 0 && server[0].adminId == user.id && <DeleteChannelModal channelid={channel.id} />}


                        </div>

                    </>)
                }
            </ul>
            <footer >

                <span className="usernamefoot">{user.username}</span>

                <span className="logoutbutton"><LogoutButton /></span>

            </footer>


        </div>


    )
}

export default FriendsList
