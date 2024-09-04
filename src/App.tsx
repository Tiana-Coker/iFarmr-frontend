import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from "./routes/landingPage/LandingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
