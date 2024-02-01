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
import ManageBooking from './view/pages/manageBooking/ManageBooking';
import ManageUsers from './view/pages/manageUsers/ManageUsers';
import ChangeUser from './view/pages/changeuser/ChangeUser';
import AddUser from './view/pages/adduser/AddUser';
import Notifications from './view/pages/notifications/Notifications';

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
        <Route path="/managebookings" element={<ManageBooking/>}/>
        <Route path="/manageusers" element={<ManageUsers/>}/>
        <Route path="/manageusers/:id" element={<ChangeUser/>}/>
        <Route path="/manageusers/add" element={<AddUser/>}/>
        <Route path="/notifications" element={<Notifications/>}/>


      </Routes>
    </div>
  );
}

export default App;
