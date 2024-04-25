import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Login, Register } from "./pages";
import Home from "./pages/home";
import MoviesPage from "./pages/movies";
import SeriesPage from "./pages/serials";
import BookmarkedMoviesPage from "./pages/bookmarked";
import Header from "./components/header";

function App() {
  const location = useLocation();

  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";

  return (
    <div
      className={`${
        isLogin || isRegister ? "lg:block" : "lg:flex"
      } md:pt-6 bg-dark min-h-screen font-outfit`}
    >
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/bookedMovies" element={<BookmarkedMoviesPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
