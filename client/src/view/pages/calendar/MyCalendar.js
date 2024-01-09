import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function MyCalendar(props) {
    const [selectedDate,setSelectedDate]=useState(new Date())
    const userId=localStorage.getItem("myId")

    const [bookings,setBookings]=useState([])
    const handleChange=(e)=>{
        setSelectedDate(e)
        axios.post(`${process.env.REACT_APP_HOSTURL}/booking/findbyday`,{
            userId:userId,
            startDate:e.toLocaleDateString('en-GB'),
        }).then((res)=>{
            setBookings(res.data.bookings)
        }).catch((e)=>{
            console.log(e);
        })
    }
const navigate=useNavigate()
    useEffect(()=>{

        axios.post(`${process.env.REACT_APP_HOSTURL}/booking/findbyday`,{
            userId:userId,
            startDate:selectedDate.toLocaleDateString('en-GB'),
        }).then((res)=>{
            setBookings(res.data.bookings)
        }).catch((e)=>{
            console.log(e);
        })
    },[])

    const formatDate=(e)=>{
        const dateParts = e.startDate.split('/');
        const formattedDate = new Date(`${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`);
        return formattedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    }
    return (
        <div style={{ display: "flex", width: "100%", height: "100%" }}>
            <Sidebar/>
            <div style={{ width: "85%", height: "100%", display: "flex", flexDirection: "column",justifyContent:"center", alignItems: "center", }}>
                <Calendar value={selectedDate} onChange={handleChange}/>

               
                {bookings.length===0?<p>No Bookings</p>:bookings.map((e) => {
                            return (<div onClick={() => {
                                navigate("/mybookings")
                                                        }}>
                                <h2>{formatDate(e)}</h2>
                                <div className='booking-card'>
                                    {e.purpose} ({e.startTime} - {e.endTime})
                                </div>
                            </div>)
                        })}
            </div>
        </div>
    );
}

export default MyCalendar;