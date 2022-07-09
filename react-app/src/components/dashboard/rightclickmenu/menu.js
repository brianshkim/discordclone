

const Menu = ({x , y, showMenu}) =>{

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
            display: showMenu ? 'flex':"none",
        }


    }


    return(
        <div style={style()}>
            <div style={style.div}>Button 1</div>
            <div style={{...style.div, ...style.margin}}>Button 2</div>
            <div style={style.div}>Button 3</div>

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
