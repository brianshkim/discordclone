import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Switch, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import './dashboard.css'
import Menu from './channelmenu/channelmenu'

const FriendsList = () => {
    const { serverid } = useParams()
    const servers = useSelector(state => state?.servers?.list)
    const channels = useSelector(state => state?.channels?.list)

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [channelId, setChannelId] = useState(null)
    const [display, setDisplay] = useState("none")
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


    const rightonclick = (e, channelid) => {
        console.log(channelid)
        e.stopPropagation()
        e.preventDefault()
        setChannelId(channelid)
        setDisplay("flex")
        setX(e.pageX-100)
        setY(e.pageY)


    }




    return (
        <div className="friendslistcontainer">
            <ul>
                {!!channels && channels.length > 0 &&
                    channels.map(channel =>
                        <li onContextMenu={(e) => rightonclick(e, channel.id)} contex><Link to={`/channels/${channel.serverId}/${channel.id}`} >{channel.name}<Menu x={x} y={y} channelid={channel.id} display={display} />{channel.name}</Link></li>)}
            </ul>

        </div>
    )
}

export default FriendsList
