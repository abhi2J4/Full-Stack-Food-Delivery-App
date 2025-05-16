import React, { useState } from 'react';
import { assests } from './../../assets/assets';
import axios  from 'axios';
import { addFood } from '../../services/foodService';
import { toast } from 'react-toastify';

const Addfood = () => {
  const [image,setImage] = useState(false);
  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Biryani"
  });

  const OnChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data,[name]:value}));
  }

  const onSubmitHandler = async(event) =>{
    event.preventDefault();
    if (!image) {
      alert("please select an image.");
      return;
    }
  
try {
  await addFood(data,image);
  toast.success("food added successfully.")
  setData({name:"",description:"",category:"Biryani",price:""});
  setImage(null);
} catch (error) {
  toast.error("error adding food.");
}
  }
 
  return (

<div className="container ">
  <div className="mx-2 mt-2">
    <div className=" card col-md-4">
      <div className="card-body">
        <h2 className="mb-4">Add Food</h2>
        <form onSubmit={onSubmitHandler}>
  <div className="mb-3">
    <label htmlFor="image" className="form-label">
      <img src={image ? URL.createObjectURL(image): assests.upload } alt="" width={98} />
    </label>
    <input type="file" className="form-control" id="image"  hidden onChange={(e) => setImage(e.target.files[0])}/>
  </div>

  <div className="mb-3">
    <label htmlFor="name" className="form-label"> Name</label>
    <input type="text" placeholder='chicken Biryani' className="form-control" id="name" required name='name' onChange={OnChangeHandler} value={data.name}/>
  </div>

  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <textarea className="form-control" placeholder='write content here...' id="description" rows="5" required name='description' onChange={OnChangeHandler} value={data.description}></textarea>
  </div>

  <div className="mb-3">
    <label htmlFor="category" className="form-label">Category</label>
    <select name="category" id="category" className='form-control' onChange={OnChangeHandler} value={data.category}>
      <option value="Biryani">Biryani</option>
      <option value="Cake">Cake</option>
      <option value="Pizza">Pizza</option>
      <option value="Rolls">Rolls</option>
      <option value="Salad">Salad</option>
      <option value="Ice cream">Ice cream</option>
       <option value="Burger">Burger</option>
      
    </select>
  </div>

  <div className="mb-3">
    <label htmlFor="price" className="form-label"> Price</label>
    <input type="number" name="price" id="price" placeholder='&#8377;200' className='form-control' onChange={OnChangeHandler} value={data.price} />
  </div>

  <button type="submit" className="btn btn-primary">Save</button>
</form>

      </div>
    </div>
  </div>
</div>
  );
}

export default Addfood;
