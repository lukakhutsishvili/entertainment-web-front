import { Navigate, Route, Routes } from "react-router-dom";
import { Login, Register } from "./pages";
import Home from "./pages/home";

function App() {
  return (
    <div className=" bg-dark min-h-screen font-outfit">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
