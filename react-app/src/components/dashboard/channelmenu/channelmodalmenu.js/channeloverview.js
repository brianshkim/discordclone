import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom"
import { update_channel, get_channels } from "../../../../store/channels"
import DeleteChannelModal from "../deletechannelmodal"
import DeleteChannelForm from "../deletechannelmodal/deletechannelform";
import EditChannelForm from "../editchannelmodal/editchannelform";
import './channelmodalmenu.css'

const ChannelOverview = ({channelid, closeModal}) =>{
    const menuitems = {1:"Overview", 2:"Delete Channel"}
    const channels = useSelector(state => state.channels.list)
    const channel = channels.filter(channell=>channell.id===channelid)
    const [menuItem, setMenuItem] = useState(1)

    const closech = () =>{
        closeModal()
    }
    return (
    <div className="channelMenuCont">
        <div className="channelmenulist">
            <div className="chmenucont">
                <div className="chmenutitle"># {channel[0].name.toUpperCase()} <span className="chmenutitlevoice">{channel.voice?"Voice Channels":"TEXT CHANNELS"}</span></div>

                <div className="chmenuitems" onClick={()=>setMenuItem(Object.keys(menuitems)[0])}>Overview</div>
                <div className="chmenudivider"></div>
                <DeleteChannelModal channelid={channelid} />


            </div>

        </div>

        {menuItem ==1 && <EditChannelForm channelid={channelid}/>}
        <div className="channelmenuescape">
            <div className="chescbutton">
                <div className="escbuttonborder" onClick={closech}><i class="fa-solid fa-xmark fa-lg"></i></div>
                <div className="esctext">ESC</div>
            </div>
        </div>



    </div>
    )
}


export default ChannelOverview
