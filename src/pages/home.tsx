import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { updateData } from "../store/dataSlice";
import { RootState } from "../store/redux";
import Input from "../components/search";
import Carusel from "../components/carusel";
import Body from "../components/body"; // Import the Body component
import SearchBody from "../components/searchbody";
import { favouritedMovies, fetchData } from "../functions/requests";
import { useBookmarkedMovies } from "../App";

// Define the Movie type and Thumbnail type
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
  // Function to send bookmarked movies
  const { bookMarkedMovies, setBookMarkedMovies } = useBookmarkedMovies();

  const sendBookedMovies = async (item: Movie) => {
    try {
      const response = await axios.post(
        "https://entertainment-web-back-production.up.railway.app/api/sendBookmarkedMovies",
        {
          id: userData.id,
          movies: item._id,
        }
      );
      setBookMarkedMovies([...response.data.bookMarkedMovies]);
      console.log(bookMarkedMovies);
    } catch (error) {
      console.log(error);
    }
  };

  // Redux state access
  const data: Movie[] = useSelector((store: RootState) => store.data);
  const userData: any = useSelector((store: RootState) => store.userData);
  const dispatch = useDispatch();

  // Function to update isBookmarked property based on bookMarkedMovies
  const updatedData = data.map((movie) => {
    const isBookmarked = bookMarkedMovies?.includes(movie._id);
    return { ...movie, isBookmarked };
  });

  // Filtered data
  const filteredData = updatedData?.filter((item) => item.isTrending === false);
  const filteredSearchData = updatedData;

  // State for search value
  const [value, setvalue] = useState<string>("");
  const [submit, setSubmit] = useState<string>("");

  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = await jwtDecode(token);
      const isTokenExpired = (await decoded?.exp) < Date.now() / 1000;
      if (isTokenExpired) {
        navigate("/login");
      }
    }
  };

  // Fetch data and check login status on component mount
  useEffect(() => {
    fetchData(dispatch);
    isLoggedIn();
    favouritedMovies(setBookMarkedMovies, userData);
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
          <Carusel data={updatedData} sendBookedMovies={sendBookedMovies} />
          <Body filteredData={filteredData} sendBookedMovies={sendBookedMovies}>
            Recommended for you
          </Body>
        </>
      )}
    </>
  );
};

export default Home;
