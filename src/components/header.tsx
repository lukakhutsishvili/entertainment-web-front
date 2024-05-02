import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [page, setPage] = useState<string>(
    () => localStorage.getItem("currentPage") || "home"
  );
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("currentPage", page);
  }, [page]);

  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";
  const isVerified = location.pathname === "/verified";

  if (isLogin || isRegister || isVerified) {
    return null;
  } else {
    return (
      <div className="lg:ml-7 lg:mr-9  lg:px-[28px] lg:py-8 lg:h-[960px] lg:flex-col lg:justify-normal md:rounded-[10px]  md:mx-6 p-4 flex items-center justify-between bg-darkBlue">
        <img className="w-[25px]" src="/assets/logo.svg" />
        <div className="lg:gap-10 lg:mt-[75px] lg:flex-col flex  items-center gap-6 ">
          <Link to={"/home"}>
            <img
              onClick={() => setPage("home")}
              className="w-4 h-4 md:w-5 md:h-5"
              src="/assets/icon-nav-home.svg"
              style={{
                filter: page === "home" ? "brightness(0) invert(1)" : "none",
              }}
            />
          </Link>
          <Link to={"/movies"}>
            <img
              onClick={() => setPage("movies")}
              className="w-4 h-4 md:w-5 md:h-5"
              src="/assets/icon-nav-movies.svg"
              style={{
                filter: page === "movies" ? "brightness(0) invert(1)" : "none",
              }}
            />
          </Link>
          <Link to={"/series"}>
            <img
              onClick={() => setPage("series")}
              className="w-4 h-4 md:w-5 md:h-5"
              src="/assets/icon-nav-tv-series.svg"
              style={{
                filter: page === "series" ? "brightness(0) invert(1)" : "none",
              }}
            />
          </Link>
          <Link to={"/bookedMovies"}>
            <img
              onClick={() => setPage("bookedMovies")}
              className="w-4 h-4 md:w-5 md:h-5"
              src="/assets/icon-nav-bookmark.svg"
              style={{
                filter:
                  page === "bookedMovies" ? "brightness(0) invert(1)" : "none",
              }}
            />
          </Link>
        </div>
        <div className=" lg:w-10 lg:h-10 lg:mt-auto w-[25px] h-[25px] border-[1px] flex justify-center items-center border-white rounded-[50%]">
          <img
            className="lg:w-[39px] lg:h-[39px] w-6 h-6"
            src="/assets/image-avatar.png"
          />
        </div>
      </div>
    );
  }
};

export default Header;
