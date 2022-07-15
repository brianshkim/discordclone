import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Route, Redirect } from 'react-router-dom';
import { get_servers } from '../../store/servers';
import { get_channels } from '../../store/channels';
import Menu from './rightclickmenu/menu';
import CreateServerModal from './createservermodal';
import './dashboard.css'
import JoinServerModal from './joinservermodal';
import FriendsList from './friendslist';

const ServerNav = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const allservers = useSelector(state=>state.servers.list)
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [serverId, setserverId] = useState(null)
    const [display, setDisplay] = useState("none")
    const servers = useSelector(state => state?.servers)
    const stopmenu = (e) => {
        e.preventDefault()
        setDisplay("none")

    }

    const handleClick = (e) => {
        e.preventDefault()
        setDisplay("none")

    }






    useEffect(() => {

        document.addEventListener("click", handleClick);
        document.addEventListener("contextmenu", stopmenu)

        return () => {

            document.removeEventListener("contextmenu", stopmenu);
            document.removeEventListener("click", handleClick);
        };
    }, [])

    const gotoserver = async(e, serverid)=>{
        e.preventDefault()
        let button = document.getElementById(`button-${serverid}`)


        let filtered = allservers.filter(server=>server.id==serverid)
        await dispatch(get_channels(serverid))

        if (filtered && filtered.length > 0 && filtered[0].channels && filtered[0].channels.length>0) history.push(`/channels/${serverid}/${filtered[0].channels[0].id}`)
        else history.push(`/channels/${serverid}`)

    }

    const rightonclick = async(e, serverid) => {
        e.stopPropagation()
        e.preventDefault()
        setserverId(serverid)
        setDisplay("flex")
        setX(e.pageX)
        setY(e.pageY)



    }

    return (


        <div className="servernavcontainer">
            <div className="serverslist">
                <ul className="serverslistchild">
                    {servers && servers.list && servers.list.map((Server) => (


                        <li className="serverlist-list" key={Server.id}><button id={`button-${Server.id}`}
                        onClick={(e)=>gotoserver(e, Server.id)}
                        className="serverbuttons"
                        onContextMenu={(e) => rightonclick(e, Server.id)} > {/*serverId === Server.id && <Menu x={x} y={y} serverid={Server.id} display={display} />*/}{Server.name[0].toUpperCase()} </button></li>

                    ))}

                </ul>
            </div>

            <div className="joinserverbutton">
                <JoinServerModal />

            </div>
            <div className="addserversbutton">
                <CreateServerModal />
            </div>


        </div>


    )
}

export default ServerNav
