import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, } from "react-router-dom"
import Header from './Header'
import Home from './Home'
import './index.css'
import Payment from './Payment'
import Checkoutpage from './Checkoutpage'
import Login from './Login'
import { auth } from './firebase'
import { useStateValue } from './Stateproduct'
import {Elements} from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import Orders from './Orders'

const promise = loadStripe('pk_test_51RMY3IRiXqTdx1bzJAH7ceJWOxLkpfUOLUtKZSWUyWEClZeebpEb6mvh2HQ4zctPi1G6yk2Pl0qNNpu1lGF45VOg00i6ghxtpH')

function App() {
  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('User is >>>>>', authUser);

      if (authUser) {
        dispatch({
          type: 'SET USER',
          user: authUser,
        });
      } else {
        dispatch({
          type: 'SET USER',
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <Elements stripe={promise}> {/* ✅ Move Elements here */}
        <Routes>
          <Route path='/payment' element={<><Header /><Payment /></>} />
          <Route path='/checkouts' element={<><Header /><Checkoutpage /></>} />
          <Route path='/login' element={<Login />} />
          <Route path='/orders' element={<><Header /><Orders/></>} />
          <Route path='/' element={<><Header /><Home /></>} />
        </Routes>
      </Elements>
    </Router>
  );
}
export default App;