import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_servers, update_server } from "../../../store/servers";
import './editserver.css'

const EditServerForm = ({ closeModal, serverid }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const server = useSelector(state => state.servers.list).filter((server) => server.id == serverid)

    const [name, setName] = useState(`${server[0].name}`)


    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(update_server(serverid, name)).then(() => dispatch(get_servers(user.id)))

        closeModal()

    };



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
                    <div className="editbuttoncont"><button id="submiteditserver" onClick={(e) => { handleSubmit(e) }} type="submit" >Edit Server</button></div>
                </div>


            </form>


        </div>


    );

};

export default EditServerForm
