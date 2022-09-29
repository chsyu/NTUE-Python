import axios from "axios"

const URL = "http://127.0.0.1:5000"

export const getProductById = async (productId) => {
  let data = await axios.get(`${URL}/products/id/${productId}`);
  return data.data;
}

export const getProducts = async (url) => {
  let data;
  // QUERY PRODUCTS
  if (url === "/")
    data = await axios.get(`${URL}/products`);
  else
    data = await axios.get(`${URL}/products/${url}`);

  return data;
}


