import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom';

import { get_channels, create_channel, update_channel, delete_channel } from '../store/channels';

const Channels =() =>{
    const dispatch = useDispatch()
    const user = useSelector(state=>state.session.user)
    const [name, setName] = useState('')
    const [editName, setEditName] = useState('')

    const servers = useSelector(state=>state.servers.list)


    useEffect (()=>{

        dispatch(get_channels(1))

    }, [])

    const onsubmit = (e) =>{
        e.preventDefault()
        e.stopPropagation()
        dispatch(create_channel(user.id, 1, name))


    }

    const onEdit = (e) =>{
        e.preventDefault()
        dispatch(update_channel(2, name))


    }

    const deleteserver = (e) => {
        dispatch(delete_channel(2))
    }




    return(
    <div>
        <div>
            Create Channel
            <form

            onSubmit={onsubmit}>
                <label>Name</label>
                <input type="text"
                onChange={((e)=>setName(e.target.value))} />
                <button type="submit">Create</button>

            </form>
        </div>
        <div>
        Edit Channel

        <form

        onSubmit={onEdit}>
            <label>Name</label>
            <input type="text"
            id="1"
            onChange={((e)=>setEditName(e.target.value))} />
            <button type="submit">Submit Change</button>

        </form>

        <button onClick={deleteserver}>Delete</button>
    </div>
    </div>



    )


}

export default Channels
