import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assests } from '../../assets/assets';
import './MyOrders.css';

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  // Fetch user orders from backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      console.log("Fetched orders:", response.data); 
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className='container'>
      <div className='py-5 row justify-content-center'>
        <div className='col-11 card'>
          <table className='table table-responsive'>
            <tbody>
              {
                data.length === 0 ? (
                  <tr>
                    <td colSpan="6" className='text-center text-muted'>No orders found.</td>
                  </tr>
                ) : (
                  data.map((order, index) => {
                    const items = Array.isArray(order.orderedItems) ? order.orderedItems : [];
                    return (
                      <tr key={index}>
                        <td>
                          <img
                            src={assests.cart}
                            alt="cart"
                            height={48}
                            width={48}
                          />
                        </td>
                        <td>
                          {items.map((item, i) => (
                            `${item.name} X ${item.quantity}${i === items.length - 1 ? "" : ", "}`
                          ))}
                        </td>
                        <td>&#x20B9;{order.amount?.toFixed(2)}</td>
                        <td>Items: {items.length}</td>
                        <td className='fw-bold text-capitalize'>
                          &#x25cf; {order.orderStatus}
                        </td>
                        <td>
                          <button
                            className='btn btn-sm btn-warning'
                            onClick={fetchOrders}
                          >
                            <i className='bi bi-arrow-clockwise'></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;


// import React, { useContext, useEffect, useState } from 'react';
// import { StoreContext } from '../../context/StoreContext';
// import axios from 'axios';
// import { assests } from '../../assets/assets';
// import "./MyOrders.css";
// const MyOrders = () => {
//     const {token} = useContext(StoreContext);
//     const [data,setData]= useState([]);
//     const fetchOrders = async () =>{
//        const response = await axios.get("http://localhost:8080/api/orders",{headers: {"Authorization":`Bearer ${token}`}
//     });
//         // setData(Response.data);
//         setData(response.data);
//     };
//     useEffect(() =>{
//         if (token) {
//             fetchOrders();
//         }
//     },[token]);
//   return (
//      <div className='container'>
//         <div className='py-5 row justify-content-center'>
//             <div className='col-11 card'>
//                 <table className='table table-responsive'>
//                     <tbody>
//                         {
//                             data.map((order,index) =>{
//                                 return(
//                                     <tr key={index}>
//                                         <td>
//                                             <img src={assests.cart} alt="" height={48} width={48} />
//                                         </td>
//                                         <td>{order.orderedItems.map((item,index)=>{
//                                             if (index === order.orderedItems.length -1) {
//                                                 return item.name + " X "+item.quantity;

//                                             }else{
//                                                 return item.name + " X "+item.quantity+", ";
//                                             }
//                                         })}
                                        
//                                         </td>
//                                         <td>&#x20B9;{order.amount.toFixed(2)}</td>
//                                         <td>Items:{order.orderedItems.length}</td>
//                                         <td className='fw-bold text-capitalize'>&#x25cf;{order.orderStatus}</td>
//                                         <td>
//                                             <button className='btn btn-sm btn-warning'onClick={fetchOrders}>
//                                                 <i className='bi bi-arrow-clockwise'></i>
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 )
//                             })
//                         }
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//      </div>
//   );
// }

// export default MyOrders;


// import React, { useContext, useEffect, useState } from 'react';
// import { StoreContext } from '../../context/StoreContext';
// import axios from 'axios';
// import { assests } from '../../assets/assets';

// const MyOrders = () => {
//     const { token } = useContext(StoreContext);
//     const [data, setData] = useState([]);

//     const fetchOrders = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/api/orders", {
//                 headers: {
//                     "Authorization": `Bearer ${token}`
//                 }
//             });
//             setData(response.data);
//         } catch (error) {
//             console.error("Failed to fetch orders", error);
//         }
//     };

//     useEffect(() => {
//         if (token) {
//             fetchOrders();
//         }
//     }, [token]);

//     return (
//         <div className='container'>
//             <div className='py-5 row justify-content-center'>
//                 <div className='col-11 card'>
//                     <table className='table table-responsive'>
//                         <tbody>
//                             {
//                                 data.map((order, index) => {
//                                     const items = Array.isArray(order.orderedItems) ? order.orderedItems : [];
//                                     return (
//                                         <tr key={index}>
//                                             <td>
//                                                 <img src={assests.cart} alt="" height={48} width={48} />
//                                             </td>
//                                             <td>
//   {Array.isArray(order.orderedItems) &&
//     order.orderedItems.map((item, index) => {
//       return `${item.name} X${item.quantity}${index !== order.orderedItems.length - 1 ? ', ' : ''}`;
//     })}
// </td>

//                                             <td>&#x20B9;{order.amount.toFixed(2)}</td>
//                                             <td>Items: {items.length}</td>
//                                             <td className='fw-bold text-capitalize'>&#x25cf;{order.orderStatus}</td>
//                                             <td>
//                                                 <button className='btn btn-sm btn-warning' onClick={fetchOrders}>
//                                                     <i className='bi bi-arrow-clockwise'></i>
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     );
//                                 })
//                             }
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MyOrders;
