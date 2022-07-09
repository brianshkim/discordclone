import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delete_server } from "../../../store/servers";



const CreateServerForm = ({closeModal, serverid}) => {
    const dispatch = useDispatch()
    const user= useSelector(state => state.session.user)
    const [name, setName] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(create_server(serverid))
        closeModal()

    };


    return (
        <div className="servercreatecontainer">
            <form
                onSubmit={handleSubmit}
            >
                <label>Delete Server</label>
                <input
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}>
                </input>

                <button id="submitcreate" type="submit" >Delete</button>
            </form>

        </div>


    );

};

export default CreateServerForm
