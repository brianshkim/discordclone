import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { get_servers, delete_server } from "../../../store/servers";
import { unload_channels } from "../../../store/channels";
import { load_servers } from "../../../store/allservers";

import "./leaveserver.css"



const LeaveServerForm = ({closeModal, serverid}) => {
    const history = useHistory()
    const [name,setName] = useState("")
    const [error, setError] = useState([])
    const dispatch = useDispatch()
    const user= useSelector(state => state.session.user)
    let servers = (useSelector(state=>state.servers))
    console.log(serverid)
    let server = [];
    if (servers && servers.list&& servers.list.length>0) {
        server = servers.list.filter((server) => server.id == serverid)

    }
    const handleleave = async (e) => {
        e.preventDefault();
        closeModal()

        await fetch(`/api/users/${user.id}/servers/leave`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(serverid)
        }).then(() => dispatch(get_servers(user.id))).then(() => dispatch(load_servers())).then(()=>dispatch(unload_channels()))


    };

    const handlecancel = () => {
        closeModal()
    }



    useEffect(() => {
        dispatch(() => get_servers(user.id))


    }, [dispatch])


    return (
        <div className="serverleavecontainer">
            <h2 className= "serverleavetitle">Leave '{!!servers && servers.list.length>0 && server.length >0 && server[0].name}'</h2>
            <div className="serverleavepara">Are you sure you want to leave '{!!servers && servers.list.length>0 && server.length >0 && server[0].name}' You won't be able to rejoin this server unless you join it again from the join servers menu</div>
            <div className="leavebuttons">
            <button id="cancel-button" onClick={handlecancel}>Cancel</button>
            <button className="leaveservers" onClick={handleleave} >Leave Server</button>
            </div>
        </div>

    );

};

export default LeaveServerForm
