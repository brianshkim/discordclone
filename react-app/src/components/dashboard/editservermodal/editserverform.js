import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_servers, update_server } from "../../../store/servers";
import './editserver.css'

const EditServerForm = ({ closeModal, serverid }) => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [error, setError] = useState([])
    const user = useSelector(state => state.session.user)
    let servers = (useSelector(state=>state.servers))
    let server = [];
    if (servers && servers.list&& servers.list.length>0) {
        server = servers.list.filter((server) => server.id == serverid)

    }






    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(update_server(serverid, name))
        await dispatch(get_servers(user.id))

        closeModal()

    };

    useEffect(() => {
        dispatch(() => get_servers(user.id))


    }, [dispatch])

    useEffect(()=>{
        if(server.length > 0){
            setName(server[0].name)
        }
    }, [server.length])
    useEffect(()=>{
        let newerror=[]
        if (name.length < 1){
            newerror.push("Name must be one or more characters")
        }
        if (name.length > 23){
            newerror.push("Name must be less than 23 characters")
        }
        if (user.id!=server[0].adminId){
            newerror.push("You do not have permission to edit the server")
        }
        setError(newerror)

    }, [user.id, name])





    return (
        <div className="editservercontainer">
            <div className="editserverheader"><h2 className="editmenutitle">Server Overview</h2></div>
            <form
                className="Serverinput"

            >
                <div className="avatar"><button className="avatarbutton">{name[0]}</button></div>
                <div className="editcolumnbox">
                    <h3 className="servernamecont">SERVER NAME</h3>
                    <input
                    className="editservername"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                    </input>
                    <br></br>
                    <br></br>
                    <div className="editbuttoncont"><button id="submiteditserver" onClick={(e) => { handleSubmit(e) }} type="submit" disabled={error.length>0}>Edit Server</button></div>
                    <br></br>
                    <div className="deleteerror">{error.length > 0 && error.map(error=>(
                    <div>{error}</div>
                ))}</div>
                </div>


            </form>


        </div>


    );

};

export default EditServerForm
