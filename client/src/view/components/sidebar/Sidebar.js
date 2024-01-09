import React from 'react';
import "./Sidebar.css"
import { useNavigate } from 'react-router-dom';
function Sidebar(props) {
    const navigate=useNavigate()
    return (
        <div style={{ width: "15%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }} onClick={()=>{
                            navigate("/")
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="71" viewBox="0 0 75 71" fill="none" >
                                <path d="M9.375 26.625L37.5 5.91667L65.625 26.625V59.1667C65.625 60.7359 64.9665 62.2408 63.7944 63.3504C62.6223 64.46 61.0326 65.0833 59.375 65.0833H15.625C13.9674 65.0833 12.3777 64.46 11.2056 63.3504C10.0335 62.2408 9.375 60.7359 9.375 59.1667V26.625Z" stroke="#667080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M28.125 65.0833V35.5H46.875V65.0833" stroke="#667080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <h2 className='category-title'>
                                Home
                            </h2>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}  onClick={()=>{
                            navigate("/account")
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="61" height="69" viewBox="0 0 61 69" fill="none">
                                <path d="M50.8334 60.375V54.625C50.8334 51.575 49.7622 48.6499 47.8556 46.4933C45.949 44.3366 43.3631 43.125 40.6667 43.125H20.3334C17.637 43.125 15.0511 44.3366 13.1444 46.4933C11.2378 48.6499 10.1667 51.575 10.1667 54.625V60.375" stroke="#667080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M30.5 31.625C36.1149 31.625 40.6666 26.4763 40.6666 20.125C40.6666 13.7737 36.1149 8.625 30.5 8.625C24.8851 8.625 20.3333 13.7737 20.3333 20.125C20.3333 26.4763 24.8851 31.625 30.5 31.625Z" stroke="#667080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <h2 className='category-title'>
                                Account
                            </h2>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}  onClick={()=>{
                            navigate("/calendar")
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="73" viewBox="0 0 80 73" fill="none">
                                <path d="M63.3333 12.1667H16.6667C12.9848 12.1667 10 14.8903 10 18.25V60.8333C10 64.1931 12.9848 66.9167 16.6667 66.9167H63.3333C67.0152 66.9167 70 64.1931 70 60.8333V18.25C70 14.8903 67.0152 12.1667 63.3333 12.1667Z" stroke="#667080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M53.3333 6.08334V18.25" stroke="#667080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M26.6667 6.08334V18.25" stroke="#667080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10 30.4167H70" stroke="#667080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <h2 className='category-title'>
                                Calendar
                            </h2>
                        </div>

                    </div>
    );
}

export default Sidebar;