import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_channel, get_channels } from "../../../store/channels";
import { get_servers } from "../../../store/servers";
import { useHistory } from 'react-router-dom'
import './createchannel.css'


const CreateChannelForm = ({ serverid, closeModal }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [voices, setVoices] = useState("text")
    const [name, setName] = useState("")
    const [error, setError] = useState([])
    const server = useSelector(state => state.servers.list).filter(server => server.id == serverid)
    const channels = useSelector(state => state.channels)


    const handleSubmit = async (e) => {
        e.preventDefault();

        closeModal()
        document.getElementById("submitcreatechannel").disabled = true

        await dispatch(create_channel(user.id, serverid, name, voices)).then(() => (dispatch(get_channels(serverid)))).then(() => dispatch(get_servers(user.id))).then(() => (dispatch(get_channels(serverid))))
        history.push(`/channels/${serverid}/${channels.list[channels.list.length - 1].id}`)
            ;


    };

    useEffect(() => {
        let newerror = []
        if (name.length < 1) {
            newerror.push("Name must be one or more characters")
        }

        if (name.length > 25) {
            newerror.push("Name must be less than 25 characters")
        }
        if (server[0].adminId != user.id) {
            newerror.push("You do not have permission to create a channel")
        }
        setError(newerror)
    }, [user.id, name, voices])




    function radioclick() {


        setVoices("voice")
        console.log(voices)
        console.log("VOICE===========================================================")
        console.log(document.getElementById('voiceradio').checked)
        console.log(document.getElementById("textradio").checked)

    }

    function radioclicktext() {

        setVoices("text")
        console.log(voices)
        console.log("TEXT===========================================================")
        console.log(document.getElementById("textradio").checked)
        console.log(document.getElementById('voiceradio').checked)

    }



    return (
        <div className="channelcreatecontainer">
            <form

            >
                <div className="createchannelheader"><h2 className="createchanneltitle">Create a Channel</h2></div>
                <div className="createvoice">
                    <div className="voiceicon"><i class="fa-solid fa-volume-high fa-lg"></i></div>
                    <div className="voicetext"><div className="voicetitle">Voice</div><div className="voicepara">Hang out together with voice, video, and screen share</div></div>
                    <input
                        type="radio"
                        name="voice"
                        id="voiceradio"
                        onClick={(()=>setVoices("voice"))}
                        value="voice"
                        checked={voices== "voice" ? true : false}

                    />
                </div>
                <div className="createvoice">
                    <div className="voiceicon"><i className="fa-solid fa-hashtag fa-lg"></i></div>
                    <div className="voicetext"><div className="voicetitle">Text</div><div className="voicepara">Send messages, images, GIFs, emoji, opinions, and puns</div></div>



                    <input

                        type="radio"
                        name="text"
                        id="textradio"
                        onClick={(()=>setVoices("text"))}
                        value="text"
                        checked={voices == "text" ? true : false}
                    />
                </div>

                <div className="createchannelinputtitle"><h5 className="createinputtitle">CHANNEL NAME</h5></div>
                <input
                    className="createchannelinput"
                    type="text"
                    value={name}
                    placeholder="new-channel"
                    onChange={(e) => setName(e.target.value)}>
                </input>
                <br></br>
                <br></br>
                <br></br>

                <div className="createchannelbutton"><button id="submitcreatechannel" onClick={(e) => { handleSubmit(e) }} disabled={error.length > 0} type="submit" >Create Channel</button></div>
                <div className="createdeleteerror">{error.length > 0 && error.map(error => (
                    <div className="errorlist">{error}</div>
                ))}</div>
            </form>

        </div>


    );

};

export default CreateChannelForm
