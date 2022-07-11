import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_server } from "../../../store/servers";



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
            <form

            >
                <label>Create a Server</label>
                <input
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}>
                </input>

                <button id="submitcreate" onClick={(e)=>handleSubmit(e)}type="submit" >Create</button>
            </form>

        </div>


    );

};

export default CreateServerForm
