import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/redux";
import { Movie } from "./home";
import Input from "../components/search";
import SearchBody from "../components/searchbody";
import Body from "../components/body";
import { useBookmarkedMovies } from "../App";
import axios from "axios";

const BookmarkedMoviesPage = () => {
  const { bookMarkedMovies, setBookMarkedMovies } = useBookmarkedMovies();
  const userData: any = useSelector((store: RootState) => store.userData);
  let data: Movie[] = useSelector((store: RootState) => store.data);
  const updatedData = data.map((movie) => {
    const isBookmarked = bookMarkedMovies?.includes(movie._id);
    return { ...movie, isBookmarked };
  });
  const moviesfilteredData = updatedData
    .filter((item) => item.isBookmarked === true)
    .filter((item) => item.category === "Movie");
  const seriesfilteredData = updatedData
    .filter((item) => item.isBookmarked === true)
    .filter((item) => item.category === "TV Series");
  const [value, setvalue] = useState<string>("");
  const [submit, setSubmit] = useState<string>("");

  const filteredSearchData = updatedData.filter(
    (item) => item.isBookmarked === true
  );

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
        Search for bookmarked shows
      </Input>
      {submit.trim() !== "" ? (
        <SearchBody filteredSearchData={filteredSearchData} submit={submit} />
      ) : (
        <>
          <Body
            filteredData={moviesfilteredData}
            sendBookedMovies={sendBookedMovies}
          >
            Bookmarked Movies
          </Body>
          <Body
            filteredData={seriesfilteredData}
            sendBookedMovies={sendBookedMovies}
          >
            Bookmarked TV Series
          </Body>
        </>
      )}
    </>
  );
};

export default BookmarkedMoviesPage;
