import axios from "axios"
import jsonInfo from "../json/jsonInfo.json";


const URL = "http://localhost:5000"

export const getProductById = async (productId) => {
  // REFERENCE PRODUCTS COLLECTION
  let data = await axios.get(`${URL}/products/id/${productId}`);
  return data.data;
}

export const getProducts = async (url) => {
  const collection = jsonInfo.find(element => element.url === url);
  const collectionName = collection.name || "allProducts";
  console.log(collectionName)
  let data;
  // QUERY PRODUCTS
  if (collectionName === "allProducts")
    data = await axios.get(`${URL}/products`);
  else
    data = await axios.get(`${URL}/products/${collectionName}`);
  return data.data;
}


