import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from './firebase';

export default function Login() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [name, setname] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
  e.preventDefault();
  if (isSignIn) {
    // Sign In logic
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate('/'))
      .catch((error) => alert(error.message));
  } else {
    // Sign Up logic
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (authUser) => {
        if (authUser.user && name) {
          await updateProfile(authUser.user, {
            displayName: name,
          });
        }
        alert('Account created successfully! Please sign in.');
        setIsSignIn(true); // ✅ Switch to Sign In tab
        setemail('');
        setpassword('');
        setname('');
      })
      .catch((error) => alert(error.message));
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
              alt="Amazon Logo"
              className="h-10 mt-[4px]"
            />
          </Link>
        </div>

        {/* Tab Buttons */}
        <div className="flex mb-6 border-b border-orange-300">
          <button
            className={`flex-1 py-2 text-center font-semibold transition ${
              isSignIn ? 'border-b-4 border-orange-500 text-orange-600' : 'text-gray-500'
            }`}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 text-center font-semibold transition ${
              !isSignIn ? 'border-b-4 border-orange-500 text-orange-600' : 'text-gray-500'
            }`}
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          {isSignIn ? 'Welcome Back!' : 'Create Your Account'}
        </h2>
        <form onSubmit={handleAuth} className="space-y-4">
          {!isSignIn && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition"
          >
            {isSignIn ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Terms */}
        <p className="text-xs text-gray-600 mt-4 text-center">
          By continuing, you agree to the AMAZON  CLONE Conditions of Use & Sale.
        </p>
      </div>
    </div>
  );
}
