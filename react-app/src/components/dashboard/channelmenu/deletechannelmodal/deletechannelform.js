import { useDispatch, useSelector } from "react-redux";
import { delete_channel, get_channels } from "../../../../store/channels"
import './deletechannel.css'
import { useParams, useHistory } from "react-router-dom";



const DeleteChannelForm = ({ closeModal, channelId }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {serverid} = useParams()
    const {channelid} = useParams()
    const user = useSelector(state => state.session.user)
    const channels= useSelector(state=>state.channels.list)
    const channel = useSelector(state => state.channels.list).filter(channel => channel.id == channelId)

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation()
        await dispatch(delete_channel(channelId)).then(() => dispatch(get_channels(channel[0].serverId)))
        if (channels.length === 1){
            history.push(`/channels/${serverid}`)
        }

        else if (channelId == channels[0].id && channels.length>=2 && channelid==channelId){

            history.push(`/channels/${serverid}/${channels[1].id}`)
        }


        else if (channelId == channels[1].id && channels.length==2){

            history.push(`/channels/${serverid}/${channels[0].id}`)
        }

        else if (channelid==channelId)
        {
            history.push(`/channels/${serverid}/${channels[0].id}`)

        }

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
