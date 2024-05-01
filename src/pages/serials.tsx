import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/redux";
import { Movie } from "./home";
import Input from "../components/search";
import Body from "../components/body";
import SearchBody from "../components/searchbody";
import { useBookmarkedMovies } from "../App";
import axios from "axios";
import { updateUserData } from "../store/userDataSlice";

const SeriesPage = () => {
  const { bookMarkedMovies, setBookMarkedMovies } = useBookmarkedMovies();
  let data: Movie[] = useSelector((store: RootState) => store.data);
  data = data.filter((item) => item.category === "TV Series");
  const [value, setvalue] = useState<string>("");
  const [submit, setSubmit] = useState<string>("");
  const updatedData = data.map((movie) => {
    const isBookmarked = bookMarkedMovies?.includes(movie._id);
    return { ...movie, isBookmarked };
  });

  const filteredData = updatedData?.filter(
    (item) => item.category === "TV Series"
  );
  const filteredSearchData = filteredData;
  const userData: any = useSelector((store: RootState) => store.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const storedBookmarkedMovies = JSON.parse(
      localStorage.getItem("bookMarkedMovies") || "[]"
    );
    setBookMarkedMovies(storedBookmarkedMovies);
    if (userId != null) {
      dispatch(updateUserData({ id: userId }));
    }
  }, []);
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
      localStorage.setItem(
        "bookMarkedMovies",
        JSON.stringify(response.data.bookMarkedMovies)
      );
      console.log(bookMarkedMovies);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Input value={value} setvalue={setvalue} setSubmit={setSubmit}>
        Search for TV series
      </Input>
      {submit.trim() !== "" ? (
        <>
          <SearchBody filteredSearchData={filteredSearchData} submit={submit} />
        </>
      ) : (
        <Body filteredData={filteredData} sendBookedMovies={sendBookedMovies}>
          Movies
        </Body>
      )}
    </>
  );
};

export default SeriesPage;
