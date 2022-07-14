import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom"
import { update_channel, get_channels } from "../../../../store/channels"
import './editchannel.css'


const EditChannelForm = ({ closeModal, channelid}) => {
    const {serverid} = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [error, setError] = useState([])
    const channel = useSelector(state => state.channels.list).filter(channel => channel.id == channelid)
    const [name, setName] = useState(`${channel[0].name}`)
    const server = useSelector(state => state.servers.list).filter((server) => server.id == serverid)


    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation()
        await dispatch(update_channel(channelid, name)).then(() => dispatch(get_channels(channel[0].serverId)))
        closeModal()

    };

    useEffect(()=>{
        let newerror=[]
        if (name.length < 1){
            newerror.push("Name must be one or more characters")
        }
        if (name.length > 25){
            newerror.push("Name must be less than 25 characters")
        }
        if (user.id!=server[0].adminId){
            newerror.push("You do not have permission to edit the server")
        }
        setError(newerror)

    }, [user.id, name])



    return (
        <div className="editchannelcontainer">
            <form className="editform"

            >
                <h3 className="editchanneltitle">Overview</h3>
                <input
                className="editchannelinput"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                </input>
                <div className="deleteerror">{error.length > 0 && error.map(error=>(
                    <div>{error}</div>
                ))}</div>
                <br></br>

               <div className="submiteditcont"><button id="submiteditchannel" onClick={(e) => { handleSubmit(e) }} type="submit" disabled={error.length > 0} >Edit Channel</button></div>



            </form>

        </div>


    );

};

export default EditChannelForm
