import { useDispatch, useSelector } from "react-redux";
import { delete_channel, get_channels } from "../../../../store/channels"
import './deletechannel.css'



const DeleteChannelForm = ({ closeModal, channelid }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const channel = useSelector(state => state.channels.list).filter(channel => channel.id == channelid)

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation()
        await dispatch(delete_channel(channelid)).then(() => dispatch(get_channels(channel[0].serverId)))
        closeModal()

    };

    const handlecancel = () => {
        closeModal()
    }


    return (
        <div className="deletechannelcontainer">
            <div className="deletechanneltitle">Delete Channel</div>
            <div className="deletechannelpara">Are you sure you want to delete <strong>#{channel[0].name}</strong>? This cannot be undone.</div>
            <form

            >

                <br></br>
                <div className="deletebutton-cont">
                    <button id="cancel-button" onClick={handlecancel}>Cancel</button>
                    <button id="delete-channel" onClick={(e => handleSubmit(e))} type="submit" >Delete Channel</button>
                </div>
            </form>

        </div>


    );

};

export default DeleteChannelForm
