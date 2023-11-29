import axios from "axios";

const url =
  "https://fastapi2vercel2023.vercel.app/homeworks";


// const url =
//   "http://127.0.0.1:5000/homeworks";

export const getHomeWorks = async () => {
   try {
      const response = await axios.get(`${url}/all`);
      return response.data;
   } catch (err) {
      console.log(err);
   }
}

export const getHomeWorksByFilter = async (filter, type) => {
   try {
      if (type === "semester") {
         const response = await axios.get(`${url}/semester?semester=${filter}`);
         return response.data;
      } else {
         const response = await axios.get(`${url}/school?school=${filter}`);
         return response.data;
      }
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

export const updateClkCnt = async (id) => {
   try {
      const response = await axios.put(`${url}/update/clkCnt/${id}`);
      return response.data;
   } catch (err) {
      console.log(err);
   }
}