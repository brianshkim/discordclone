import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { get_servers } from '../../store/servers';
import { get_channels } from '../../store/channels';
import useRightClickMenu from './rightclickmenu/ServerDropDown';
import Menu from './rightclickmenu/menu';
import CreateServerModal from './createservermodal';
import './dashboard.css'

const ServerNav = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [name, setName] = useState('')
    const [editName, setEditName] = useState('')
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const [show, setShow] = useState(false)
    const [showMenu, setShowMenu] = useState(false)


    const servers = useSelector(state => state?.servers)

    const stopmenu = (e)=>{
        e.preventDefault()

    }

    const handleClick = () => {
        setShowMenu(false)
      }

      useEffect(() => {
        dispatch(get_servers(user.id))


    }, [])


    useEffect(()=>{

        document.addEventListener("click", handleClick);
        document.addEventListener('contextmenu', stopmenu )
        return () => {
            document.addEventListener("click", handleClick);
            document.removeEventListener("contextmenu", stopmenu);
          };
    })





    const rightonclick = (e, serverid) => {
        e.preventDefault()
        setShowMenu(true)
       }


    return (

        <div className="servernavcontainer">
            <div className="serverslist">
            {servers && servers.list && servers.list.map((Server) => (
                <button id={Server.id} className="serverbuttons" onContextMenu={(e)=>rightonclick(e, Server.id)} >{showMenu && <Menu showMenu={showMenu}/>}sfafsadf </button>

            ))}
            </div>
            <div className="addserversbutton">
                <CreateServerModal />


            </div>

        </div>

    )
}

export default ServerNav
