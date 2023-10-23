import axios from "axios";

const url =
  "https://script.google.com/macros/s/AKfycbzUvJmNkD6ho5dgCKL5gTLE9pcZc8wXhuxsAE5Uy17OxOBSxoZuPDC2tgdcShzRFr1g7w/exec";

export const getHomeWorks = async () => {
   try {
      const response = await axios.get(url);
      return response.data;
   } catch (err) {
      console.log(err);
   }

}