import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_channel, get_channels } from "../../../../store/channels"



const EditChannelForm = ({ closeModal, channelid }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const channel = useSelector(state => state.channels.list).filter(channel => channel.id == channelid)
    console.log(channelid)
    const [name, setName] = useState(`${channel[0].name}`)


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hello")
        e.stopPropagation()
        await dispatch(update_channel(channelid, name)).then(() => dispatch(get_channels(channel[0].serverId)))
        closeModal()

    };


    return (
        <div className="editchannel">
            <form

            >
                <label>Edit Server</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                </input>

                <button id="submiteditchannel" onClick={(e) => { handleSubmit(e) }} type="submit" >Edit</button>
            </form>

        </div>


    );

};

export default EditChannelForm
