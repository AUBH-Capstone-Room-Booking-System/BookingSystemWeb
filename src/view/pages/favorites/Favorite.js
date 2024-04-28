import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from 'axios';
import "./Favorite.css"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,Button, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
function Favorite(props) {
    const userId=localStorage.getItem("myId")
    const [favorites,setFavorites]=useState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [roomReadings, setRoomReadings] = useState()
    const [selectedRoom,setSelectedRoom]=useState()
    const [isFavorite, setIsFavorite] = useState(false)
    const navigate=useNavigate()
    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_HOSTURL}/favorite/findall`,{
            userId:userId
        }).then((res)=>{
            setFavorites(res.data.favorites)
        })
    })

    const handleOnClick=(number)=>{
        setSelectedRoom(number)
        axios.post(`${process.env.REACT_APP_HOSTURL}/sensor/find`, {
            roomNumber: number 
        }).then((res) => {
            setRoomReadings(res.data.sensorData)

            axios.post(`${process.env.REACT_APP_HOSTURL}/favorite/findone`, {
                roomNumber: number ,
                userId: userId
            }).then((res) => {
                console.log(res.data);
                if (res.data.favorite !== null) {
                    setIsFavorite(true)
                } else {
                    setIsFavorite(false)
                }
                    onOpen()
                

            })

        })

    }

    const handleAddToFavorites = (number) => {
        if (isFavorite) {
            var reqData={
                userId: userId,
                roomNumber: number
            }
            console.log(reqData);
            axios.post(`${process.env.REACT_APP_HOSTURL}/favorite/delete`, reqData).then((res) => {
                console.log(res.data);
                setIsFavorite(false)
            }).catch((e)=>{
                console.log(e);
            })
        } else {
            axios.post(`${process.env.REACT_APP_HOSTURL}/favorite/add`, {
                userId: userId,
                roomNumber: number,
            }).then((res) => {
                console.log(res.data);
                setIsFavorite(true)
            })
        }
    }
    return (
        <div style={{ display: "flex", width: "100%", height: "100%" }}>
            <Sidebar />
            <div style={{ width: "85%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
            <h1 className='mybooking-title'>Favorite Rooms</h1>
            {
                favorites&&
                favorites.map((e)=>{
                    return (
                        <div className='favorite-container' onClick={()=>{
                            handleOnClick(e.roomNumber)
                        }}>
                            <span>
                            Study Room {e.roomNumber}

                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                            </div>
                    )
                })
            }
            </div>

            <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold' style={{ display: "flex", justifyContent: "space-between" }}>
                                    <h1>
                                        Selected Room Readings
                                    </h1>
                                    <svg onClick={()=>{
                                        handleAddToFavorites(roomReadings.roomNumber)
                                    }} className="hover-svg"
                                        xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill={isFavorite ? "var(--main-color)" : "none"}>
                                        <path d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z" stroke="var(--main-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                </AlertDialogHeader>

                                <AlertDialogBody>
                                <span>Room #{roomReadings && roomReadings.roomNumber}</span>

                                    <br></br>
                                    <span>PIR: {roomReadings && roomReadings.motion}</span>
                                    <br></br>
                                    <span>Temperature: {roomReadings && roomReadings.temperature}</span>

                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose} style={{ marginRight: 20 }}>
                                        Close
                                    </Button>
                                    <Button colorScheme='teal' size='md' bgColor={"var(--main-color)"} _hover={{ background: "var(--hover-color)" }} onClick={() => {
                                        
                                            navigate("/booking")

                                        
                                    }}>
                                        Proceed to booking
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
        </div>
    );
}

export default Favorite;