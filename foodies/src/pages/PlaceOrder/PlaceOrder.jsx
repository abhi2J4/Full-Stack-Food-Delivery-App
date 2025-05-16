// import React, { useContext, useState } from 'react';
// import "./PlaceOrder.css"
// import { assests } from './../../assets/assets';
// import { StoreContext } from './../../context/StoreContext';
// import { calculateCartTotala } from '../../util/cartUtils';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import {RAZORPAY_KEY} from '../../util/contants';
// import { useNavigate } from 'react-router-dom';
// // import Razorpay from "razorpay";

// const PlaceOrder = () => {
//   const {foodList,quantities,setQuantities,token} = useContext(StoreContext);
//   const navigate = useNavigate();

// const [data,setData] = useState({
//   firstName:'',
//   lastName:'',
//   email:'',
//   phoneNumber:'',
//   address:'',
//   state:'',
//   city:'',
//   zip:''

// });
// const onChangeHandler = (event)=>{
//   const name = event.target.name;
//   const value = event.target.value;
//   setData(data =>({...data,[name]:value}));
// }

// const onSubmitHandler = async (event)=>{
//   event.preventDefault();
//   const orderData ={
//     userAddress:`${data.firstName} ${data.lastName} ${data.address},${data.city},${data.state},${data.zip}`,
//     phoneNumber:data.phoneNumber,
//     email:data.email,
//     // orderedItems:cartItems.map(item =>({
//     //   foodId:item.foodId,
//     //   quantities:quantities[item.id],
//     //   price:item.price * quantities[item.id],
//     //   category:item.category,
//     //   imageUrl:item.imageUrl,
//     //   description:item.description,
//     //   name:item.name
//     // })),

// //     orderedItems: cartItems.map(item => ({
// //   foodId: item.foodId,
// //   quantities: quantities[item.id],
// //   price: parseFloat(item.price) * quantities[item.id], // ✅ FIXED HERE
// //   category: item.category,
// //   imageUrl: item.imageUrl,
// //   description: item.description,
// //   name: item.name
// // })),

// orderedItems: cartItems.map(item => ({
//   foodId: item.foodId,
//   quantities: quantities[item.id],
//   price: parseFloat(item.price) * quantities[item.id],  // Ensure the price is a numeric value
//   category: item.category,
//   imageUrl: item.imageUrl,
//   description: item.description,
//   name: item.name
// })),


//     amount: total.toFixed(2),
//     orderStatus:"Preparing"
//   };
//   try {
//   //  const response = await  axios.post("http://localhost:8080/api/orders/create",orderData,{headers:{'Authorization':`Bearer ${token}`}});

//   const response = await axios.post("http://localhost:8080/api/orders/create", orderData, {
//   headers: { 'Authorization': `Bearer ${token}` }
// });
// console.log("Token used in request:", token);

// if(response.status === 201 && response.data.razorpayOrderId){
//   // initiateRazorpaypayment
//   initiateRazorpayPayment(response.data);

// }else{
//   toast.error("unable to place order .please try again");
// }
//   } catch (error) {
//     toast.error("unable to place order .please try again");
// }
//   };
//   const initiateRazorpayPayment = (order) =>{
//     const options ={
//  key:RAZORPAY_KEY,
//  amount:order.amount , // convert to paise
// currency:"INR",
// name:"Food Land",
// description:"food order payment",
// order_id:order.razorpayOrderId,
// handler: async function(razorpayResponse){
// await verifyPayment(razorpayResponse);
// },
// prefill:{
//   name:`${data.firstName}${data.lastName}`,
//   email:data.email,
//   contact:data.phoneNumber
// },
// them:{color:'#3399cc'},
// modal:{
//   ondismiss: async function(){
//     toast.error("Payment cancelled.");
//     await deleteOrder(order.id);
//   }
// }
//     };
//     const razorpay = new window.Razorpay(options);
//     razorpay.open(); 
//   };
//   const verifyPayment = async(razorpayResponse)=>{
//     const paymentData = {
//       razorpay_payment_id:razorpayResponse.razorpay_payment_id,
//       razorpay_order_id:razorpayResponse.razorpay_order_id,
//       razorpay_signature:razorpayResponse.razorpay_signature
//     };
//     try {
//       const response = await axios.post("http://localhost:8080/api/orders/verify",paymentData,{headers: {"Authorization":`Bearer ${token}`}});
//     if (response.status === 200) {
//       toast.success('payment successful');
//       await clearCart();
//       navigate("/myorders");
//     }else{
//       toast.error("payment faild . please try again");
//       navigate("/");
//     }
//     } catch (error) {
//       toast.error("payment faild . please try again");
  
//     }
//   }

//   const deleteOrder = async (orderId) =>{
//     try {
//     await  axios.delete("http://localhost:8080/api/orders/"+orderId,{headers: {'Authorization':`Bearer ${token}`}});
//     } catch (error) {
//       toast.error("Something went wrong.Contact Support")
//     }
//   }
// const clearCart = async() =>{
//   try {
//    await  axios.delete("http://localhost:8080/api/cart", {headers:{'Authorization':`Bearer ${token}`}});
//  setQuantities({});
//   } catch (error) {
//     toast.error("Error while clearing the cart.");
//   }
// }

// // cart items
//   const cartItems = foodList.filter(food => quantities[food.id] > 0);
     
//   // calcualting 
//   const {subtotal,shipping,tax,total} = calculateCartTotala(
//     cartItems,
//     quantities
//   );
//   return (
//     <div className='container mt-4'>
//         <main>
//         <div className="py-5 text-center">
//       <img className="d-block mx-auto mb-4" src={assests.logo} alt="" width="98" height="98"/>
//     </div>

//     <div className="row g-5">
//       <div className="col-md-5 col-lg-4 order-md-last">
//         <h4 className="d-flex justify-content-between align-items-center mb-3">
//           <span className="text-primary">Your cart</span>
//           <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
//         </h4>
//         <ul className="list-group mb-3">
//          {cartItems.map(item =>(
//           //  <li className="list-group-item d-flex justify-content-between lh-sm">
// <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm">


//            <div>
//              <h6 className="my-0">{item.name}</h6>
//              <small className="text-body-secondary">Qty: {quantities[item.id]}</small>
//            </div>
//            <span className="text-body-secondary">&#8377;{item.price * quantities[item.id]}</span>
//          </li>
//          ))}
//           <li className="list-group-item d-flex justify-content-between lh-sm">
//             <div>
//                <span>Shipping</span>
//             </div>
//             <span className="text-body-secondary">&#8377;{subtotal === 0 ? 0.0 : shipping.toFixed(2)}</span>
//           </li>
//            <li className='list-group-item d-flex justify-content-between'>
//          <div>
//          <span >Tax (10%)</span>
//          </div>
//          <span className='text-body-secondary'>&#8377;{tax.toFixed(2)}</span>
//          </li>

//           <li className="list-group-item d-flex justify-content-between">
//             <span>Total (INR)</span>
//             <strong>&#8377;{total.toFixed(2)}</strong>
//           </li>
//         </ul>
//       </div>
//       <div className="col-md-7 col-lg-8">
//         <h4 className="mb-3">Billing address</h4>
//         <form className="needs-validation" onSubmit={onSubmitHandler}>
//           <div className="row g-3">
//             <div className="col-sm-6">
//               <label form="firstName" className="form-label">First name</label>
//               <input type="text" className="m-control" id="firstName" placeholder="Abhi"  required
//               name='firstName'
//               onChange={onChangeHandler}
//               value={data.firstName}/>
             
//             </div>

//             <div className="col-sm-6">
//               <label htmlFor="lastName" className="form-label">Last name</label>
//               <input type="text" className="form-control" id="lastName" placeholder="yadav" value={data.lastName} onChange={onChangeHandler}
//               name='lastName' required/>
             
//             </div>

//             <div className="col-12">
//               <label htmlFor="email" className="form-label">Email</label>
//               <div className="input-group has-validation">
//                 <span className="input-group-text">@</span>
//                 <input type="email" className="form-control" id="email" placeholder="Email" required
//                 name='email' onChange={onChangeHandler} value={data.email}/>
             
//               </div>
//             </div>
//             <div className="col-12">
//               <label htmlFor="address" className="form-label">Phone Number</label>
//               <input type="type" className="form-control" id="phone" placeholder="4649576879" 
//               required
//               value={data.phoneNumber} name='phoneNumber'
//               onChange={onChangeHandler}/>   
//             </div>
// <div className='col-12'>
// <label htmlFor="address" className='form-label'>
//   Address
// </label>
// <input type="text"
// className='form=control'
// id='address'
// placeholder='123 main st' 
// required 
// value={data.address}
// name='address'
// onChange={onChangeHandler}/>

// </div>

//             <div className="col-md-5">
//               <label htmlFor="state" className="form-label">State</label>
//               <select className="form-select" id="state" required
//              name='state' value={data.state} onChange={onChangeHandler} >
//                 <option value="">Choose...</option>
//                 <option>Jharkhand</option>
//               </select>
            
//             </div>

//             <div className="col-md-4">
//               <label htmlFor="city" className="form-label">city</label>
//               <select className="form-select" id="city" 
//               required name='city' value={data.city} onChange={onChangeHandler}>
//                 <option value="">Choose...</option>
//                 <option>Dhanbad</option>
//               </select>
             
//             </div>

//             <div className="col-md-3">
//               <label htmlFor="zip" className="form-label">Zip</label>
//               <input type="number" className="form-control" id="zip" placeholder="224122" 
//               name='zip'
//               value={data.zip}
//               onChange={onChangeHandler}
//               required/>  
//             </div>
//           </div>

//           <hr className="my-4"/>

//           <button className="w-100 btn btn-primary btn-lg" type="submit" disabled ={cartItems.length === 0}>Continue to checkout</button>
//         </form>
//       </div>
//     </div> 
//         </main>
//     </div>

//   );
// }
 
// export default PlaceOrder;


import React, { useContext, useState } from 'react';
import "./PlaceOrder.css";
import { assests } from './../../assets/assets';
import { StoreContext } from './../../context/StoreContext';
import { calculateCartTotala } from '../../util/cartUtils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RAZORPAY_KEY } from '../../util/contants';
import { useNavigate } from 'react-router-dom';
 



const PlaceOrder = () => {
  const { foodList, quantities, setQuantities, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    state: '',
    city: '',
    zip: ''
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    // Debugging: log the data and quantities
    console.log("Order Form Data:", data);
    console.log("Quantities:", quantities);
    
    // Prepare order data
    const orderData = {
      userAddress: `${data.firstName} ${data.lastName} ${data.address},${data.city},${data.state},${data.zip}`,
      phoneNumber: data.phoneNumber,
      email: data.email,
      orderedItems: foodList.map(item => {
        console.log("Processing item:", item); // Debugging: log each item

        // Ensure item has valid price and quantities
        const price = parseFloat(item.price);
        if (isNaN(price)) {
          console.error("Invalid price detected:", item.price); // Debugging: log invalid prices
          return null; // Skip this item
        }
        
        const quantity = quantities[item.id] || 0;
        console.log("Item price:", price, "Quantity:", quantity); // Debugging: log price and quantity

        return {
          foodId: item.foodId,
          quantities: quantity,
          price: price * quantity,  // Ensure numeric price
          category: item.category,
          imageUrl: item.imageUrl,
          description: item.description,
          name: item.name
        };
      }).filter(item => item !== null),  // Filter out invalid items

      amount: total.toFixed(2),
      orderStatus: "Preparing"
    };

    // Log the order data before making the API request
    console.log("Order Data to Send:", orderData);

    try {
      // Debugging: log the token
      console.log("Token used in request:", token);

      // API Request
      const response = await axios.post("http://localhost:8080/api/orders/create", orderData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      // Handle response
      if (response.status === 201 && response.data.razorpayOrderId) {
        // Payment initiation
        initiateRazorpayPayment(response.data);
      } else {
        toast.error("Unable to place order. Please try again.");
      }
    } catch (error) {
      toast.error("Unable to place order. Please try again.");
    }
  };

  const initiateRazorpayPayment = (order) => {
    const options = {
      key: RAZORPAY_KEY,
      amount: order.amount, // convert to paise
      currency: "INR",
      name: "Food Land",
      description: "Food order payment",
      order_id: order.razorpayOrderId,
      handler: async function (razorpayResponse) {
        await verifyPayment(razorpayResponse);
      },
      prefill: {
        name: `${data.firstName}${data.lastName}`,
        email: data.email,
        contact: data.phoneNumber
      },
      theme: { color: '#3399cc' },
      modal: {
        ondismiss: async function () {
          toast.error("Payment cancelled.");
          await deleteOrder(order.id);
        }
      }
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const verifyPayment = async (razorpayResponse) => {
    const paymentData = {
      razorpay_payment_id: razorpayResponse.razorpay_payment_id,
      razorpay_order_id: razorpayResponse.razorpay_order_id,
      razorpay_signature: razorpayResponse.razorpay_signature
    };

    try {
      const response = await axios.post("http://localhost:8080/api/orders/verify", paymentData, { headers: { "Authorization": `Bearer ${token}` } });
      if (response.status === 200) {
        toast.success('Payment successful');
        await clearCart();
        navigate("/myorders");
      } else {
        toast.error("Payment failed. Please try again.");
        navigate("/");
      }
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete("http://localhost:8080/api/orders/" + orderId, { headers: { 'Authorization': `Bearer ${token}` } });
    } catch (error) {
      toast.error("Something went wrong. Contact support.");
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete("http://localhost:8080/api/cart", { headers: { 'Authorization': `Bearer ${token}` } });
      setQuantities({});
    } catch (error) {
      toast.error("Error while clearing the cart.");
    }
  };

  // Cart items
  const cartItems = foodList.filter(food => quantities[food.id] > 0);

  // Calculating totals
  const { subtotal, shipping, tax, total } = calculateCartTotala(cartItems, quantities);

  // Log calculated totals for debugging
  console.log("Cart Totals:", { subtotal, shipping, tax, total });

  return (
    <div className='container mt-4'>
      <main>
        <div className="py-5 text-center">
          <img className="d-block mx-auto mb-4" src={assests.logo} alt="" width="98" height="98" />
        </div>

        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
            </h4>
            <ul className="list-group mb-3">
              {cartItems.map(item => (
                <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">{item.name}</h6>
                    <small className="text-body-secondary">Qty: {quantities[item.id]}</small>
                  </div>
                  <span className="text-body-secondary">&#8377;{item.price * quantities[item.id]}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <span>Shipping</span>
                </div>
                <span className="text-body-secondary">&#8377;{subtotal === 0 ? 0.0 : shipping.toFixed(2)}</span>
              </li>
              <li className='list-group-item d-flex justify-content-between'>
                <div>
                  <span>Tax (10%)</span>
                </div>
                <span className='text-body-secondary'>&#8377;{tax.toFixed(2)}</span>
              </li>

              <li className="list-group-item d-flex justify-content-between">
                <span>Total (INR)</span>
                <strong>&#8377;{total.toFixed(2)}</strong>
              </li>
            </ul>
          </div>

          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" onSubmit={onSubmitHandler}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label form="firstName" className="form-label">First name</label>
                  <input type="text" className="m-control" id="firstName" placeholder="Abhi" required
                    name='firstName'
                    onChange={onChangeHandler}
                    value={data.firstName} />
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">Last name</label>
                  <input type="text" className="form-control" id="lastName" placeholder="yadav" value={data.lastName} onChange={onChangeHandler}
                    name='lastName' required />
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">Email</label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">@</span>
                    <input type="email" className="form-control" id="email" placeholder="Email" required
                      name='email' onChange={onChangeHandler} value={data.email} />
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">Phone Number</label>
                  <input type="type" className="form-control" id="phone" placeholder="4649576879"
                    required
                    value={data.phoneNumber} name='phoneNumber'
                    onChange={onChangeHandler} />
                </div>

                <div className='col-12'>
                  <label htmlFor="address" className='form-label'>
                    Address
                  </label>
                  <input type="text"
                    className='form=control'
                    id='address'
                    placeholder='123 main st'
                    required
                    value={data.address}
                    name='address'
                    onChange={onChangeHandler} />
                </div>

                <div className="col-md-5">
                  <label htmlFor="state" className="form-label">State</label>
                  <select className="form-select" id="state" required
                    name='state' value={data.state} onChange={onChangeHandler}>
                    <option value="">Choose...</option>
                    <option>Jharkhand</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="city" className="form-label">City</label>
                  <select className="form-select" id="city"
                    required name='city' value={data.city} onChange={onChangeHandler}>
                    <option value="">Choose...</option>
                    <option>Dhanbad</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">Zip</label>
                  <input type="number" className="form-control" id="zip" placeholder="224122"
                    name='zip'
                    value={data.zip}
                    onChange={onChangeHandler}
                    required />
                </div>
              </div>

              <hr className="my-4" />

              <button className="w-100 btn btn-primary btn-lg" type="submit" disabled={cartItems.length === 0}>Continue to checkout</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PlaceOrder;
