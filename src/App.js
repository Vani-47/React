import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './Components/mainScreen/Main';
import ForgotPassword from './Components/Login/ForgotPassword';
import Login from './Components/Login/Login';
import Login from './Components/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/signup" element={<ForgotPassword />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
