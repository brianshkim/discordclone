import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { get_servers } from '../../store/servers';
import { get_channels } from '../../store/channels';
import useRightClickMenu from './rightclickmenu/ServerDropDown';
import Menu from './rightclickmenu/menu';
import CreateServerModal from './createservermodal';
import './dashboard.css'
import JoinServerModal from './joinservermodal';

const ServerNav = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const allservers = useSelector(state=>state.servers.list)
    const [name, setName] = useState('')
    const [editName, setEditName] = useState('')
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [serverId, setserverId] = useState(null)
    const [display, setDisplay] = useState("none")

    const [show, setShow] = useState(false)
    const [showMenu, setShowMenu] = useState(false)


    const servers = useSelector(state => state?.servers)

    const stopmenu = (e) => {
        e.preventDefault()

    }

    const handleClick = () => {
        setDisplay("none")
    }

    console.log(servers)




    useEffect(() => {

        document.addEventListener("click", handleClick);
        document.addEventListener('contextmenu', stopmenu)
        return () => {
            document.addEventListener("click", handleClick);
            document.removeEventListener("contextmenu", stopmenu);
        };
    })

    const gotoserver =(e, serverid)=>{
        e.preventDefault()
        let filtered = allservers.filter(server=>server.id==serverid)
        history.push(`/channels/${serverid}/${filtered[0].id}`)


    }


    const rightonclick = (e, serverid) => {
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
                <ul>
                    {servers && servers.list && servers.list.map((Server) => (


                        <li key={Server.id}><button id={Server.id}
                        onClick={(e)=>gotoserver(e, Server.id)}
                        className="serverbuttons"
                        onContextMenu={(e) => rightonclick(e, Server.id)} > {serverId === Server.id && <Menu x={x} y={y} serverid={Server.id} display={display} />}{Server.name} </button></li>

                    ))}
                    <button>asfsf</button>
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
