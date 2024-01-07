import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './view/pages/LoginPage/LoginPage';
import Header from './view/components/Header/Header';
import HomePage from './view/pages/homePage/HomePage';
import Booking from './view/pages/booking/Booking';

function App() {
  return (
    <div className="App" style={{}}>
      <Header/>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/booking" element={<Booking/>}/>

      </Routes>
    </div>
  );
}

export default App;
