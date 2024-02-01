import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from 'axios';
import "./Notifications.css"
function Notifications(props) {
    const [notifications, setNotifications] = useState()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_HOSTURL}/notification`).then((res) => {
            setNotifications(res.data.notifications)
        })
    }, [])
    return (
        <div style={{ display: "flex", width: "100%", height: "100%" }}>
            <Sidebar />
            <div style={{ width: "85%", height: "100%", display: "flex", alignItems: "center", flexDirection: "column" }}>
                <h1 className='mybooking-title'>Notifications</h1>
                <div style={{display:"flex",flexDirection:"column-reverse"}}>
                    {notifications ? notifications.length===0?<span>No notifications</span>: notifications.map((e) => {
                        return (<div className='notification-block'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="43" height="41" viewBox="0 0 43 41" fill="none">
  <path d="M26.8751 29.0417H35.8334L33.3162 26.6416C32.6336 25.9907 32.2501 25.1079 32.2501 24.1874V18.7917C32.2501 14.3288 29.2587 10.532 25.0834 9.12492V8.54167C25.0834 6.65469 23.4791 5.125 21.5001 5.125C19.5211 5.125 17.9167 6.65469 17.9167 8.54167V9.12492C13.7415 10.532 10.7501 14.3288 10.7501 18.7917V24.1874C10.7501 25.1079 10.3666 25.9907 9.68392 26.6416L7.16675 29.0417H16.1251M26.8751 29.0417V30.75C26.8751 33.5805 24.4686 35.875 21.5001 35.875C18.5316 35.875 16.1251 33.5805 16.1251 30.75V29.0417M26.8751 29.0417H16.1251" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                           <span className='notif-content'>
                           {e.content}
                           </span>
                        </div>)
                    }):<p>Loading</p>}
                </div>
            </div>
        </div>
    );
}

export default Notifications;