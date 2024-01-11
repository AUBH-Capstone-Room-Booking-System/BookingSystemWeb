import { Button, Input, InputGroup, InputRightElement, useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ForgotPassword(props) {
    const handleClick = () => setShow(!show)

    const [show, setShow] = useState(false)
const [email,setEmail]=useState();
const [firstPassword,setFirstPassword]=useState();
const [secondPassword,setSecondPassword]=useState();
const toast=useToast()
const navigate=useNavigate()
    const handleChangePassword=()=>{
        if(secondPassword!==firstPassword){
            toast({
                title: 'Passwords need to match',
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
            return;
        }

        axios.post(`${process.env.REACT_APP_HOSTURL}/user/reset`,{
            email:email,
            password:firstPassword
        }).then((res)=>{
                toast({
                    title: "Password has been reset",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            navigate("/login")
        }).catch((e)=>{
            toast({
                title: "Email doesn't exist",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        })
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "space-around", width: "80%" }}>
      <img src={"https://picsum.photos/500/300"}>
      </img>
      <Input placeholder='Email...' size='md' value={email} onChange={(e)=>{
        setEmail(e.target.value)
      }}/>
      <Input
            pr='4.5rem'
            type={'password'}
            value={firstPassword}
            onChange={(e)=>{
                setFirstPassword(e.target.value)
              }}
            placeholder="New Password..."
          />
        <Input
            pr='4.5rem'
            type={'password'}
            value={secondPassword}
            onChange={(e)=>{
                setSecondPassword(e.target.value)
              }}
            placeholder="Repeat Password..."
          />
        

      <Button colorScheme='teal' onClick={handleChangePassword}  size='md' width={"100%"} bgColor={"var(--main-color)"} _hover={{ background: "var(--hover-color)" }}>
        Reset password
      </Button>
    </div>
    );
}

export default ForgotPassword;