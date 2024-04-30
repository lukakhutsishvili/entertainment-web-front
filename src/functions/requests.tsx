import axios from "axios";
import { updateData } from "../store/dataSlice";
import { Dispatch, UnknownAction } from "redux";

export const fetchData = async (dispatch: Dispatch<UnknownAction>) => {
  try {
    const response = await axios.get(
      "https://entertainment-web-back-production.up.railway.app/api/movies"
    );
    dispatch(updateData(response.data));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const favouritedMovies = async (
  setBookMarkedMovies: (arg: string[]) => void,
  userData: { id: any }
) => {
  try {
    const response = await axios.get(
      `https://entertainment-web-back-production.up.railway.app/api/bookMarkedMovies/${userData.id}`
    );
    setBookMarkedMovies([...response.data]);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

