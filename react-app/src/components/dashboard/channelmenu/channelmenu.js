import EditChannelModal from './editchannelmodal'
import DeleteChannelModal from './deletechannelmodal'
import { useSelector } from 'react-redux'
import './channelmenu.css'


const Menu = ({x , y,  channelid, serverid, display}) =>{
const user = useSelector(state=>state.session.user)




    const style = () =>{
        return {
            height: 150,
            width: 150,
            borderRadius: 3,
            backgroundColor: "#18191c",
            color: '#B9BBBE',
            display: 'flex',
            flexDirection: 'column',
            top: y,
            left: x+80,
            position: 'absolute',
            display,
        }


    }


    return(
        <div className="channelmenu"style={style()}>
            <div className='channelitem'><EditChannelModal channelid={channelid} serverid={serverid}/></div>
            <div className='channelitemseparator'></div>
            <div className='channelitem' ><DeleteChannelModal channelid={channelid} serverid={serverid}/></div>
            <div className='channelitemseparator'></div>
            <div className='channelitem' ></div>
        </div>


    )

}



export default Menu
