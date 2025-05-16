import axios from "axios";
const API_URL = "http://localhost:8080/api/cart";

export const addToCart = async (foodId,token) =>{
    try {
         await axios.post(API_URL,
            {foodId},
            {headers:{Authorization: `Bearer ${token}`}});
    } catch (error) {
        console.log("error while adding the cart data",error);

    } 
}

export const removeQtyFromCart = async (foodId,token) =>{
    try {
      await  axios.post(API_URL+"/remove",{foodId},
            {headers:{Authorization:`Bearer ${token}`}
        });
        
    } catch (error) {
        console.log("error while removing qty from  cart",error);

    }
}
// cartService.js
export const getCartData = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.items;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.warn("403 Forbidden - likely due to invalid token");
    }
    console.log("error while fetching the cart data", error);
    return null; // explicitly return null on error
  }
};
