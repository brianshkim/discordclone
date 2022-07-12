import DeleteServerModal from "../deleteservermodal"
import EditServerModal from "../editservermodal"
import CreateChannelModal from "../createchannel"
import './menu.css'


const Menu = ({x , y,  serverid, display}) =>{
console.log(serverid)
    const style = () =>{
        return {
            height: 150,
            width: 150,
            borderRadius: 10,
            backgroundColor: "#18191c",
            color: '#B9BBBE',
            display: 'flex',
            flexDirection: 'column',

            position: 'absolute',
            display,
        }


    }


    return(
        <div classId="servercontextmenu" style={style()}>
            <div className="menuitem"><DeleteServerModal serverid={serverid}/></div>
            <div className="menuseparator"></div>
            <div className="menuitem" style={{...style.div, ...style.margin}}><EditServerModal serverid={serverid}/></div>
            <div className="menuseparator"></div>
            <div className="menuitem" style={style.div}><CreateChannelModal serverid={serverid}/></div>

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
