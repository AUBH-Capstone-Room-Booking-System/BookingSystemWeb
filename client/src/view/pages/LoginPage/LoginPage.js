import { Button, Input, InputGroup, InputRightElement, useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../features/Auth';

function LoginPage(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const navigate = useNavigate()
  const toast=useToast()
  const dispatch=useDispatch()
  const handleLogin = () => {
    axios.post(`${process.env.REACT_APP_HOSTURL}/user/login`, {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }).then((res) => {
      if (res.data.user) {
        dispatch(login(res.data.user))
        localStorage.setItem('myId',res.data.user.id);
        localStorage.setItem('firstName',res.data.user.firstName);

        localStorage.setItem('lastName',res.data.user.lastName);

        localStorage.setItem('email',res.data.user.email);

        localStorage.setItem('phoneNumber',res.data.user.phoneNumber);

        navigate("/")
        return ;
      } 
        toast({
          title: 'Wrong email or password',
          status: 'error',
          duration: 9000,
          isClosable: true,
      })
      
        
      
    }).catch((e) => {
    })
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "space-around", width: "80%" }}>
      <img src={"https://picsum.photos/500/300"}>
      </img>
      <Input placeholder='Email...' size='md' ref={emailRef} />
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <InputGroup size='md'>
          <Input
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder="Password..."
            ref={passwordRef}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <div style={{ alignSelf: "end", cursor: "pointer" }}>
          <u>Forgot Password</u>
        </div>
      </div>

      <Button colorScheme='teal' onClick={handleLogin} size='md' width={"100%"} bgColor={"var(--main-color)"} _hover={{ background: "var(--hover-color)" }}>
        Login
      </Button>
    </div>
  );
}

export default LoginPage;