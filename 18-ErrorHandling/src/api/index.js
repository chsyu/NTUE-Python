import axios from "axios";
import jsonInfo from "../json/jsonInfo.json";

const URL = "http://localhost:5000/api/v1";

export const getProductById = async (productId) => {
  // REFERENCE PRODUCTS COLLECTION
  let data = await axios.get(`${URL}/products/id/${productId}`);
  return data.data;
};

export const getProducts = async (url) => {
  const collection = jsonInfo.find((element) => element.url === url);
  const collectionName = collection.name || "allProducts";
  console.log(`getProducts API with url = ${collectionName}`);
  let data;
  // QUERY PRODUCTS
  if (collectionName === "allProducts")
    data = await axios.get(`${URL}/products/all`);
  else data = await axios.get(`${URL}/products/${collectionName}`);
  console.log("data from API = ");
  console.log(data);
  return data.data;
};

export const signInWithEmailPassword = async (email, password) => {
  try {
    let res = await axios.post(`${URL}/users/signin`, { email, password });
    return { status: res.status, user: res.data };
  } catch (err) {
    return { status: err.response.status, detail: err.response.data.detail };
  }
};

export const registerWithEmailPassword = async (email, password, username) => {
  try {
    let res = await axios.post(`${URL}/users/register`, {
      email,
      password,
      username,
    });
    return { status: res.status, user: res.data };
  } catch (err) {
    return { status: err.response.status, detail: err.response.data.detail };
  }
};
