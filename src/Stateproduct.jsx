import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { auth } from './firebase'; // Make sure this is correctly imported

// 1. Create a context
export const StateContext = createContext();

// 2. Create a provider component
export const StateProvider = ({ reducer, initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log("Auth State Changed:", authUser);

      if (authUser) {
        // User is signed in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // User is signed out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

// 3. Create a custom hook to use the context easily
export const useStateValue = () => useContext(StateContext);
export default StateProvider;
