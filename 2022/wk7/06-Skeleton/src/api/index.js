import axios from "axios"

const URL = "https://fastapi4railway2022-production.up.railway.app"

export const getProductById = async (productId) => {
  // REFERENCE PRODUCTS COLLECTION
  let data = await axios.get(`${URL}/products/id/${productId}`);
  return data.data;
}

export const getProducts = async (url) => {
  let data;
  // QUERY PRODUCTS
    if (url === "")
      data = await axios.get(`${URL}/products/all`);
    else
      data = await axios.get(`${URL}/products/${url}`);

  return data;
}


