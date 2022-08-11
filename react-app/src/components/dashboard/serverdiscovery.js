import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { get_servers } from '../../store/servers';



import './dashboard.css'

import ServerNav from './ServerNav';


const ServerDiscovery =()=>{
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const servers = useSelector(state => state?.servers)


    useEffect(()=>{
        dispatch(get_servers(user.id))



    }, [])

    return(
        <div className="dashboardcontainer">
        <ServerNav />
        <div className="guilddiscovery">

        </div>
        </div>




    )

}

export default ServerDiscovery
