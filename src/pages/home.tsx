import { useEffect, useState } from "react";
import Header from "../components/header";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

type Thumbnail = {
  regular: {
    small: string;
    medium: string;
    large: string;
  };
  trending: {
    small: string;
    large: string;
  };
};

type Movie = {
  thumbnail: Thumbnail;
  _id: string;
  title: string;
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
};

const Home = () => {
  const [data, setData] = useState<Movie[] | undefined>();

  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/movies");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const isLoggedIn = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      const decoded: any = await jwtDecode(token);
      console.log(decoded);
      const isTokenExpired = (await decoded?.exp) < Date.now() / 1000;
      if (isTokenExpired) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchData();
    isLoggedIn();
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="mt-6 flex items-center pl-4 ">
        <img className=" w-[24px]" src="/assets/icon-search.svg" />
        <input
          className="border-none outline-none pl-[20px] pr-[30px] w-full text-[16px] font-light bg-transparent text-white"
          type="text"
          placeholder="Search for movies or TV series"
        />
      </div>
      <h2 className="text-[20px] font-light pl-4 mt-6 text-white">Trending</h2>
      <div className="mt-4 px-4 h-[140px]">
        {data
          ?.filter((item) => item.isTrending === true)
          .map((item, index) => (
            <div
              key={index}
              className="rounded-lg h-full bg-no-repeat flex flex-col"
              style={{
                backgroundImage: `url(${item.thumbnail.trending.small})`,
                backgroundSize: "100% 100% ",
              }}
            >
              <div className="w-8 h-8 mt-2 ml-auto mr-2 flex items-center justify-center bg-bookmarkDiv rounded-[50%]">
                <img src="/assets/icon-bookmark-empty.svg" />
              </div>
              <div className="text-[12px] font-normal text-white opacity-[0.75] flex mt-[46px] gap-[9px] items-center ml-4">
                <p>{item.year}</p>
                <div className="rounded-[50%] bg-white w-[3px] h-[3px] opacity-[0.5]"></div>
                <div className="flex items-center">
                  <img
                    className="w-[12px] h-[12px]"
                    src="/assets/icon-nav-movies.svg"
                  />
                  <span className="ml-[6px]">{item.category}</span>
                </div>
                <div className="rounded-[50%] bg-white w-[3px] h-[3px] opacity-[0.5]"></div>
                <p>{item.rating}</p>
              </div>
              <h3 className="text-[15px] font-medium ml-4 mt-1 text-white">
                {item.title}
              </h3>
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
