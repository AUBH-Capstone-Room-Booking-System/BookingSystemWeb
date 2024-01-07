import React from 'react';
import "./HomePage.css"
import { useNavigate } from 'react-router-dom';
function HomePage(props) {
    const navigate=useNavigate()
    return (
        <div style={{ display: "flex", width: "100%", height: "100%" }}>
            <div style={{ width: "15%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="75" height="71" viewBox="0 0 75 71" fill="none" >
                        <path d="M9.375 26.625L37.5 5.91667L65.625 26.625V59.1667C65.625 60.7359 64.9665 62.2408 63.7944 63.3504C62.6223 64.46 61.0326 65.0833 59.375 65.0833H15.625C13.9674 65.0833 12.3777 64.46 11.2056 63.3504C10.0335 62.2408 9.375 60.7359 9.375 59.1667V26.625Z" stroke="#667080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M28.125 65.0833V35.5H46.875V65.0833" stroke="#667080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h2 className='category-title'>
                        Home
                    </h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="61" height="69" viewBox="0 0 61 69" fill="none">
                        <path d="M50.8334 60.375V54.625C50.8334 51.575 49.7622 48.6499 47.8556 46.4933C45.949 44.3366 43.3631 43.125 40.6667 43.125H20.3334C17.637 43.125 15.0511 44.3366 13.1444 46.4933C11.2378 48.6499 10.1667 51.575 10.1667 54.625V60.375" stroke="#667080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M30.5 31.625C36.1149 31.625 40.6666 26.4763 40.6666 20.125C40.6666 13.7737 36.1149 8.625 30.5 8.625C24.8851 8.625 20.3333 13.7737 20.3333 20.125C20.3333 26.4763 24.8851 31.625 30.5 31.625Z" stroke="#667080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h2 className='category-title'>
                        Account
                    </h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="73" viewBox="0 0 80 73" fill="none">
                        <path d="M63.3333 12.1667H16.6667C12.9848 12.1667 10 14.8903 10 18.25V60.8333C10 64.1931 12.9848 66.9167 16.6667 66.9167H63.3333C67.0152 66.9167 70 64.1931 70 60.8333V18.25C70 14.8903 67.0152 12.1667 63.3333 12.1667Z" stroke="#667080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M53.3333 6.08334V18.25" stroke="#667080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M26.6667 6.08334V18.25" stroke="#667080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10 30.4167H70" stroke="#667080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h2 className='category-title'>
                        Calendar
                    </h2>
                </div>

            </div>
            <div style={{ width: "85%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                <div style={{ cursor: "pointer" }}>

                    <div className='circle'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="173" height="171" viewBox="0 0 173 171" fill="none">
                            <path d="M138.669 44.4408C149.818 55.4607 150.244 73.1928 139.639 84.7243L86.4963 142.5L33.361 84.7242C22.7552 73.1926 23.1823 55.4603 34.3311 44.4405C46.7793 32.1362 67.2806 33.2605 78.278 46.8483L86.5 57.0032L94.7149 46.8472C105.712 33.2593 126.221 32.1366 138.669 44.4408Z" stroke="#3C4A2F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <h2 className='category-title'>
                        Favorite Rooms
                    </h2>
                </div>

                <div style={{ cursor: "pointer" }} onClick={()=>{
                    navigate("/booking")
                }}>

                    <div className='circle'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="163" height="144" viewBox="0 0 163 144" fill="none">
                            <path d="M54.3333 24H48.9013C41.294 24 37.4874 24 34.5818 25.3079C32.0259 26.4584 29.9494 28.2928 28.6472 30.5508C27.1667 33.1177 27.1667 36.4805 27.1667 43.2012V48M54.3333 24H108.667M54.3333 24V12M108.667 24H114.101C121.709 24 125.507 24 128.413 25.3079C130.969 26.4584 133.052 28.2928 134.354 30.5508C135.833 33.1152 135.833 36.474 135.833 43.1815V48M108.667 24V12M27.1667 48V100.801C27.1667 107.522 27.1667 110.88 28.6472 113.447C29.9494 115.705 32.0259 117.543 34.5818 118.693C37.4846 120 41.2865 120 48.879 120H114.121C121.713 120 125.51 120 128.413 118.693C130.969 117.543 133.052 115.705 134.354 113.447C135.833 110.883 135.833 107.529 135.833 100.821V48M27.1667 48H135.833M108.667 96H108.68L108.68 96.012L108.667 96.0117V96ZM81.5 96H81.5136L81.5133 96.012L81.5 96.0117V96ZM54.3333 96H54.3469L54.3466 96.012L54.3333 96.0117V96ZM108.68 72V72.012L108.667 72.0117V72H108.68ZM81.5 72H81.5136L81.5133 72.012L81.5 72.0117V72ZM54.3333 72H54.3469L54.3466 72.012L54.3333 72.0117V72Z" stroke="#3C4A2F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <h2 className='category-title'>
                        Booking
                    </h2>
                </div>
                <div style={{ cursor: "pointer" }}>

                    <div className='circle'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="160" height="152" viewBox="0 0 160 152" fill="none">
                            <path d="M20 76H140" stroke="#3C4A2F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M20 38H140" stroke="#3C4A2F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M20 114H140" stroke="#3C4A2F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <h2 className='category-title'>
                        My Bookings
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default HomePage;