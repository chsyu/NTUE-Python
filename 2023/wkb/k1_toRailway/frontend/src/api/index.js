import axios from "axios";

const url =
  "https://ntuedtdpy2023.up.railway.app/homework";

export const getHomeWorks = async () => {
   try {
      const response = await axios.get(url);
      return response.data;
   } catch (err) {
      console.log(err);
   }

}