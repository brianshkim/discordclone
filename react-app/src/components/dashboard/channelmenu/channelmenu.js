import EditChannelModal from './editchannelmodal'
import DeleteChannelModal from './deletechannelmodal'
import { useSelector } from 'react-redux'


const Menu = ({x , y,  channelid, serverid, display}) =>{
const user = useSelector(state=>state.session.user)
const server = useSelector(state=>state.servers.list).filter(server=>server.id==serverid)



    const style = () =>{
        return {
            height: 200,
            width: 150,
            borderRadius: 3,
            backgroundColor: "#18191c",
            color: '#B9BBBE',
            display: 'flex',
            flexDirection: 'column',
            padding: 10,
            top: y,
            left: x,
            position: 'absolute',
            display,
        }


    }


    return(
        <div style={style()}>
            <div><EditChannelModal channelid={channelid} serverid={serverid}/></div>
            <div style={{...style.div, ...style.margin}}><DeleteChannelModal channelid={channelid} serverid={serverid}/></div>
            <div style={style.div}></div>

        </div>


    )

}

const style = {
    div: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FE8F8F",
        color: "#FFEDD3",
        fontWeight: "bold",
        cursor: "point"
    },
    margin:{
        margin: "10px, 0px"
    }
}

export default Menu
