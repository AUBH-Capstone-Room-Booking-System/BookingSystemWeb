import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';

function LoginPage(props) {
    const emailRef=useRef();
    const passwordRef=useRef();
    const [show, setShow] =useState(false)
    const handleClick = () => setShow(!show)
    return (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",height:"100%",justifyContent:"space-around",width:"80%"}}>
            <img src={"https://picsum.photos/500/300"}>
            </img>
              <Input placeholder='Email...' size='md' />
              <div style={{width:"100%",display:"flex",flexDirection:"column"}}>
              <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder="Password..."
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
<div style={{alignSelf:"end",cursor:"pointer"}}>
<u>Forgot Password</u>
</div>
              </div>
              
<Button colorScheme='teal' size='md' width={"100%"} bgColor={"var(--main-color)"} _hover={{background:"var(--hover-color)"}}>
    Login
  </Button>
        </div>
    );
}

export default LoginPage;