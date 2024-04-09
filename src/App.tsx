import { Route, Routes } from "react-router-dom";
import { Login } from "./pages";

function App() {
  return (
    <div className=" bg-dark min-h-screen font-outfit">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
