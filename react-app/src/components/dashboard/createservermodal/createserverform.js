import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_server } from "../../../store/servers";
import './createserver.css'



const CreateServerForm = ({closeModal}) => {
    const dispatch = useDispatch()
    const user= useSelector(state => state.session.user)
    const [name, setName] = useState([])
    const [error, setError] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(create_server(user.id, name))
        closeModal()

    };


        useEffect(()=>{
            let newerror = []
            if (name.length < 1){
                newerror.push("Name must be one or more characters")
            }

            if (name.length > 24){
                newerror.push("Name must be less than 25 characters")
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
                <br></br>


                <div className="createserverbut"> <button id="submitcreate" onClick={(e)=>handleSubmit(e)}type="submit" disabled={error.length> 0} >Create</button></div>
                <br></br>
                <div className="deleteerror">{error.length > 0 && error.map(error=>(
                    <div>{error}</div>
                ))}</div>
                <br></br>

            </form>

        </div>


    );

};

export default CreateServerForm
