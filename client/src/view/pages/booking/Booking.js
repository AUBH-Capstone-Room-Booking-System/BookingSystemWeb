import React, { useEffect, useRef, useState } from 'react';
import "./Booking.css"
import { useDispatch, useSelector } from 'react-redux';
import { initRoom, selectRoom } from '../../../features/Booking';
import { Button, useToast } from '@chakra-ui/react';
import Sidebar from '../../components/sidebar/Sidebar';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Booking(props) {
    const rooms = useSelector((state) => state.bookingStore.rooms)
    const userId =localStorage.getItem("myId")

    const selectedRoomNumber = useSelector((state) => state.bookingStore.selectedRoomNumber)
    const [selectedDate, setSelectedDate] = useState(null);
    const [endTime,setEndTime]=useState("");
    const [startTime,setStartTime]=useState("");
const [purpose,setPurpose]=useState("")

    const navigate=useNavigate()
    const dispatch = useDispatch()
    const [page, setPage] = useState(false);
 

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
            console.log("selected");
            dispatch(selectRoom(number))
        }
    }

    const handleStartTimeChange = (event) => {
        const newStartTime = event.target.value;
        setStartTime(newStartTime);
        setEndTime('');
      };
    
      const handleEndTimeChange = (event) => {
        const newEndTime = event.target.value;
    
        // Check if the new end time is greater than or equal to the start time
        if (newEndTime >= startTime) {
          setEndTime(newEndTime);
          const postData={
            "startDate":selectedDate.toLocaleDateString('en-GB'),
            "startTime":startTime,
            "endTime":newEndTime
          }
          console.log(postData);
          axios.post(`${process.env.REACT_APP_HOSTURL}/booking/find`,postData).then((res)=>{
            dispatch(initRoom(res.data.rooms))
            console.log("rooms are");
            console.log(res.data.rooms);
          })
        } else {

        }
      };

    return (
        page ?
            !rooms[0] ? <p>loading</p> :
                <div style={{ display: "flex", width: "100%", height: "100%" }}>
                    <Sidebar />

                    <div style={{ width: "85%", height: "100%", display: "flex", alignItems: "center", flexDirection: "column" }}>
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
                                <h2>Selected Room: {selectedRoomNumber===-1?"No Room Selected":selectedRoomNumber}</h2>
                            <Button colorScheme='teal' size='md' style={{marginRight:20}} bgColor={"var(--main-color)"} _hover={{ background: "var(--hover-color)" }} onClick={() => {
                                
                                    setPage(false)
                                
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
                                    var postData={
                                        "roomNumber":selectedRoomNumber,
                                        "purpose":purpose,
                                        "startTime":startTime,
                                        "endTime":endTime,
                                        "startDate":selectedDate.toLocaleDateString('en-GB'),
                                        "userId":userId
                                    }
                                    console.log(postData);
                                    axios.post(`${process.env.REACT_APP_HOSTURL}/booking/add`,postData).then((res)=>{
                                        toast({
                                            title: 'Booked Room!',
                                            status: 'success',
                                            duration: 9000,
                                            isClosable: true,
                                        })
                                    }).catch((e)=>{
                                        console.log(e);
                                    })
                                    navigate("/")
                                    
                                }
                            }}>
                                Book Room
                            </Button>
                            </div>
                          
                        </div>


                    </div>
                </div>

            : <div style={{ display: "flex", width: "100%", height: "100%" }}>
                <Sidebar />

                <div style={{ width: "85%", height: "100%", display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "space-around" }}>

                    <div style={{ display: "flex", justifyContent: "space-between", width: "90%" }}>
                        <div className='input-group'>
                            <h2>Date:</h2>
                            <div className="input-field">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    locale="en"
                                    placeholderText='Choose a date'
                                    minDate={new Date()}
                                />
                                <img src='./assets/calendar.svg' style={{transform:"translate(-150%)"}}>
                                </img>
                            </div>
                        </div>
                        <div className='input-group'>
                            <h2>From:</h2>
                            <div className='input-field'>
                                <input type="time" value={startTime} onChange={handleStartTimeChange}></input>

                            </div>
                        </div>
                        <div className='input-group'>
                            <h2>To:</h2>
                            <div className='input-field'>
                                <input type="time" value={endTime} onChange={handleEndTimeChange}></input>

                            </div>
                        </div>


                    </div>


                    <div style={{ display: "flex", flexDirection: "column",  width: "90%" }}>
                        <h1 className='booking-title-room' style={{ alignSelf: "start" }}>Available Rooms:</h1>
                        <br></br>
                        <div style={{ display: "flex", width: '100%', justifyContent: "space-around",flexWrap:"wrap",alignContent:"space-around",height:"300px" }}>
                            {
                                rooms.length===0?"Select Date First":rooms.map((e, index) => {
                                    if (e.roomStatus === "Available") {
                                        return (<div className='room-container' style={{backgroundColor:"#3C4A2F"}} onClick={()=>{
                                            toast({
                                                title: 'Click next to select room',
                                                status: 'info',
                                                duration: 9000,
                                                isClosable: true,
                                            })
                                        }}>
                                            Room {e.roomNumber}
                                        </div>)
                                    }else if(e.roomStatus === "Occupied"){
                                        return (<div className='room-container' style={{backgroundColor:"#ebbb33"}} onClick={()=>{
                                            toast({
                                                title: 'Occupied Room!',
                                                status: 'error',
                                                duration: 9000,
                                                isClosable: true,
                                            })
                                        }}>
                                            Room {e.roomNumber}
                                        </div>)
                                    }else if(e.roomStatus === "Booked"){
                                        return (<div className='room-container' style={{backgroundColor:"#cb2642"}} onClick={()=>{
                                            toast({
                                                title: 'Booked Room!',
                                                status: 'error',
                                                duration: 9000,
                                                isClosable: true,
                                            })
                                        }}>
                                            Room {e.roomNumber}
                                        </div>)
                                    }


                                })
                            }
                        </div>
                    </div>

                    <div style={{ display: "flex", width: "90%", flexDirection: "column", alignItems: "start" }}>
                        <h2>Purpose:</h2>
                        <div className='input-field' style={{ width: "100%" }}>
                            <input type="text" placeholder='ex: Exam Preperation' value={purpose} onChange={(e)=>{
                                setPurpose(e.target.value)
                            }}>
                            </input>
                        </div>
                    </div>

                    <Button colorScheme='teal' size='md' bgColor={"var(--main-color)"} _hover={{ background: "var(--hover-color)" }} onClick={() => {
                                if(purpose===""){

                                    return ;
                                }
                                if(startTime===""){

                                    return ;
                                }

                                if(endTime===""){
                                    return ;

                                }

                                if(!selectedDate){
                                    return ;

                                }

                                console.log(startTime);
                                console.log(endTime);
                                console.log(selectedDate.toLocaleDateString('en-GB'));
                                console.log(purpose);

                                
                                setPage(true)
                                
                            }}>
                                Next
                            </Button>
                </div>
            </div>
    );
}

export default Booking;