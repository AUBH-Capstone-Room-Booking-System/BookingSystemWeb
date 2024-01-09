import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../components/sidebar/Sidebar';
import { Button, Input, useToast } from '@chakra-ui/react';
import "./MyAccount.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function MyAccount(props) {

    const myId =localStorage.getItem('myId')

    const [firstName, setFirstName] = useState(localStorage.getItem('firstName'));
    const [lastName, setLastName] = useState(localStorage.getItem('lastName'));
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem('phoneNumber'));
const toast=useToast()
const navigate=useNavigate()
    const handleSave = () => {
        axios.post(`${process.env.REACT_APP_HOSTURL}/user/edit/${myId}`,{
            firstName:firstName,
            lastName:lastName,
            email:email,
            phoneNumber:phoneNumber
        }).then((res)=>{
        localStorage.setItem('firstName',firstName);
        localStorage.setItem('lastName',lastName);
        localStorage.setItem('email',email);
        localStorage.setItem('phoneNumber',phoneNumber);
            toast({
                title: 'Updated Profile!',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            navigate("/")

        }).catch((e)=>{
            console.log(e);
        })
    }
    const handleLogout = () => {
        localStorage.clear()
        navigate("/login")
    }

    return (
        <div style={{ display: "flex", width: "100%", height: "100%" }}>
            <Sidebar />
            <div style={{ width: "85%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-around", flexDirection: "column" }}>
                <h1 className='title'>Account Details</h1>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "start", width: "80%" }}>
                    First Name
                    <Input placeholder='First Name...' size='md' value={firstName} onChange={(e) => {
                        setFirstName(e.target.value)
                    }} />

                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "start", width: "80%" }}>
                    Last Name
                    <Input placeholder='Last Name...' size='md' value={lastName} onChange={(e) => {
                        setLastName(e.target.value)
                    }} />

                </div><div style={{ display: "flex", flexDirection: "column", alignItems: "start", width: "80%" }}>
                    Email
                    <Input placeholder='First Name...' size='md' value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} />

                </div><div style={{ display: "flex", flexDirection: "column", alignItems: "start", width: "80%" }}>
                    Phone Number (optional)
                    <Input placeholder='First Name...' size='md' value={phoneNumber} onChange={(e) => {
                        setPhoneNumber(e.target.value)
                    }} />

                </div>
                <div style={{ display: "flex" }}>
                    <Button colorScheme='teal' onClick={handleSave} size='md' marginRight={"30px"} bgColor={"var(--main-color)"} _hover={{ background: "var(--hover-color)" }}>
                        Save Edits
                    </Button>
                    <Button colorScheme='teal' onClick={handleLogout} size='md' marginBottom={"30px"} bgColor={"var(--main-color)"} _hover={{ background: "var(--hover-color)" }}>
                        Logout
                    </Button>
                </div>


            </div>
        </div>
    );
}

export default MyAccount;