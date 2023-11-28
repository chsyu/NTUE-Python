import axios from "axios";

const url =
  "https://fastapi2vercel2023.vercel.app/homeworks";

export const getHomeWorks = async () => {
   try {
      const response = await axios.get(`${url}/all`);
      return response.data;
   } catch (err) {
      console.log(err);
   }
}

export const getHomeWorkById = async (id) => {
   try {
      const response = await axios.get(`${url}/id?id=${id}`);
      return response.data;
   } catch (err) {
      console.log(err);
   }
}