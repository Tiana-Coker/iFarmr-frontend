import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Signup from './routes/signup/signup';
import VerifyEmail from './routes/emailConfirmation/EmailConfirmation';
import Login from './routes/login/login';
import UserDashboard from './routes/user/dashboard/Dashboard';


export default function App() {
  return (
    <Router>
      <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />

      <Route path="/" element={<h1 className="text-3xl font-bold underline">Welcome to IFarmr</h1>} />
     
      </Routes>
    </Router>
  )
}
