import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import './channelmodalmenu.css'

const ProfilePage = ({ closeModal }) => {
    const menuitems = { 1: "My Account", 2: "Profile" }
    const user = useSelector(state => state.session.user)

    const [menuItem, setMenuItem] = useState(1)

    const closech = () => {
        closeModal()
    }

    let useremail = user.email
    let withoutat = useremail.split('@')
    let str = ''

    for (let i = 0; i < withoutat[0].length; i++) {
        str += "*"
    }

    str += "@"+withoutat[1]







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
                <div className="chmenuitems" onClick={() => setMenuItem(Object.keys(menuitems)[1])}>Profile</div>
                <div className="chmenudivider"></div>



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
                                <div className="profavatarbackground"><div className="profavatar"></div></div>
                                <span className="profuser">{user.username}</span>
                                <span className="gotoprofilebutton"><button className="profbutton">Edit User Profile</button></span>
                            </div>

                            <div className="UserInfo">
                                <div className="Profusername"><div className="profusertitl">USERNAME</div><div className="profuserval">{user.username}</div></div>
                                <div className="Profemail"><div className="profemailtitl">EMAIL</div><div className="profemailval"><span id="useremail">{str}</span><span className="revealemail" onClick={revealemail}>Reveal</span> </div></div>

                            </div>
                        </div>

                    </div>
                    <div>
                        <div>Password and authentication</div>
                        <button>Change Password</button>
                    </div>
                    <div>
                        <div>Account Removal</div>
                        <div>Delete Account</div>
                    </div>

                </>
            }
            {menuItem == 2 &&
                <>
                    <div className="Profiles">Profiles</div>
                    <div className="ProfileCard">
                        <div className="changeavatar">
                            <div className="profileavatar">Avatar</div>
                            <button className="submitavatar"></button>
                        </div>


                    </div>


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
