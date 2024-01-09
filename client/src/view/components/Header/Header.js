import React from 'react';
import "./Header.css"
function Header(props) {
    return (
        <div style={{background: "rgba(60, 74, 47, 0.80)",width:"100%",height:"100px",margin:"0",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <h1 className='header-title'>AUBH Library Room Booking</h1>
        </div>
    );
}

export default Header;