import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom';
import { get_servers, create_server, update_server } from '../store/servers';


const Home =() =>{
    const dispatch = useDispatch()
    const user = useSelector(state=>state.session.user)
    const [name, setName] = useState('')
    const [editName, setEditName] = useState('')

    const servers = useSelector(state=>state.servers)

    useEffect (()=>{
        dispatch(get_servers(user.id))

    }, [])

    const onsubmit = (e) =>{
        e.preventDefault()
        dispatch(create_server(user.id, name))

    }

    const onEdit = (e) =>{
        e.preventDefault()
        dispatch(update_server(user.id, name))

    }



    return(
    <div>
        <div>
            Create Server
            <form

            onSubmit={onsubmit}>
                <label>Name</label>
                <input type="text"
                onChange={((e)=>setName(e.target.value))} />
                <button type="submit">Create</button>

            </form>
        </div>
        <div>
        Edit Server

        <form

        onSubmit={onEdit}>
            <label>Name</label>
            <input type="text"
            id="1"
            onChange={((e)=>setEditName(e.target.value))} />
            <button type="submit">Submit Change</button>

        </form>
    </div>
    </div>



    )


}

export default Home
