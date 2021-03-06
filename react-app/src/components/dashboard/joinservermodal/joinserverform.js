import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { get_servers } from "../../../store/servers";
import { get_channels } from "../../../store/channels";
import { load_servers } from "../../../store/allservers";



const JoinServerForm = ({ closeModal, serverid }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    const servers = useSelector(state => state?.allservers?.list).filter(Server => Server.adminId !== user.id)
    const serversusers = useSelector(state=>state.allservers.userlist)
    useEffect(()=>{
        dispatch(load_servers())


    }, [])


    const handlejoin = async (e, serverid, serverchannels) => {
        e.preventDefault();
        closeModal()

        await fetch(`/api/users/${user.id}/servers/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(serverid)
        }).then(() => dispatch(get_servers(user.id))).then(() => dispatch(get_channels(serverid)).then(()=>dispatch(load_servers())))
       if (serverchannels.length > 0){
       history.push(`/channels/${serverid}/${serverchannels[0].id}`)
       }
       else{
        history.push(`/channels/${serverid}`)
       }

    };


    const handleleave = async (e, serverid, serverchannels) => {
        e.preventDefault();
        closeModal()

        await fetch(`/api/users/${user.id}/servers/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(serverid)
        }).then(() => dispatch(get_servers(user.id))).then(() => dispatch(get_channels(serverid)).then(()=>dispatch(load_servers())))
       if (serverchannels.length > 0){
       history.push(`/channels/${serverid}/${serverchannels[0].id}`)
       }
       else{
        history.push(`/channels/${serverid}`)
       }

    };



    return (
        <div className="serverjoincontainer">
            <div className="chooseserver">Choose Server</div>
            <ul className="allserverscontainer">
                {servers && servers.length > 0 &&

                    servers.map(server =>

                        <div key={`servers-${server.id}`} className="allserverscont">
                            <li className="allservers" key={server.id}>{server.name}
                            <div className="membersdiv">{server.users.length}{server.users.length>1?" members":" member"}  <i class="fa-solid fa-users"></i></div> </li>
                            <br></br>

                            {!!serversusers && !serversusers[server.id].includes(user.id) ?<button className="allservers-button" onClick={(e) => handlejoin(e, server.id, server.channels)}>Join Server</button>:
                            <div className="belong">You already belong to this server</div>}

                        </div>

                    )}
            </ul>




        </div>

    );

};

export default JoinServerForm
