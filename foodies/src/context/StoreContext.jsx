// import { createContext, useEffect, useState } from "react";
// import { fetchFoodList } from "../service/foodService";

// import { addToCart, getCartData, removeQtyFromCart } from "../service/cartService";



// export const StoreContext = createContext(null);

// export const StoreContextProvider = (props) => {

//     const [foodList, setFoodList] = useState([]);
//     // const [quantities, setQuantities] = useState({});
//     const [quantities, setQuantities] = useState({});

//     const [token,setToken] = useState("");

//     const increaseQty = async (foodId) => {
//         setQuantities((prev) => ({ ...prev, [foodId]: (prev[foodId] || 0) + 1 }));
   
//     await addToCart(foodId, token);
      
//     }
//     const decreaseQty = async (foodId) => {
//         setQuantities((prev) => ({
//              ...prev, 
//              [foodId]: prev[foodId] > 0 ? prev[foodId] - 1 : 0 ,}));
    
//     await removeQtyFromCart(foodId, token);
        
//     };
//     const removeFromCart = (foodId) =>{
//         setQuantities((prevQuantities) =>{
//             const updatedQuantities ={...prevQuantities};
//             delete updatedQuantities[foodId];
//             return updatedQuantities;
//         });
//     };

//     const loadCartData = async (token)=>{
//       const items = await getCartData(token);
//         setQuantities(items);
//     }
//     const contextValue = {

//         foodList,
//         increaseQty,
//         decreaseQty,
//         quantities,
//         removeFromCart,
//         token,
//         setToken,
//         setQuantities,
//         loadCartData,
//     };  
//     useEffect(() => {
//         async function loadData() {
//             const data = await fetchFoodList();
//             setFoodList(data);
//             if (localStorage.getItem("token")) {
//                 setToken(localStorage.getItem("token"));
//                 await loadCartData(localStorage.getItem("token"));
//             }
//         }
//         loadData();
//     }, []);
//     return (
//         <StoreContext.Provider value={contextValue}>
//             {props.children}
//         </StoreContext.Provider>
//     );
// };


// StoreContext.jsx
import { createContext, useEffect, useState } from "react";
import { fetchFoodList } from "../service/foodService";
import { addToCart, getCartData, removeQtyFromCart } from "../service/cartService";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [token, setToken] = useState("");

  // Add to cart
  const increaseQty = async (foodId) => {
    setQuantities((prev) => ({ ...prev, [foodId]: (prev[foodId] || 0) + 1 }));
    await addToCart(foodId, token);
  };

  // Remove from cart
  const decreaseQty = async (foodId) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: prev[foodId] > 0 ? prev[foodId] - 1 : 0,
    }));
    await removeQtyFromCart(foodId, token);
  };

  // Delete item from cart
  const removeFromCart = (foodId) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[foodId];
      return updatedQuantities;
    });
  };

  // ✅ Handle token check and 403 fallback
  const loadCartData = async (token) => {
    if (!token) return;
    const items = await getCartData(token);
    if (items) {
      setQuantities(items);
    } else {
      console.warn("Token invalid or expired. Logging out...");
      localStorage.removeItem("token");
      setToken("");
      setQuantities({});
    }
  };

  // Context value
  const contextValue = {
    foodList,
    increaseQty,
    decreaseQty,
    quantities,
    removeFromCart,
    token,
    setToken,
    setQuantities,
    loadCartData,
  };

  // Load food and cart data
  useEffect(() => {
    async function loadData() {
      const data = await fetchFoodList();
      setFoodList(data);
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
    }
    loadData();
  }, []);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
