import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_servers, update_server } from "../../../store/servers";



const EditServerForm = ({closeModal, serverid}) => {
    const dispatch = useDispatch()
    const user= useSelector(state => state.session.user)
    const server = useSelector(state=>state.servers.list).filter((server)=>server.id == serverid)

    const [name, setName] = useState(`${server[0].name}`)


    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(update_server(serverid, name)).then(()=>dispatch(get_servers(user.id)))

        closeModal()

    };



    return (
        <div className="servercreatecontainer">
            <form
                onSubmit={handleSubmit}
            >
                <label>Edit Server</label>
                <input
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}>
                </input>

                <button id="submitcreate" type="submit" >Edit</button>
            </form>

        </div>


    );

};

export default EditServerForm
