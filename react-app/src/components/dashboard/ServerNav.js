import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { get_servers } from '../../store/servers';
import { get_channels } from '../../store/channels';
import useRightClickMenu from './rightclickmenu/ServerDropDown';
import Menu from './rightclickmenu/menu';
import './dashboard.css'

const ServerNav = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [name, setName] = useState('')
    const [editName, setEditName] = useState('')
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 })
    const [show, setShow] = useState(false)
    const [showMenu, setShowMenu] = useState(false)


    const servers = useSelector(state => state?.servers)

    const stopmenu = (e)=>{
        e.preventDefault()
    }


    useEffect(()=>{

        document.addEventListener("click", ()=>setShowMenu(false))
        document.addEventListener('contextmenu', stopmenu )
    })


    useEffect(() => {
        dispatch(get_servers(user.id))


    }, [])


    const rightonclick = (e, serverid) => {
        e.preventDefault()
       document.getElementById(`${serverid}`).onmousedown = function(e){
        e.preventDefault()
        setShowMenu(true)

       }

    }




    return (

        <div className="servernavcontainer">
            <div className="serverslist">
            {servers && servers.list && servers.list.map((Server) => (
                <button id={Server.id} className="serverbuttons" onClick={(e)=>rightonclick(e, Server.id)}>{showMenu && <Menu showMenu={showMenu}/>}sfafsadf </button>

            ))}
            </div>
            <div className="addserversbutton">
                <button className="addserver"><i class="fa-solid fa-plus fa-2x"></i></button>

            </div>








        </div>

    )
}

export default ServerNav
