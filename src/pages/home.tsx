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
      <div className="mt-4">
        {data
          ?.filter((item) => item.isTrending === true)
          .map((item, index) => (
            <div key={index}></div>
          ))}
      </div>
    </>
  );
};

export default Home;
