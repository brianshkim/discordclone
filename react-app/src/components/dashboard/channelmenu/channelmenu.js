import DeleteServerModal from "../deleteservermodal"
import EditServerModal from "../editservermodal"
import CreateChannelModal from "../createchannel"


const Menu = ({x , y,  channelid, display}) =>{
console.log(channelid)
    const style = () =>{
        return {
            height: 200,
            width: 150,
            borderRadius: 10,
            backgroundColor: "#FF5C58",
            color: '#FCD2D1',
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
            <div>Edit Channel</div>
            <div style={{...style.div, ...style.margin}}>Delete Channel</div>
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
