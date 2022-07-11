import DeleteServerModal from "../deleteservermodal"
import EditServerModal from "../editservermodal"
import CreateChannelModal from "../createchannel"


const Menu = ({x , y,  serverid, display}) =>{
console.log(serverid)
    const style = () =>{
        return {
            height: 200,
            width: 150,
            borderRadius: 10,
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
            <div><DeleteServerModal serverid={serverid}/></div>
            <div style={{...style.div, ...style.margin}}><EditServerModal serverid={serverid}/></div>
            <div style={style.div}><CreateChannelModal serverid={serverid}/></div>

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
