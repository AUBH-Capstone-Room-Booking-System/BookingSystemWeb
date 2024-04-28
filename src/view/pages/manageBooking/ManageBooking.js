import React, { useEffect, useState } from 'react';
import "./ManageBooking.css"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { initRoom, selectRoom } from '../../../features/Booking';
import Sidebar from '../../components/sidebar/Sidebar';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
function ManageBooking(props) {
    const rooms = useSelector((state) => state.bookingStore.rooms)
    const dispatch = useDispatch()
    const [bookings, setBookings] = useState([])
    const userId = localStorage.getItem("myId")
    const [selectedBooking, setSelectedBooking] = useState({})
    const [roomReadings, setRoomReadings] = useState()
    const [isFavorite, setIsFavorite] = useState(false)
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_HOSTURL}/booking/admin/findall`).then((res) => {
            console.log(res.data)
            setBookings(res.data.bookings)
        })
        console.log(bookings)
    }, [])
    const selectedRoomNumber = useSelector((state) => state.bookingStore.selectedRoomNumber)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const navigate = useNavigate()
    const handleOnClick = (number) => {
        if (rooms[number].roomStatus === "Occupied") {
            toast({
                title: 'Room is occupied.',
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
        } else if (rooms[number].roomStatus === "Booked") {
            toast({
                title: 'Room is Already Booked.',
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
        } else {
            axios.post(`${process.env.REACT_APP_HOSTURL}/sensor/find`, {
                roomNumber: number + 1
            }).then((res) => {
                setRoomReadings(res.data.sensorData)

                axios.post(`${process.env.REACT_APP_HOSTURL}/favorite/findone`, {
                    roomNumber: number + 1,
                    userId: userId
                }).then((res) => {
                    console.log(res.data);
                    if (res.data.favorite !== null) {
                        setIsFavorite(true)
                    } else {
                        setIsFavorite(false)

                    }
                    var x=number+1

                    
                    if(selectedRoomNumber!=x){
                       

                        onOpen()
                    }
                    dispatch(selectRoom(number))

                })

            })

        }
    }
    const toast = useToast()
    const handleAddToFavorites = () => {
        if (isFavorite) {
            var reqData={
                userId: userId,
                roomNumber: selectedRoomNumber
            }
            console.log(reqData);
            axios.post(`${process.env.REACT_APP_HOSTURL}/favorite/delete`, reqData).then((res) => {
                toast({
                    title: 'Deleted room from favorites.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
                                onClose()
                setIsFavorite(false)
            }).catch((e)=>{
                console.log(e);
            })
        } else {
            axios.post(`${process.env.REACT_APP_HOSTURL}/favorite/add`, {
                userId: userId,
                roomNumber: selectedRoomNumber,
            }).then((res) => {
                toast({
                    title: 'Added room to favorites.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                                setIsFavorite(true)
            })
        }
    }
    const [pageIndex, setPageIndex] = useState(0)

    const handleEditRoom = () => {
        const postData = {
            "startDate": selectedBooking.startDate,
            "startTime": selectedBooking.startTime,
            "endTime": selectedBooking.endTime
        }
        axios.post(`${process.env.REACT_APP_HOSTURL}/booking/find`, postData).then((res) => {
            dispatch(initRoom(res.data.rooms))

            setPageIndex(2)
        })


    }

    const handleCancelBooking = () => {
        axios.delete(`${process.env.REACT_APP_HOSTURL}/booking/delete/${selectedBooking.id}`).then((res) => {
            toast({
                title: 'Canceled Booking!',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            navigate("/")
        }).catch((e) => {
            console.log(e);
        })
    }

    const formatDate = (e) => {
        const dateParts = e.startDate.split('/');
        const formattedDate = new Date(`${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`);
        return formattedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    }
    return (
        <div style={{ display: "flex", width: "100%", height: "100%" }}>
            <Sidebar />
            {
                pageIndex === 0 ? <div style={{ width: "85%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", }}>
                    <h1 className='mybooking-title'>My Bookings</h1>
                    <h2 className='subtitle' style={{ marginBottom: 20 }}>Select a booking to edit:</h2>

                    <div>
                        {bookings&&
                    bookings.length === 0 ? <p>No Bookings</p> :bookings&& bookings.map((e) => {
                            return (<div onClick={() => {
                                setSelectedBooking(e)
                                setPageIndex(1)
                            }}>
                                <h2>{formatDate(e)}</h2>
                                <div className='booking-card'>
                                    {e.guest} - ({e.startTime} - {e.endTime})
                                </div>
                            </div>)
                        })}
                    </div>
                </div> : pageIndex === 1 ?

                    <div style={{ width: "85%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", }}>
                        <h1 className='mybooking-title'>Edit Booking</h1>
                        <h2 className='subtitle' style={{ marginBottom: 20 }}>{formatDate(selectedBooking)} {selectedBooking.purpose} ({selectedBooking.startTime} - {selectedBooking.endTime})</h2>

                        <Button colorScheme='teal' onClick={handleEditRoom} size='md' marginBottom={"30px"} width={"80%"} bgColor={"var(--main-color)"} _hover={{ background: "var(--hover-color)" }}>
                            Edit Selected Room
                        </Button>
                        <Button colorScheme='teal' onClick={handleCancelBooking} size='md' width={"80%"} bgColor={"#AE1515"} _hover={{ background: "#ad3d3d" }}>
                            Cancel Booking
                        </Button>
                    </div>
                    : <div style={{ width: "85%", height: "100%", display: "flex", alignItems: "center", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", height: "100%", transform: "scale(75%)" }}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: '80px', justifyContent: "center", transform: "scale(200%)", width: "100%" }}>
                                <div style={{ backgroundColor: rooms[0].mapColor, borderBottomLeftRadius: "25px", height: "min-content", cursor: "pointer", transform: "translate(0,18%)" }} onClick={() => {
                                    handleOnClick(0)
                                }}>
                                    <img src={"./assets/1.png"}>
                                    </img>
                                </div>


                                <div style={{ transform: "translate(0,16%)" }}>
                                    <img src={"./assets/coloir1.png"} >
                                    </img>

                                </div>

                                <div style={{ backgroundColor: rooms[1].mapColor, height: "min-content", cursor: "pointer" }} onClick={() => {
                                    handleOnClick(1)
                                }}>
                                    <img src={"./assets/2.png"}>
                                    </img>
                                </div>

                                <div style={{ backgroundColor: rooms[2].mapColor, height: "min-content", cursor: "pointer" }} onClick={() => {
                                    handleOnClick(2)
                                }}>
                                    <img src={"./assets/3.png"}>
                                    </img>
                                </div>

                                <div style={{ backgroundColor: rooms[3].mapColor, height: "min-content", cursor: "pointer" }} onClick={() => {
                                    handleOnClick(3)

                                }}>
                                    <img src={"./assets/4.png"}>
                                    </img>
                                </div>
                                <div style={{ transform: "translate(0,3%)" }}>
                                    <img src={"./assets/stairs.png"} >

                                    </img>
                                </div>
                                <div style={{ backgroundColor: rooms[4].mapColor, height: "min-content", cursor: "pointer" }} onClick={() => {
                                    handleOnClick(4)

                                }}>
                                    <img src={"./assets/5.png"}>
                                    </img>
                                </div>
                                <div style={{ backgroundColor: rooms[5].mapColor, height: "min-content", cursor: "pointer" }} onClick={() => {
                                    handleOnClick(5)

                                }}>
                                    <img src={"./assets/6.png"}>
                                    </img>
                                </div>
                                <div style={{ backgroundColor: rooms[6].mapColor, height: "min-content", cursor: "pointer" }} onClick={() => {
                                    handleOnClick(6)

                                }}>
                                    <img src={"./assets/7.png"}>
                                    </img>
                                </div>
                                <div style={{ transform: "translate(0,-3%)" }}>
                                    <img src={"./assets/coloir2.png"} >
                                    </img>
                                </div>

                                <div style={{ backgroundColor: rooms[19].mapColor, borderTopRightRadius: "120px", height: "min-content", cursor: "pointer", transform: "translate(0,-5%)" }} onClick={() => {
                                    handleOnClick(19)

                                }}>
                                    <img src={"./assets/20.png"}>
                                    </img>
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "start", transform: "scale(200%)", width: "100%" }}>
                                <div style={{ backgroundColor: rooms[7].mapColor, borderTopLeftRadius: "120px", height: "min-content", cursor: "pointer", transform: "translate(-30%,18%)" }} onClick={() => {
                                    handleOnClick(7)

                                }}>
                                    <img src={"./assets/8.png"}>
                                    </img>

                                </div>
                                <div style={{ transform: "translate(30%,0)" }}>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ backgroundColor: rooms[8].mapColor, height: "min-content", cursor: "pointer" }} onClick={() => {
                                            handleOnClick(8)

                                        }}>
                                            <img src={"./assets/9.png"}>
                                            </img>
                                        </div>
                                        <div style={{ backgroundColor: rooms[9].mapColor, height: "min-content", cursor: "pointer" }} onClick={() => {
                                            handleOnClick(9)

                                        }}>
                                            <img src={"./assets/10.png"}>
                                            </img>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ backgroundColor: rooms[10].mapColor, height: "min-content", cursor: "pointer", }} onClick={() => {
                                            handleOnClick(10)

                                        }}>
                                            <img src={"./assets/11.png"}>
                                            </img>

                                        </div>

                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ backgroundColor: rooms[11].mapColor, height: "min-content", cursor: "pointer" }} onClick={() => {
                                            handleOnClick(11)

                                        }}>
                                            <img src={"./assets/12.png"}>
                                            </img>
                                        </div>
                                        <div style={{ backgroundColor: rooms[12].mapColor, height: "min-content", cursor: "pointer" }} onClick={() => {
                                            handleOnClick(12)

                                        }}>
                                            <img src={"./assets/13.png"}>
                                            </img>
                                        </div>
                                    </div>

                                </div>
                                <div style={{ backgroundColor: rooms[13].mapColor, height: "min-content", cursor: "pointer", transform: "translate(11%)" }} onClick={() => {
                                    handleOnClick(13)

                                }}>
                                    <img src={"./assets/14.png"}>
                                    </img>
                                </div>

                                <div style={{ transform: "translate(25%,0)" }}>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ backgroundColor: rooms[14].mapColor, height: "min-content", cursor: "pointer" }} onClick={() => {
                                            handleOnClick(14)

                                        }}>
                                            <img src={"./assets/15.png"}>
                                            </img>
                                        </div>
                                        <div style={{ backgroundColor: rooms[15].mapColor, height: "min-content", cursor: "pointer" }} onClick={() => {
                                            handleOnClick(15)

                                        }}>
                                            <img src={"./assets/16.png"}>
                                            </img>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ backgroundColor: rooms[16].mapColor, height: "min-content", cursor: "pointer", }} onClick={() => {
                                            handleOnClick(16)

                                        }}>
                                            <img src={"./assets/17.png"}>
                                            </img>

                                        </div>

                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ backgroundColor: rooms[17].mapColor, height: "min-content", cursor: "pointer" }} onClick={() => {
                                            handleOnClick(17)

                                        }}>
                                            <img src={"./assets/18.png"}>
                                            </img>
                                        </div>
                                        <div style={{ backgroundColor: rooms[18].mapColor, height: "min-content", cursor: "pointer" }} onClick={() => {
                                            handleOnClick(18)
                                        }}>
                                            <img src={"./assets/19.png"}>
                                            </img>
                                        </div>


                                    </div>

                                </div>
                                <div style={{ backgroundColor: rooms[20].mapColor, borderBottomRightRadius: "120px", height: "min-content", cursor: "pointer", transform: "translate(78.5%,-20%)" }} onClick={() => {
                                    handleOnClick(20)

                                }}>
                                    <img src={"./assets/21.png"}>
                                    </img>
                                </div>
                            </div>


                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: '80px', justifyContent: "center", transform: "scale(200%) translate(0,60%)", width: "100%" }}>

                                <div style={{ backgroundColor: rooms[27].mapColor, borderBottomLeftRadius: "120px", height: "min-content", cursor: "pointer", transform: "scale(102%) translate(-28%,-11%)" }} onClick={() => {
                                    handleOnClick(27)

                                }}>
                                    <img src={"./assets/28.png"}>
                                    </img>
                                </div>

                                <div style={{ transform: "translate(-52%,2%)" }}>
                                    <img src={"./assets/coloir3.png"} >
                                    </img>

                                </div>
                                <div style={{ display: "flex", transform: "translate(-8%,15%)" }}>
                                    <div style={{ backgroundColor: rooms[21].mapColor, height: "min-content", cursor: "pointer" }} onClick={() => {
                                        handleOnClick(21)

                                    }}>
                                        <img src={"./assets/22.png"}>
                                        </img>
                                    </div>

                                    <div style={{ backgroundColor: rooms[22].mapColor, height: "min-content", cursor: "pointer" }} onClick={() => {
                                        handleOnClick(22)

                                    }}>
                                        <img src={"./assets/23.png"}>
                                        </img>
                                    </div>

                                    <div style={{ backgroundColor: rooms[23].mapColor, height: "min-content", cursor: "pointer" }} onClick={() => {
                                        handleOnClick(23)

                                    }}>
                                        <img src={"./assets/24.png"}>
                                        </img>
                                    </div>
                                    <div style={{ transform: "translate(0,-2%)" }}>
                                        <img src={"./assets/stairs2.png"} >

                                        </img>
                                    </div>
                                    <div style={{ backgroundColor: rooms[24].mapColor, height: "min-content", cursor: "pointer" }} onClick={() => {
                                        handleOnClick(24)

                                    }}>
                                        <img src={"./assets/25.png"}>
                                        </img>
                                    </div>
                                    <div style={{ backgroundColor: rooms[25].mapColor, height: "min-content", cursor: "pointer" }} onClick={() => {
                                        handleOnClick(25)

                                    }}>
                                        <img src={"./assets/26.png"}>
                                        </img>
                                    </div>
                                    <div style={{ backgroundColor: rooms[26].mapColor, height: "min-content", cursor: "pointer" }} onClick={() => {
                                        handleOnClick(26)

                                    }}>
                                        <img src={"./assets/27.png"}>
                                        </img>
                                    </div>

                                </div>
                                <div style={{ height: "min-content", transform: "translate(-41%,-20%)" }}>
                                    <img src={"./assets/29.png"}>
                                    </img>
                                </div>
                                <div style={{ backgroundColor: rooms[29].mapColor, borderBottomRightRadius: "20px", height: "min-content", cursor: "pointer", transform: "translate(-47%,-24%)" }} onClick={() => {
                                    handleOnClick(29)

                                }}>
                                    <img src={"./assets/30.png"}>
                                    </img>
                                </div>

                            </div>


                        </div>
                        <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                            <div>
                                <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                                    <div className="status-circle" style={{ background: "transparent" }}>

                                    </div>
                                    <p>
                                        Available
                                    </p>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                                    <div className="status-circle" style={{ background: "#cb2642" }}>

                                    </div>
                                    <p >
                                        Booked
                                    </p>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                                    <div className="status-circle" style={{ background: "#ebbb33" }}>

                                    </div>
                                    <p>
                                        Occupied
                                    </p>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                                    <div className="status-circle" style={{ background: "var(--hover-color)" }}>

                                    </div>
                                    <p>
                                        Selected
                                    </p>
                                </div>

                            </div>
                            <div>
                                <h2>Selected Room: {selectedRoomNumber === -1 ? "No Room Selected" : selectedRoomNumber}</h2>
                                <Button colorScheme='teal' size='md' style={{ marginRight: 20 }} bgColor={"var(--main-color)"} _hover={{ background: "var(--hover-color)" }} onClick={() => {

                                    setPageIndex(1)

                                }}>
                                    Back
                                </Button>
                                <Button colorScheme='teal' size='md' bgColor={"var(--main-color)"} _hover={{ background: "var(--hover-color)" }} onClick={() => {
                                    if (selectedRoomNumber === -1) {
                                        toast({
                                            title: 'You need to select a room!',
                                            status: 'error',
                                            duration: 9000,
                                            isClosable: true,
                                        })
                                    } else {
                                        axios.post(`${process.env.REACT_APP_HOSTURL}/booking/edit/${selectedBooking.id}`, {
                                            roomNumber: selectedRoomNumber
                                        }).then((res) => {
                                            toast({
                                                title: 'Edited Booking!',
                                                status: 'success',
                                                duration: 9000,
                                                isClosable: true,
                                            })
                                            navigate("/")
                                        })

                                    }
                                }}>
                                    Save Edit
                                </Button>
                            </div>

                        </div>


                    </div>
            }

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
                                    <svg onClick={handleAddToFavorites} className="hover-svg"
                                        xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill={isFavorite ? "var(--main-color)" : "none"}>
                                        <path d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z" stroke="var(--main-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                </AlertDialogHeader>

                                <AlertDialogBody>
                                    <span>PIR: {roomReadings && roomReadings.motion}</span>
                                    <br></br>
                                    <span>Temperature: {roomReadings && roomReadings.temperature}</span>

                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose} style={{ marginRight: 20 }}>
                                        Close
                                    </Button>
                                    <Button colorScheme='teal' size='md' bgColor={"var(--main-color)"} _hover={{ background: "var(--hover-color)" }} onClick={() => {
                                         if (selectedRoomNumber === -1) {
                                            toast({
                                                title: 'You need to select a room!',
                                                status: 'error',
                                                duration: 9000,
                                                isClosable: true,
                                            })
                                        } else {
                                            axios.post(`${process.env.REACT_APP_HOSTURL}/booking/edit/${selectedBooking.id}`, {
                                                roomNumber: selectedRoomNumber
                                            }).then((res) => {
                                                toast({
                                                    title: 'Edited Booking!',
                                                    status: 'success',
                                                    duration: 9000,
                                                    isClosable: true,
                                                })
                                                navigate("/")
                                            })
    
                                        }
                                    }}>
                                        Save Edit
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
    </div>
    );
}

export default ManageBooking;