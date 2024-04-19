import { Navigate, Route, Routes } from "react-router-dom";
import { Login, Register } from "./pages";
import Home from "./pages/home";
import MoviesPage from "./pages/movies";
import SeriesPage from "./pages/serials";
import BookmarkedMoviesPage from "./pages/bookmarked";
import Header from "./components/header";

function App() {
  return (
    <div className=" bg-dark min-h-screen font-outfit">
      <Header />
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
  );
}

export default App;
