import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_server } from "../../../store/servers";
import './createserver.css'



const CreateServerForm = ({closeModal}) => {
    const dispatch = useDispatch()
    const user= useSelector(state => state.session.user)
    const [name, setName] = useState("")
    const [error, setError] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(create_server(user.id, name))
        closeModal()

    };

    useEffect(()=>{
        let str = ""
        if (name.length < 1){
            str="Name should be one or more characters."
        }
        setError(str)


    }, [name])



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


                <div className="createserverbut"> <button id="submitcreate" onClick={(e)=>handleSubmit(e)}type="submit" disabled={name.length <= 0} >Create</button></div>
                <br></br>
                <div className="deleteerror">{error.length > 0 && error}</div>
                <br></br>

            </form>

        </div>


    );

};

export default CreateServerForm
