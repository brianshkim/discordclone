import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './splashpage.css'

const SplashPage = () => {


    return (
        <div className="splashContainer">
            <div className="firstsection">
                <div className="navBar">
                    <nav className="navigation">
                        <a className="logoanchor"></a>
                        <div className="navbarlinks">
                            <a className href="/">Download</a>
                            <a href="/">Nitro</a>
                            <a href="/">Safety</a>
                            <a href="/">Support</a>
                            <a href="/">Blog</a>
                            <a href="/">Careers</a>

                        </div>
                        <div className="loginbutton"><button className="loginclick">Login</button></div>
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
                        <span><button className="downloadfor">Download for Windows</button></span>

                        <span><button className="openin" >Open Ioniq in your Browser</button></span>

                    </div>
                </div>

            </div>














        </div>
    )

}

export default SplashPage
