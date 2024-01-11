import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './view/pages/LoginPage/LoginPage';
import Header from './view/components/Header/Header';
import HomePage from './view/pages/homePage/HomePage';
import Booking from './view/pages/booking/Booking';
import MyBookings from './view/pages/mybookings/MyBookings';
import MyAccount from './view/pages/myAccount/MyAccount';
import MyCalendar from './view/pages/calendar/MyCalendar';
import Favorite from './view/pages/favorites/Favorite';
import ForgotPassword from './view/pages/forgotpassword/ForgotPassword';

function App() {
  return (
    <div className="App" style={{}}>
      <Header/>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/mybookings" element={<MyBookings/>}/>
        <Route path="/myaccount" element={<MyAccount/>}/>
        <Route path="/mycalendar" element={<MyCalendar/>}/>
        <Route path="/favorites" element={<Favorite/>}/>
        <Route path="/forget" element={<ForgotPassword/>}/>


      </Routes>
    </div>
  );
}

export default App;
