import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_channel } from "../../../store/channels";

const CreateChannelForm = ({serverid, closeModal}) => {
    const dispatch = useDispatch()
    const user= useSelector(state => state.session.user)
    const [name, setName] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hello")

        dispatch(create_channel(user.id,serverid,name))
        closeModal()

    };

    return (
        <div className="channelcreatecontainer">
            <form
                onSubmit={handleSubmit}
            >
                <label>Create a Channel</label>
                <input
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}>
                </input>

                <button id="submitcreatechannel" type="submit" >Create</button>
            </form>

        </div>


    );

};

export default CreateChannelForm
