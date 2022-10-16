import axios from "axios"

const URL = "http://127.0.0.1:5000"

export const getProductById = async ({ queryKey }) => {
  const [productId] = queryKey;
  // REFERENCE PRODUCTS COLLECTION
  let data = await axios.get(`${URL}/products/id/${productId}`);
  return data.data;
}

export const getProducts = async ({ queryKey }) => {
  const [url] = queryKey;
  let data;
  // QUERY PRODUCTS
  if (url === "")
    data = await axios.get(`${URL}/products/all`);
  else
    data = await axios.get(`${URL}/products/${url}`);

  return data;
}

export const signInWithEmailPassword = async ({email, password}) => {
  // try {
    let res = await axios.post(`${URL}/users/signin`, { email, password });
    return res;
  // } catch (err) {
  //   console.log('err in api = ')
  //   console.log(err)
  //   return { status: err.response.status, detail: err.response.data.detail };
  // }
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

export const updateProfile = async (username, password, address, tel, access_token, user_id) => {
  try {
    let res = await axios.put(
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
    return { status: res.status, user: res.data };
  } catch (err) {
    return { status: err.response.status, detail: err.response.data.detail };
  }
}

