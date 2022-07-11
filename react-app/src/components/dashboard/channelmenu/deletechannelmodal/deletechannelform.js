import { useDispatch, useSelector } from "react-redux";
import { delete_channel, get_channels } from "../../../../store/channels"



const DeleteChannelForm = ({closeModal, channelid}) => {
    const dispatch = useDispatch()
    const user= useSelector(state => state.session.user)
    const channel = useSelector(state => state.channels.list).filter(channel => channel.id == channelid)

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation()
        await dispatch(delete_channel(channelid)).then(()=>dispatch(get_channels(channel[0].serverId)))
        closeModal()

    };


    return (
        <div className="deletechannelcontainer">
            <form

            >
                <label>Delete Channel</label>


                <button id="delete-channel" onClick={(e=>handleSubmit(e))} type="submit" >Delete</button>
            </form>

        </div>


    );

};

export default DeleteChannelForm
