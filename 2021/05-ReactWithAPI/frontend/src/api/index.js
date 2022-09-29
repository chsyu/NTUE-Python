import axios from "axios"
import { getAPIPath } from "../utils"

const URL = "http://127.0.0.1:5000/api/v1"

export const getProductById = async (productId) => {
  // REFERENCE PRODUCTS COLLECTION
  let data = await axios.get(`${URL}/products/id/${productId}`);
  return data.data;
}

export const getProducts = async (url) => {
  const collectionName = getAPIPath(url);
  let data;
  // QUERY PRODUCTS
  if (collectionName === "allProducts")
    data = await axios.get(`${URL}/products/all`);
  else
    data = await axios.get(`${URL}/products/${collectionName}`);
  return data.data;
}


