import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/redux";
import { Movie } from "./home";
import Input from "../components/search";
import SearchBody from "../components/searchbody";
import Body from "../components/body";

const BookmarkedMoviesPage = () => {
  let data: Movie[] = useSelector((store: RootState) => store.data);
  const moviesfilteredData = data
    .filter((item) => item.isBookmarked === true)
    .filter((item) => item.category === "Movie");
  const seriesfilteredData = data
    .filter((item) => item.isBookmarked === true)
    .filter((item) => item.category === "TV Series");
  const [value, setvalue] = useState<string>("");
  const [submit, setSubmit] = useState<string>("");
  const filteredSearchData = data.filter((item) => item.isBookmarked === true);

  console.log(data);
  return (
    <>
      <Input value={value} setvalue={setvalue} setSubmit={setSubmit}>
        Search for bookmarked shows
      </Input>
      {submit.trim() !== "" ? (
        <SearchBody filteredSearchData={filteredSearchData} submit={submit} />
      ) : (
        <>
          <Body filteredData={moviesfilteredData}>Bookmarked Movies</Body>
          <Body filteredData={seriesfilteredData}>Bookmarked TV Series</Body>
        </>
      )}
    </>
  );
};

export default BookmarkedMoviesPage;
