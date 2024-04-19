import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/redux";
import { Movie } from "./home";
import Input from "../components/search";
import Body from "../components/body";
import SearchBody from "../components/searchbody";

const SeriesPage = () => {
  let data: Movie[] = useSelector((store: RootState) => store.data);
  data = data.filter((item) => item.category === "TV Series");
  const [value, setvalue] = useState<string>("");
  const [submit, setSubmit] = useState<string>("");
  const filteredData = data?.filter((item) => item.category === "TV Series");
  const filteredSearchData = filteredData;

  console.log(data);
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
        <Body filteredData={filteredData}>Movies</Body>
      )}
    </>
  );
};

export default SeriesPage;
