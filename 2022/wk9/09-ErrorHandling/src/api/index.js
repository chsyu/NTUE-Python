import axios from "axios"

const URL = "http://127.0.0.1:5000/api/v1"

export const getProductById = async ({ queryKey }) => {
  const [productId] = queryKey;
  let data = await axios.get(`${URL}/products/id/${productId}`);
  return data.data;
}

export const getProducts = async ({ queryKey }) => {
  const [url] = queryKey;
  let data;
  if (url === "")
    data = await axios.get(`${URL}/products/all`);
  else
    data = await axios.get(`${URL}/products/${url}`);

  return data;
}

export const signInWithEmailPassword = async ({ email, password }) => {
  return await axios.post(`${URL}/users/signin`, {
    email,
    password,
  });
};

export const registerWithEmailPassword = async ({ email, password, username }) => {
  return await axios.post(`${URL}/users/register`, {
    email,
    password,
    username,
  });
};

export const updateProfile = async ({ username, password, address, tel, access_token, user_id }) => {
  return await axios.put(
    `${URL}/users/update`,
    {
      user_id,
      username,
      password,
      address,
      tel,
    },
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
}

