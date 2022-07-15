import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_channel, get_channels } from "../../../store/channels";
import { get_servers } from "../../../store/servers";
import {useHistory} from 'react-router-dom'
import './createchannel.css'


const CreateChannelForm = ({serverid, closeModal}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user= useSelector(state => state.session.user)
    const [name, setName] = useState("")
    const [error, setError] = useState([])
    const server = useSelector(state=>state.servers.list).filter(server=>server.id==serverid)
    const channels = useSelector(state=>state.channels)
    console.log(server[0].adminId)

    const handleSubmit = async (e) => {
        e.preventDefault();

        closeModal()
        let submitbutton = document.getElementById("submitcreatechannel")

        await dispatch(create_channel(user.id,serverid,name)).then(()=>(dispatch(get_channels(serverid)))).then(()=>dispatch(get_servers(user.id))).then(()=>(dispatch(get_channels(serverid))))
        history.push(`/channels/${serverid}/${channels.list[channels.list.length-1].id}`)
        submitbutton.disabled="true";


    };

    useEffect(()=>{
        let newerror = []
        if (name.length < 1){
            newerror.push("Name must be one or more characters")
        }

        if (name.length > 25){
            newerror.push("Name must be less than 25 characters")
        }
        if (server[0].adminId!=user.id){
            newerror.push("You do not have permission to create a channel")
        }
       setError(newerror)
    }, [user.id, name])




    return (
        <div className="channelcreatecontainer">
            <form

            >
                <div className="createchannelheader"><h2 className="createchanneltitle">Create a Channel</h2></div>

                <div className="createchannelinputtitle"><h5 className="createinputtitle">CHANNEL NAME</h5></div>
                <input
                className="createchannelinput"
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}>
                </input>
                <br></br>
                <br></br>
                <br></br>

                <div className="createchannelbutton"><button id="submitcreatechannel" onClick={(e)=>{handleSubmit(e)}} disabled={error.length>0} type="submit" >Create</button></div>
                <div className="deleteerror">{error.length > 0 && error.map(error=>(
                    <div>{error}</div>
                ))}</div>
            </form>

        </div>


    );

};

export default CreateChannelForm
