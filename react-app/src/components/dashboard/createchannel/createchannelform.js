import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_channel, get_channels } from "../../../store/channels";
import {useHistory} from 'react-router-dom'
import './createchannel.css'

const CreateChannelForm = ({serverid, closeModal}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user= useSelector(state => state.session.user)
    const [name, setName] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hello")

        await dispatch(create_channel(user.id,serverid,name)).then(()=>(dispatch(get_channels(serverid))))

        closeModal()

    };

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

                <div className="createchannelbutton"><button id="submitcreatechannel" onClick={(e)=>{handleSubmit(e)}} type="submit" >Create</button></div>
            </form>

        </div>


    );

};

export default CreateChannelForm
