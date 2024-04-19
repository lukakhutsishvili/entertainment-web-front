import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../store/dataSlice";
import { RootState } from "../store/redux";
import Input from "../components/search";
import Carusel from "../components/carusel";
import Body from "../components/body";
import SearchBody from "../components/searchbody";

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

export type Movie = {
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
  const data: Movie[] = useSelector((store: RootState) => store.data);
  const dispatch = useDispatch();

  const filteredData = data?.filter((item) => item.isTrending === false);
  const filteredSearchData = data;

  const [value, setvalue] = useState<string>("");
  const [submit, setSubmit] = useState<string>("");

  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/movies");
      dispatch(updateData(response.data));
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
  console.log(data);

  useEffect(() => {
    fetchData();
    isLoggedIn();
  }, [navigate]);

  return (
    <>
      <Input value={value} setvalue={setvalue} setSubmit={setSubmit}>
        Search for movies or TV series
      </Input>
      {submit.trim() !== "" ? (
        <SearchBody filteredSearchData={filteredSearchData} submit={submit} />
      ) : (
        <>
          {" "}
          <Carusel data={data} />
          <Body filteredData={filteredData}>Recommended for you</Body>
        </>
      )}
    </>
  );
};

export default Home;
