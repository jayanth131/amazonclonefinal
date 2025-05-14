import React, { useState } from 'react';
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { ShoppingBasket } from '@mui/icons-material';
import { useStateValue } from './Stateproduct';
import { auth } from './firebase';

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [searchTerm, setSearchTerm] = useState('');

  const handleAuthentication = () => {
    if (user) {
      const confirm_sign_out = window.confirm("Are you sure to sign out!");
      if (confirm_sign_out) {
        auth.signOut();
      }
    }
  };

  const handleSearchClick = () => {
    dispatch({
      type: "SET_SEARCH_TERM",
      term: searchTerm
    });
    setSearchTerm("");
  };

  return (
    <nav className="bg-black text-white w-full sticky top-0 z-50 overflow-x-auto">
      <div className="flex items-center px-4 py-2 gap-4 min-w-full justify-between">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="Amazon Logo"
            className="h-10 object-contain mt-[13px]"
          />
        </Link>

        {/* Search Bar */}
        <div className="flex items-center bg-yellow-400 rounded-md overflow-hidden flex-grow max-w-[700px] w-full">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 text-black bg-white text-sm focus:outline-none"
          />
          <button
            onClick={handleSearchClick}
            className="bg-orange-500 p-2"
          >
            <SearchIcon className="text-white" />
          </button>
        </div>

        {/* Nav Items */}
        <div className="flex items-center gap-4 ml-auto">

          {/* Account */}
          <Link to={!user && '/login'} className="flex-shrink-0">
            <div
              onClick={handleAuthentication}
              className="flex flex-col items-start text-xs cursor-pointer hover:bg-orange-500 hover:text-black px-2 py-1 rounded-md"
            >
              <span>Hello, {user ? user.displayName : 'Guest'}</span>
              <span className="font-bold">{user ? 'Sign Out' : 'Sign In'}</span>
            </div>
          </Link>

          {/* Orders */}
          <Link to="/orders" className="flex-shrink-0">
            <div className="flex flex-col items-start text-xs cursor-pointer hover:bg-orange-500 hover:text-black px-2 py-1 rounded-md">
              <span className="font-bold">My Orders</span>
            </div>
          </Link>

          {/* Basket */}
          <Link to="/checkouts" className="flex items-center flex-shrink-0">
            <ShoppingBasket />
            <span className="ml-1 font-bold text-sm">{basket.length}</span>
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Header;
