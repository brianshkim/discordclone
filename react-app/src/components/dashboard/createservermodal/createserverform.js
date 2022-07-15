import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom"
import { create_server, get_servers } from "../../../store/servers";
import { update_channel, get_channels } from "../../../store/channels"
import './createserver.css'



const CreateServerForm = ({closeModal}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user= useSelector(state => state.session.user)
    const [name, setName] = useState([])
    const [error, setError] = useState("")
    const servers = useSelector(state=>state.servers.list)
    console.log(servers)


    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(create_server(user.id, name)).then(()=>dispatch(get_servers(user.id))).then(()=>(dispatch(get_channels(servers[servers.length-1].id))))
        console.log(servers)
        history.push(`/channels/${servers[servers.length-1].id}`)
        closeModal()

    };


        useEffect(()=>{
            let newerror = []
            if (name.length < 1){
                newerror.push("Name must be one or more characters")
            }

            if (name.length > 23){
                newerror.push("Name must be less than 23 characters")
            }

           setError(newerror)
        }, [user.id, name])



    return (
        <div className="servercreatecontainer">
            <div className="servercreateheader">Customize your server</div>

            <form

            >
                <h4 className="serverformcreate">Server Name</h4>
                <input
                className="createserverinput"
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}>
                </input>
                <br></br>
                <div className="deleteerror">{error.length > 0 && error.map(error=>(
                    <div key={error}>{error}</div>
                ))}</div>
                <br></br>
                <div className="createserverbut"> <button id="submitcreate" onClick={(e)=>handleSubmit(e)}type="submit" disabled={error.length> 0} >Create</button></div>
                <br></br>

                <br></br>

            </form>

        </div>


    );

};

export default CreateServerForm
