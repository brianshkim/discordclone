import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_server } from "../../../store/servers";



const CreateServerForm = () => {
    const dispatch = useDispatch()
    const
    const watchlists = useSelector(state => state.session.user)


    const handleSubmit = async (e) => {
        e.preventDefault();

        closeModal()
    };





    return (
        <div>
            <div className="addtolisttitle">Add to Your List</div>
            <form
                onSubmit={handleSubmit}
            >














                <button id="submitadd" type="submit" >Update lists</button>
            </form>

        </div>


    );

};

export default AddToList
