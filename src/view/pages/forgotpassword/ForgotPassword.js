import { Button, Input, InputGroup, InputRightElement, useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ForgotPassword(props) {
  const handleClick = () => setShow(!show)

  const [show, setShow] = useState(false)
  const [email, setEmail] = useState();

  const toast = useToast()
  const navigate = useNavigate()
  const handleChangePassword = () => {
    var emailCode = email.split("@")[0]
    axios.post(`${process.env.REACT_APP_HOSTURL}/user/findbyemail`,{
      email:email
    }).then((res) => {
      var user = res.data.user;
      axios.post(`${process.env.REACT_APP_HOSTURL}/notification/add`, {
        content: `${user.firstName} ${user.lastName} (${emailCode}) wants to reset their password`
      }).then((res) => {
        toast({
          title: "Notification sent to the admin!",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        navigate("/login")
      }).catch((e) => {

      })
    }).catch((e) => {
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
      <Input placeholder='Email...' size='md' value={email} onChange={(e) => {
        setEmail(e.target.value)
      }} />


      <Button colorScheme='teal' onClick={handleChangePassword} size='md' width={"100%"} bgColor={"var(--main-color)"} _hover={{ background: "var(--hover-color)" }}>
        Reset password
      </Button>
    </div>
  );
}

export default ForgotPassword;