import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { get_servers } from '../../store/servers';
import { get_channels } from '../../store/channels';
import './dashboard.css'

const ServerNav = () => {
    const dispatch = useDispatch()
    const user = useSelector(state=>state.session.user)
    const [name, setName] = useState('')
    const [editName, setEditName] = useState('')

    const servers = useSelector(state=>state?.servers)
    console.log(servers.list)

    useEffect (()=>{
        dispatch(get_servers(user.id))


    }, [])
    return (

        <div className="servernavcontainer">
            {servers && servers.list && servers.list.map((Server)=>(
                <button className="serverbuttons">{Server.name[0]}</button>

            ))}




        </div>
    )
}

export default ServerNav
