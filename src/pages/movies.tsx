import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/redux";
import { Movie } from "./home";
import Input from "../components/search";
import Body from "../components/body";
import SearchBody from "../components/searchbody";
import { useBookmarkedMovies } from "../App";
import axios from "axios";

const MoviesPage = () => {
  const { bookMarkedMovies, setBookMarkedMovies } = useBookmarkedMovies();
  let data: Movie[] = useSelector((store: RootState) => store.data);
  data = data.filter((item) => item.category === "Movie");
  const [value, setvalue] = useState<string>("");
  const [submit, setSubmit] = useState<string>("");

  const updatedData = data.map((movie) => {
    const isBookmarked = bookMarkedMovies?.includes(movie._id);
    return { ...movie, isBookmarked };
  });

  const filteredData = updatedData?.filter((item) => item.category == "Movie");
  const filteredSearchData = filteredData;

  const userData: any = useSelector((store: RootState) => store.userData);

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

  return (
    <>
      <Input value={value} setvalue={setvalue} setSubmit={setSubmit}>
        Search for movies
      </Input>
      {submit.trim() !== "" ? (
        <SearchBody filteredSearchData={filteredSearchData} submit={submit} />
      ) : (
        <Body filteredData={filteredData} sendBookedMovies={sendBookedMovies}>
          Movies
        </Body>
      )}
    </>
  );
};

export default MoviesPage;
