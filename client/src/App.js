import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Navbar from "./components/layouts/Navbar"
import Footer from "./components/layouts/Footer"
import Contact from './components/Contact';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Shipping from './components/Shipping';
import ConfirmOrder from './components/Confirmorder';
import Paymentsuccess from './components/Paymentsuccess';
import Login from './components/Login';
import Register from './components/Register';
import OrderDetails from './components/OrderDetails';
import MyOrders from './components/MyOrders';
import Dashboard from './components/admin/Dashboard';
import Users from './components/admin/Users';
import Orders from './components/admin/Orders';
import About from './components/About';
import Notfound from './components/layouts/Notfound';
import { useEffect } from 'react';
import { loadUser } from './redux/actions/user';
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();

  const { error, isAuthenticated, loading, message, user } = useSelector(state => state.auth)


  useEffect(() => {
    dispatch(loadUser())
  }, []);

  return (
    <>
      <Router>
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route exact path={'/'} element={<Home />} />
          <Route exact path={'/contact'} element={<Contact />} />
          <Route exact path={'/about'} element={<About />} />
          <Route exact path={'/cart'} element={<Cart />} />
          <Route exact path={'/login'} element={<Login />} />
          <Route exact path={'/register'} element={<Register />} />


          <Route exact path={'/shipping'} element={isAuthenticated ? <Shipping /> : <Login />} />
          <Route exact path={'/confirmorder'} element={isAuthenticated ? <ConfirmOrder /> : <Login />} />
          <Route exact path={'/paymentsuccess'} element={isAuthenticated ? <Paymentsuccess /> : <Login />} />

          <Route exact path={'/me'} element={isAuthenticated ? <Profile /> : <Login />} />
          <Route exact path={'/myorders'} element={isAuthenticated ? <MyOrders /> : <Login />} />
          <Route exact path={'/order/:id'} element={isAuthenticated ? <OrderDetails /> : <Login />} />
          
          <Route exact path={'/admin/dashboard'} element={isAuthenticated && user.role === "admin" ? <Dashboard /> : <Login />} />
          <Route exact path={'/admin/users'} element={isAuthenticated && user.role === "admin"  ? <Users /> : <Login />} />
          <Route exact path={'/admin/orders'} element={isAuthenticated && user.role === "admin"  ? <Orders /> : <Login />} />




          <Route path={'*'} element={<Notfound />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
