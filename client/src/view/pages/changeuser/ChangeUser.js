import { Button, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';

function ChangeUser(props) {
    const params = useParams();

    const userId = params.id;

    const [user, setUser] = useState({});

    const toast = useToast()
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_HOSTURL}/user/admin/findone/${userId}`).then((res) => {
            setUser(res.data.user)
        })
    }, [])

    const handleSave = () => {
        const reqData={
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            password:user.password,
            major:user.major,
            userType:user.userType
        }
        console.log(reqData)
        console.log(userId)
        axios.post(`${process.env.REACT_APP_HOSTURL}/user/admin/edit/${userId}`, reqData).then((res) => {
            toast({
                title: 'Updated Profile!',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            navigate("/manageusers")

        }).catch((e) => {
        })
    }

    const handleDelete=()=>{
        axios.delete(`${process.env.REACT_APP_HOSTURL}/user/admin/delete/${userId}`).then((res) => {
            toast({
                title: 'Deleted Profile!',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            navigate("/manageusers")

        }).catch((e) => {
        })
    }


    return (
        <div style={{ display: "flex", width: "100%", height: "100%" }}>
            <Sidebar />
            <div style={{ width: "85%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-around", flexDirection: "column" }}>
                <h1 className='title'>Account Details</h1>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "start", width: "80%" }}>
                    First Name
                    <Input placeholder='First Name...' size='md' value={user.firstName} onChange={(e) => {
                        setUser({ ...user, firstName: e.target.value })
                    }} />

                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "start", width: "80%" }}>
                    Last Name
                    <Input placeholder='Last Name...' size='md' value={user.lastName} onChange={(e) => {
                        setUser({ ...user, lastName: e.target.value })

                    }} />

                </div><div style={{ display: "flex", flexDirection: "column", alignItems: "start", width: "80%" }}>
                    Email
                    <Input placeholder='Email...' size='md' value={user.email} onChange={(e) => {
                        setUser({ ...user, email: e.target.value })
                    }} />

                </div><div style={{ display: "flex", flexDirection: "column", alignItems: "start", width: "80%" }}>
                    Phone Number (optional)
                    <Input placeholder='phone number...' size='md' value={user.phoneNumber} onChange={(e) => {
                        setUser({ ...user, phoneNumber: e.target.value })
                    }} />

                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "start", width: "80%" }}>
                    Major
                    <Input placeholder='Major...' size='md' value={user.major} onChange={(e) => {
                        setUser({ ...user, major: e.target.value })
                    }} />

                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "start", width: "80%" }}>
                    Password
                    <Input placeholder='Password...' type='password' size='md' value={user.password} onChange={(e) => {
                        setUser({ ...user, password: e.target.value })
                    }} />

                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "start", width: "80%" }}>
                    User Type
                    <select id="dropdown" value={user.userType} onChange={(e)=>{
                                                setUser({ ...user, userType: e.target.value })

                    }} name="dropdown" style={{display:"flex",width:"100%"}}>
    <option value="Client">Client</option>
    <option value="Admin">Admin</option>
  </select>

                </div>
                <div style={{ display: "flex" }}>
                    
                    <Button colorScheme='teal' onClick={handleDelete} size='md' marginRight={"30px"} bgColor={"var(--main-color)"} _hover={{ background: "var(--hover-color)" }}>
                        Delete User
                    </Button>
                    <Button colorScheme='teal' onClick={handleSave} size='md' marginRight={"30px"} bgColor={"var(--main-color)"} _hover={{ background: "var(--hover-color)" }}>
                        Save Edits
                    </Button>
                </div>


            </div>
        </div>
    );
}


export default ChangeUser;