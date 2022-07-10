import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_channel, get_channels } from "../../../store/channels";
import {useHistory} from 'react-router-dom'

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
                <label>Create a Channel</label>
                <input
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}>
                </input>

                <button id="submitcreatechannel" onClick={(e)=>{handleSubmit(e)}} type="submit" >Create</button>
            </form>

        </div>


    );

};

export default CreateChannelForm
