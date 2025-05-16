

// import React, {  useEffect, useState } from 'react';
// import axios from 'axios';
// import { assests } from '../../assets/assets';

// const Order = () => {

//     const [data, setData] = useState([]);

//     const fetchOrders = async () => {
//       const response = await axios.get("http://localhost:8080/api/orders/all"); 
// setData(response.data);
//       };

//       const updateStatus = async(event,orderId)=>{
//       const response =  await axios.patch(`http://localhost:8080/api/orders/status/${orderId}?status=${event.target.value}`)
//       if (response.status === 200) {
//         await fetchOrders();
//       }
//       };
//       useEffect(()=>{
//         fetchOrders();
//       },[]);
//     return (
//         <div className='container'>
//               <div className='py-5 row justify-content-center'>
//                   <div className='col-11 card'>
//                       <table className='table table-responsive'>
//                           <tbody>
//                               {
//                                   data.map((order,index) =>{
//                                       return(
//                                           <tr key={index}>
//                                               <td>
//                                                   <img src={assests.cart} alt="" height={48} width={48} />
//                                               </td>
//                                               <td>
//                                               <div>
//                                               {order.orderedItems.map((item,index)=>{
//                                                   if (index === order.orderedItems.length -1) {
//                                                       return item.name + " X "+item.quantity;
      
//                                                   }else{
//                                                       return item.name + " X "+item.quantity+", ";
//                                                   }
//                                               })}
//                                               </div>
//                                               <div>{order.userAddress}</div>
//                                               </td>
//                                               <td>&#x20B9;{order.amount.toFixed(2)}</td>
//                                               <td>Items:{order.orderedItems.length}</td>
//                                              <td className='fw-bold text-capitalize'>
//                                                 &#x25cf;{order.orderStatus}
//                                              </td>
//                                               <td>
//                                                  <select className='form-control' onChange={(event) =>updateStatus(event,order.id)} 
//                                                  value={order.orderStatus}>
//                                                     <option value="food Preparing">food Preparing</option>
//                                                     <option value="out for delivery">out for delivery</option>
//                                                     <option value="Delivered">Delivered</option>
//                                                  </select>
//                                               </td>
//                                           </tr>
//                                       )
//                                   })
//                               }
//                           </tbody>
//                       </table>
//                   </div>
//               </div>
//            </div>
//     );
// };

// export default Order;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { assests } from '../../assets/assets';

const Order = () => {
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders/all");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateStatus = async (event, orderId) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/orders/status/${orderId}?status=${event.target.value}`
      );
      if (response.status === 200) {
        await fetchOrders();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 card">
          <h4 className="mb-4 mt-2">All Orders</h4>
          <table className="table table-responsive">
            <thead>
              <tr>
                <th>Image</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Total Items</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order, index) => (
                <tr key={index}>
                  <td>
                    <img src={assests.logo} alt="cart" height={48} width={48} />
                  </td>
                  <td>
                    <div>
                      {Array.isArray(order.orderedItems)
                        ? order.orderedItems.map((item, idx) => {
                            const isLast = idx === order.orderedItems.length - 1;
                            return `${item.name} X ${item.quantity}${isLast ? '' : ', '}`;
                          })
                        : "No items"}
                    </div>
                    <div className="text-muted small">{order.userAddress}</div>
                  </td>
                  <td>₹{order.amount.toFixed(2)}</td>
                  <td>{order.orderedItems ? order.orderedItems.length : 0}</td>
                  <td className="fw-bold text-capitalize">
                    ● {order.orderStatus}
                  </td>
                  <td>
                    <select
                      className="form-control"
                      onChange={(event) => updateStatus(event, order.id)}
                      value={order.orderStatus}
                    >
                      <option value="food Preparing">Food Preparing</option>
                      <option value="out for delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-3">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
