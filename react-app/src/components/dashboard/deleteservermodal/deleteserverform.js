import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_servers, delete_server } from "../../../store/servers";



const DeleteServerForm = ({closeModal, serverid}) => {
    const dispatch = useDispatch()
    const user= useSelector(state => state.session.user)
    console.log(serverid)


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hello")
        e.stopPropagation()
        await dispatch(delete_server(serverid)).then(()=>dispatch(get_servers(user.id)))
        closeModal()

    };


    return (
        <div className="deletecontainer">
            <form

            >
                <label>Delete Server</label>

                <button id="delete-server" onClick={(e=>handleSubmit(e))} type="submit" >Delete</button>
            </form>

        </div>


    );

};

export default DeleteServerForm
