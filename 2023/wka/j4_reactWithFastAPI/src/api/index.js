import axios from "axios";

const url =
  "http://127.0.0.1:5000/homework";

export const getHomeWorks = async () => {
   try {
      const response = await axios.get(url);
      return response.data;
   } catch (err) {
      console.log(err);
   }

}