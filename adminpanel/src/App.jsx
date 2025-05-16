import React, { useState } from 'react';
import Addfood from './pages/Addfood/Addfood';
import Listfood from './pages/Listfood/Listfood';
import Order from './pages/Orders/order';
import Sidebar from './components/sidebar/sidebar';
import Menubar from './components/menubar/menubar';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';


const App = () => {
  const [sidebarVisible,setSidebarVisible]  = useState(true);

  const  toggleSidebar = () =>{
    setSidebarVisible (!sidebarVisible);
  }
  return (

    <div className="d-flex" id="wrapper">
 
 <Sidebar sidebarVisible={sidebarVisible}/>
    
    <div id="page-content-wrapper">
        
     <Menubar toggleSidebar={toggleSidebar}/>
     <ToastContainer/>
       
        <div className="container-fluid">
          <Routes>
<Route path='/add' element={<Addfood/>}/>
<Route path='/list' element={<Listfood/>}/>
<Route path='/orders' element={<Order/>}/>
<Route path='/' element={<Listfood/>}/>
          </Routes>
        </div>
    </div>
</div>
  );
}

export default App;
