import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { get_servers, delete_server } from "../../../store/servers";
import { unload_channels } from "../../../store/channels";
import './deleteserver.css'



const DeleteServerForm = ({closeModal, serverid}) => {
    const history = useHistory()
    const [name,setName] = useState("")
    const [error, setError] = useState([])
    const dispatch = useDispatch()
    const user= useSelector(state => state.session.user)
    let servers = (useSelector(state=>state.servers))
    let server = [];
    if (servers && servers.list&& servers.list.length>0) {
        server = servers.list.filter((server) => server.id == serverid)

    }



    useEffect(() => {
        dispatch(() => get_servers(user.id))


    }, [dispatch])

    useEffect(()=>{
        let newerror= []
        if (name!=server[0].name) newerror.push("You didn't enter the server name correctly")
        if (server[0].adminId!==user.id)newerror.push("You do not have permission to delete the server")
        setError(newerror)
    }, [name])


    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation()
        await dispatch(delete_server(serverid)).then(()=>dispatch(get_servers(user.id))).then(()=>dispatch(unload_channels()))
        history.push('/channels')
        closeModal()

    };

    if (!servers && !servers.list&& servers.list.length>0) return(<div>loading</div>)
    else{
    return (
        <div className="deletecontainer">
            <div className="deleteserverheader"><h2>Delete '{!!servers && !!servers.list&& servers.list.length>0 && server.length>0 && server[0].name}'</h2></div>
            <div className="deletewarningcont"><div className="warningtext">Are you sure you want to delete <strong>{!!servers && !!servers.list&& servers.list.length>0 && server.length>0 && server[0].name}</strong>? This action cannot be undone.</div></div>
            <form
            className="warningform"

            >
                <label className="inputboxlabel">ENTER SERVER NAME</label>
                <br>
                </br>

                <input className="typeserver" type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                <br></br>
                <div className="deleteservercont"><button id="delete-server" onClick={(e=>handleSubmit(e))} type="submit" disabled={error.length>0} >Delete Server</button></div>
                <div className="deleteerror">{error.length > 0 && error.map(error=>(
                    <div>{error}</div>
                ))}</div>


            </form>

        </div>


    );
                }

};

export default DeleteServerForm
