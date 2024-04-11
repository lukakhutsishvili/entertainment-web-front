import { Route, Routes } from "react-router-dom";
import { Login, Register } from "./pages";

function App() {
  return (
    <div className=" bg-dark min-h-screen font-outfit">
      <Routes>
        <Route path="/home" element={<div></div>} />
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
