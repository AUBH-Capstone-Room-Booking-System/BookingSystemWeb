import React, { useEffect, useState } from 'react';
import "./ManageUsers.css"
import Sidebar from '../../components/sidebar/Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
function ManageUsers(props) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_HOSTURL}/user/admin/findall`).then((res) => {
            setUsers(res.data.users)
        })
    }, [])

    const navigate=useNavigate()


    return (
        <div style={{ display: "flex", width: "100%", height: "100%" }}>
            <Sidebar />

            <div style={{ width: "85%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h1 className='mybooking-title'>Users</h1>
                <div>
                    {
                        users.map((e) => {
                            return (<div className='user-container'>
                                <div style={{ display: "flex", flexDirection: "column" }}>

                                    <span><b>{e.firstName} {e.lastName}</b> - {e.userType}</span>
                                    <span>{e.email}</span>
                                </div>
                                <svg style={{ cursor: "pointer" }} onClick={()=>{
                                    navigate(`/manageusers/${e.id}`)
                                }} xmlns="http://www.w3.org/2000/svg" width="7" height="28" viewBox="0 0 7 28" fill="none">
                                    <path d="M1.875 24.5C1.875 25.4665 2.60254 26.25 3.5 26.25C4.39746 26.25 5.125 25.4665 5.125 24.5C5.125 23.5335 4.39746 22.75 3.5 22.75C2.60254 22.75 1.875 23.5335 1.875 24.5Z" stroke="var(--main-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M1.875 14C1.875 14.9665 2.60254 15.75 3.5 15.75C4.39746 15.75 5.125 14.9665 5.125 14C5.125 13.0335 4.39746 12.25 3.5 12.25C2.60254 12.25 1.875 13.0335 1.875 14Z" stroke="var(--main-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M1.875 3.5C1.875 4.4665 2.60254 5.25 3.5 5.25C4.39746 5.25 5.125 4.4665 5.125 3.5C5.125 2.5335 4.39746 1.75 3.5 1.75C2.60254 1.75 1.875 2.5335 1.875 3.5Z" stroke="var(--main-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                            </div>)
                        })
                    }
                </div>

                <div style={{ display: "flex" }}>
                    <Button colorScheme='teal' onClick={()=>{
                        navigate("/manageusers/add")
                    }} size='md' marginRight={"30px"} bgColor={"var(--main-color)"} _hover={{ background: "var(--hover-color)" }}>
                        Add user
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ManageUsers;