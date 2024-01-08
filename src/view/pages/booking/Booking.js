import React, { useEffect, useState } from 'react';
import "./Booking.css"
import { useDispatch, useSelector } from 'react-redux';
import { initRoom, selectRoom } from '../../../features/Booking';
import { Button, useToast } from '@chakra-ui/react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../config/FirebaseConfig';
import Sidebar from '../../components/sidebar/Sidebar';
function Booking(props) {
    const rooms = useSelector((state) => state.bookingStore.rooms)
    const selectedRoomNumber = useSelector((state) => state.bookingStore.selectedRoomNumber)

    const dispatch = useDispatch()
    const [page, setPage] = useState(true);
    useEffect(() => {
        const roomsCollection = collection(db, 'rooms');

        const unsubscribe = onSnapshot(roomsCollection, (snapshot) => {
            const roomsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            dispatch(initRoom(roomsData))
        });

        return () => unsubscribe();
    }, []);

    const toast = useToast()

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
            dispatch(selectRoom(number))
        }
    }
    return (
        page ?
            !rooms[0] ? <p>loading</p> :
                <div style={{ display: "flex", width: "100%", height: "100%" }}>
                    <Sidebar />

                    <div style={{ width: "85%", height: "100%", display: "flex", alignItems: "center", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", height: "100%", transform: "scale(75%)" }}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: '80px', justifyContent: "center", transform: "scale(200%)", width: "100%" }}>
                                <div style={{ backgroundColor: rooms[0].color, borderBottomLeftRadius: "25px", height: "min-content", cursor: "pointer", transform: "translate(0,18%)" }} onClick={() => {
                                    handleOnClick(0)
                                }}>
                                    <img src={"./assets/1.png"}>
                                    </img>
                                </div>


                                <div style={{ transform: "translate(0,16%)" }}>
                                    <img src={"./assets/coloir1.png"} >
                                    </img>

                                </div>

                                <div style={{ backgroundColor: rooms[1].color, height: "min-content", cursor: "pointer" }} onClick={() => {
                                    handleOnClick(1)
                                }}>
                                    <img src={"./assets/2.png"}>
                                    </img>
                                </div>

                                <div style={{ backgroundColor: rooms[2].color, height: "min-content", cursor: "pointer" }} onClick={() => {
                                    handleOnClick(2)
                                }}>
                                    <img src={"./assets/3.png"}>
                                    </img>
                                </div>

                                <div style={{ backgroundColor: rooms[3].color, height: "min-content", cursor: "pointer" }} onClick={() => {
                                    handleOnClick(3)

                                }}>
                                    <img src={"./assets/4.png"}>
                                    </img>
                                </div>
                                <div style={{ transform: "translate(0,3%)" }}>
                                    <img src={"./assets/stairs.png"} >

                                    </img>
                                </div>
                                <div style={{ backgroundColor: rooms[4].color, height: "min-content", cursor: "pointer" }} onClick={() => {
                                    handleOnClick(4)

                                }}>
                                    <img src={"./assets/5.png"}>
                                    </img>
                                </div>
                                <div style={{ backgroundColor: rooms[5].color, height: "min-content", cursor: "pointer" }} onClick={() => {
                                    handleOnClick(5)

                                }}>
                                    <img src={"./assets/6.png"}>
                                    </img>
                                </div>
                                <div style={{ backgroundColor: rooms[6].color, height: "min-content", cursor: "pointer" }} onClick={() => {
                                    handleOnClick(6)

                                }}>
                                    <img src={"./assets/7.png"}>
                                    </img>
                                </div>
                                <div style={{ transform: "translate(0,-3%)" }}>
                                    <img src={"./assets/coloir2.png"} >
                                    </img>
                                </div>

                                <div style={{ backgroundColor: rooms[19].color, borderTopRightRadius: "120px", height: "min-content", cursor: "pointer", transform: "translate(0,-5%)" }} onClick={() => {
                                    handleOnClick(19)

                                }}>
                                    <img src={"./assets/20.png"}>
                                    </img>
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "start", transform: "scale(200%)", width: "100%" }}>
                                <div style={{ backgroundColor: rooms[7].color, borderTopLeftRadius: "120px", height: "min-content", cursor: "pointer", transform: "translate(-30%,18%)" }} onClick={() => {
                                    handleOnClick(7)

                                }}>
                                    <img src={"./assets/8.png"}>
                                    </img>

                                </div>
                                <div style={{ transform: "translate(30%,0)" }}>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ backgroundColor: rooms[8].color, height: "min-content", cursor: "pointer" }} onClick={() => {
                                            handleOnClick(8)

                                        }}>
                                            <img src={"./assets/9.png"}>
                                            </img>
                                        </div>
                                        <div style={{ backgroundColor: rooms[9].color, height: "min-content", cursor: "pointer" }} onClick={() => {
                                            handleOnClick(9)

                                        }}>
                                            <img src={"./assets/10.png"}>
                                            </img>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ backgroundColor: rooms[10].color, height: "min-content", cursor: "pointer", }} onClick={() => {
                                            handleOnClick(10)

                                        }}>
                                            <img src={"./assets/11.png"}>
                                            </img>

                                        </div>

                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ backgroundColor: rooms[11].color, height: "min-content", cursor: "pointer" }} onClick={() => {
                                            handleOnClick(11)

                                        }}>
                                            <img src={"./assets/12.png"}>
                                            </img>
                                        </div>
                                        <div style={{ backgroundColor: rooms[12].color, height: "min-content", cursor: "pointer" }} onClick={() => {
                                            handleOnClick(12)

                                        }}>
                                            <img src={"./assets/13.png"}>
                                            </img>
                                        </div>
                                    </div>

                                </div>
                                <div style={{ backgroundColor: rooms[13].color, height: "min-content", cursor: "pointer", transform: "translate(11%)" }} onClick={() => {
                                    handleOnClick(13)

                                }}>
                                    <img src={"./assets/14.png"}>
                                    </img>
                                </div>

                                <div style={{ transform: "translate(25%,0)" }}>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ backgroundColor: rooms[14].color, height: "min-content", cursor: "pointer" }} onClick={() => {
                                            handleOnClick(14)

                                        }}>
                                            <img src={"./assets/15.png"}>
                                            </img>
                                        </div>
                                        <div style={{ backgroundColor: rooms[15].color, height: "min-content", cursor: "pointer" }} onClick={() => {
                                            handleOnClick(15)

                                        }}>
                                            <img src={"./assets/16.png"}>
                                            </img>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ backgroundColor: rooms[16].color, height: "min-content", cursor: "pointer", }} onClick={() => {
                                            handleOnClick(16)

                                        }}>
                                            <img src={"./assets/17.png"}>
                                            </img>

                                        </div>

                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ backgroundColor: rooms[17].color, height: "min-content", cursor: "pointer" }} onClick={() => {
                                            handleOnClick(17)

                                        }}>
                                            <img src={"./assets/18.png"}>
                                            </img>
                                        </div>
                                        <div style={{ backgroundColor: rooms[18].color, height: "min-content", cursor: "pointer" }} onClick={() => {
                                            handleOnClick(18)
                                        }}>
                                            <img src={"./assets/19.png"}>
                                            </img>
                                        </div>


                                    </div>

                                </div>
                                <div style={{ backgroundColor: rooms[20].color, borderBottomRightRadius: "120px", height: "min-content", cursor: "pointer", transform: "translate(78.5%,-20%)" }} onClick={() => {
                                    handleOnClick(20)

                                }}>
                                    <img src={"./assets/21.png"}>
                                    </img>
                                </div>
                            </div>


                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: '80px', justifyContent: "center", transform: "scale(200%) translate(0,60%)", width: "100%" }}>

                                <div style={{ backgroundColor: rooms[27].color, borderBottomLeftRadius: "120px", height: "min-content", cursor: "pointer", transform: "scale(102%) translate(-28%,-11%)" }} onClick={() => {
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
                                    <div style={{ backgroundColor: rooms[21].color, height: "min-content", cursor: "pointer" }} onClick={() => {
                                        handleOnClick(21)

                                    }}>
                                        <img src={"./assets/22.png"}>
                                        </img>
                                    </div>

                                    <div style={{ backgroundColor: rooms[22].color, height: "min-content", cursor: "pointer" }} onClick={() => {
                                        handleOnClick(22)

                                    }}>
                                        <img src={"./assets/23.png"}>
                                        </img>
                                    </div>

                                    <div style={{ backgroundColor: rooms[23].color, height: "min-content", cursor: "pointer" }} onClick={() => {
                                        handleOnClick(23)

                                    }}>
                                        <img src={"./assets/24.png"}>
                                        </img>
                                    </div>
                                    <div style={{ transform: "translate(0,-2%)" }}>
                                        <img src={"./assets/stairs2.png"} >

                                        </img>
                                    </div>
                                    <div style={{ backgroundColor: rooms[24].color, height: "min-content", cursor: "pointer" }} onClick={() => {
                                        handleOnClick(24)

                                    }}>
                                        <img src={"./assets/25.png"}>
                                        </img>
                                    </div>
                                    <div style={{ backgroundColor: rooms[25].color, height: "min-content", cursor: "pointer" }} onClick={() => {
                                        handleOnClick(25)

                                    }}>
                                        <img src={"./assets/26.png"}>
                                        </img>
                                    </div>
                                    <div style={{ backgroundColor: rooms[26].color, height: "min-content", cursor: "pointer" }} onClick={() => {
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
                                <div style={{ backgroundColor: rooms[29].color, borderBottomRightRadius: "20px", height: "min-content", cursor: "pointer", transform: "translate(-47%,-24%)" }} onClick={() => {
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
                            <Button colorScheme='teal' size='md' bgColor={"var(--main-color)"} _hover={{ background: "var(--hover-color)" }} onClick={() => {
                                if (selectedRoomNumber === -1) {
                                    toast({
                                        title: 'You need to select a room!',
                                        status: 'error',
                                        duration: 9000,
                                        isClosable: true,
                                    })
                                } else {
                                    console.log(selectedRoomNumber);
                                    setPage(false)
                                }
                            }}>
                                Next
                            </Button>
                        </div>


                    </div>
                </div>

            : <div>

            </div>
    );
}

export default Booking;