import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getallusers } from "../../../store/allusers";
import { refreshuser } from "../../../store/session";
import { get_servers } from "../../../store/servers";
import LogoutButton from "../../auth/LogoutButton";
import {io} from "socket.io-client"
import './channelmodalmenu.css'
let socket

const ProfilePage = ({ closeModal }) => {
    const dispatch=useDispatch()
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const menuitems = { 1: "My Account", 2: "Profile" }
    const user = useSelector(state => state.session.user)
    const [avatarurl, setavatarurl] = useState(user.avatar)


    const [menuItem, setMenuItem] = useState(1)

    const closech = () => {
        closeModal()
    }

    useEffect(async()=>{
        handleSubmit()




    }, [image])

    const handleSubmit = async (e, imageset) => {
        socket = io()

        console.log(image)


        const formData = new FormData();
        formData.append("image", image);

        setImageLoading(true);

        const res = await fetch(`/api/users/${user.id}/upload`, {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            let data = await res.json();
            console.log(data)

            setImageLoading(false);
            await dispatch(refreshuser(user.id)).then((setavatarurl(data.url))).then(()=>dispatch(getallusers()).then(()=>dispatch(get_servers(user.id))))



        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }







    }

    const updateImage = (e) => {
        const file = e.target.files[0];


        setImage(file);
        console.log(image)



    }

    let useremail = user.email
    let withoutat = useremail.split('@')
    let str = ''

    for (let i = 0; i < withoutat[0].length; i++) {
        str += "*"
    }

    str += "@" + withoutat[1]







    const revealemail = () => {
        let email = document.getElementById("useremail")
        let reveal = document.getElementsByClassName("revealemail")[0]
        if (reveal.innerText === "Reveal") {
            reveal.innerText = "Hide"
        }
        else {
            reveal.innerText = "Reveal"
        }
        let emailhtml = email.innerText
        console.log(emailhtml)
        if (emailhtml === user.email) {
            let withoutat = emailhtml.split('@')
            let str = ''

            for (let i = 0; i < withoutat[0].length; i++) {
                str += "*"
            }

            str += withoutat[1]
            email.innerText = str
        }
        else {
            email.innerText = user.email
        }

    }


    return (
        <div className="channelMenuCont">
            <div className="profmenulist">
                <div className="chmenucont">
                    <div className="chmenutitle">USER SETTINGS</div>

                    <div className="chmenuitems" onClick={() => setMenuItem(Object.keys(menuitems)[0])}>My Account</div>

                    <div className="chmenudivider"></div>
                    <LogoutButton />




                </div>

            </div>
            <div className="ProfilePageCont">
                {menuItem == 1 &&
                    <>
                        <div className="ProfilePageTitle">My Account</div>


                        <div className="ProfileCard">
                            <div className="ProfileCardInner">
                                <div className="profilebanner"></div>

                                <div className="profilenamediv">
                                    <div className="profavatarbackground"><img className="profavatar" src={avatarurl}></img></div>
                                    <span className="profuser">{user.username}</span>
                                    <form id="avatarsubmit"><div className="file-input"><input id="file" type="file" accept="image/*" onChange={(e)=>updateImage(e)} /> <label htmlFor="file" className="profbutton">
                                        Edit User Avatar

                                    </label></div>
                                    </form>
                                </div>

                                <div className="UserInfo">
                                    <div className="Profusername"><div className="profusertitl">USERNAME</div><div className="profuserval">{user.username}</div></div>
                                    <div className="Profemail"><div className="profemailtitl">EMAIL</div><div className="profemailval"><span id="useremail">{str}</span><span className="revealemail" onClick={revealemail}>Reveal</span> </div></div>

                                </div>
                            </div>

                        </div>
                        <div className="profileseparator"></div>



                    </>
                }

            </div>
            <div className="profmenuescape">
                <div className="chescbutton">
                    <div className="escbuttonborder" onClick={closech}><i class="fa-solid fa-xmark fa-lg"></i></div>
                    <div className="esctext">ESC</div>
                </div>
            </div>



        </div>
    )

}


export default ProfilePage
