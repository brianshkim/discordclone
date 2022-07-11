import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_server } from "../../../store/servers";
import './createserver.css'



const CreateServerForm = ({closeModal}) => {
    const dispatch = useDispatch()
    const user= useSelector(state => state.session.user)
    const [name, setName] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(create_server(user.id, name))
        closeModal()

    };





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
                <br></br>

                <div className="createserverbut"> <button id="submitcreate" onClick={(e)=>handleSubmit(e)}type="submit" >Create</button></div>
            </form>

        </div>


    );

};

export default CreateServerForm
