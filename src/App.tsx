import { useState, createContext, useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Login, Register } from "./pages";
import Home from "./pages/home";
import MoviesPage from "./pages/movies";
import SeriesPage from "./pages/serials";
import BookmarkedMoviesPage from "./pages/bookmarked";
import Header from "./components/header";

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

  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";

  return (
    <div
      className={`${
        isLogin || isRegister ? "lg:block" : "lg:flex"
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
