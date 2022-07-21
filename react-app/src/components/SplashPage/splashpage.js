import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'
import {usedemo} from '../../store/session'
import {get_servers} from '../../store/servers'
import './splashpage.css'
import DiscordLogoWhite from './DiscordLogoWhite.png'
import {io} from "socket.io-client"
let socket;
const SplashPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [userId, setUserId]=useState(null)
    const [serverId, setServerId] = useState(null)
    let user = useSelector(state=>state.session.user)



    const loginonclick = () =>{
        history.push('/login')

    }

    const demouser = async () =>{
        socket=io();

       await dispatch(usedemo())
       socket.on("connect")



        history.push('/channels')



    }

    useEffect(() => {
        if(user) {
            dispatch(get_servers(user.id))
            setUserId(user.id)
        }


    }, [user])


    return (
        <div className="splashContainer">
            <div className="firstsection">
                <div className="navBar">
                    <nav className="navigation">
                        <a className="logoanchor"><img src={DiscordLogoWhite} height="40" width="50"></img></a>
                        <div className="navbarlinks">
                            <a href="https://discord.com">Download the Real Discord</a>
                            <a href="https://github.com/brianshkim/discordclone">Github</a>
                            <a href="https://www.linkedin.com/in/brian-kim-2217ba125/">Linkedin</a>

                        </div>
                        <div className="loginbutton"><button onClick={loginonclick} className="loginclick">Login</button></div>
                    </nav>
                </div>
                <div className="secondhalf">
                    <div className="secondhalf-first">
                        IMAGINE A PLACE...
                    </div>

                    <br>
                    </br>
                    <div className="secondhalf-second">...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.

                    </div>
                    <br>
                    </br>
                    <div className="secondhalf-third">

                    <span><button className="openin" onClick={demouser} >Demo User</button></span>
                    {/*!!user &&  <span><a href="/channels"><button className="openin" >Go to Home</button></a></span>*/}

                    </div>
                </div>

            </div>














        </div>
    )

}

export default SplashPage
