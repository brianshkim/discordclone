import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_servers } from "../../../store/servers";



const JoinServerForm = ({ closeModal, serverid }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const servers = useSelector(state => state.allservers.list).filter(Server => Server.adminId !== user.id)




const handlejoin = async (e, serverid) => {
    e.preventDefault();
    closeModal()
    await fetch(`/api/users/${user.id}/servers/join`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(serverid)
    }).then(() => dispatch(get_servers(user.id)))


};



return (
    <div className="servercreatecontainer">
        <ul>
            {servers && servers.length > 0 &&

                servers.map(server =>
                    <li>{server.name}
                        <button onClick={(e) => handlejoin(e, server.id)}>Join</button></li>

                )}
        </ul>




    </div>

);

};

export default JoinServerForm
