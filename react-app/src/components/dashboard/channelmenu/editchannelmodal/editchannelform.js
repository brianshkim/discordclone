import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_channel, get_channels } from "../../../../store/channels"
import './editchannel.css'


const EditChannelForm = ({ closeModal, channelid}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const channel = useSelector(state => state.channels.list).filter(channel => channel.id == channelid)
    const [name, setName] = useState(`${channel[0].name}`)


    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation()
        await dispatch(update_channel(channelid, name)).then(() => dispatch(get_channels(channel[0].serverId)))
        closeModal()

    };


    return (
        <div className="editchannelcontainer">
            <form

            >
                <h3 className="editchanneltitle">Overview</h3>
                <input
                className="editchannelinput"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                </input>

               <div className="submiteditcont"><button id="submiteditchannel" onClick={(e) => { handleSubmit(e) }} type="submit" >Edit Channel</button></div>
            </form>

        </div>


    );

};

export default EditChannelForm
