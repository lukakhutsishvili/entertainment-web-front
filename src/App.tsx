import { useState, createContext, useContext, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Login, Register } from "./pages";
import Home from "./pages/home";
import MoviesPage from "./pages/movies";
import SeriesPage from "./pages/serials";
import BookmarkedMoviesPage from "./pages/bookmarked";
import Header from "./components/header";
import { fetchData } from "./functions/requests";
import { useDispatch } from "react-redux";
import VerificationPage from "./pages/verified";

type createContextType = {
  bookMarkedMovies: string[];
  setBookMarkedMovies: React.Dispatch<string[]>;
};

// Create a context to hold the bookMarkedMovies state
const BookmarkedMoviesContext = createContext<createContextType>({
  bookMarkedMovies: [],
  setBookMarkedMovies: () => {},
});

function App() {
  const location = useLocation();
  const [bookMarkedMovies, setBookMarkedMovies] = useState<string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(dispatch);
  }, []);

  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";
  const isverified = location.pathname === "/verified";

  return (
    <div
      className={`${
        isLogin || isRegister || isverified ? "lg:block" : "lg:flex"
      } md:pt-6 bg-dark min-h-screen font-outfit`}
    >
      <Header />
      {/* Provide the bookMarkedMovies state to all components */}
      <BookmarkedMoviesContext.Provider
        value={{ bookMarkedMovies, setBookMarkedMovies }}
      >
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/series" element={<SeriesPage />} />
            <Route path="/bookedMovies" element={<BookmarkedMoviesPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verified" element={<VerificationPage />} />
          </Routes>
        </div>
      </BookmarkedMoviesContext.Provider>
    </div>
  );
}

// Custom hook to consume the bookMarkedMovies context
export function useBookmarkedMovies() {
  return useContext(BookmarkedMoviesContext);
}

export default App;
