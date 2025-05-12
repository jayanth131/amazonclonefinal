import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import { StateProvider} from './Stateproduct.jsx';
import reducer,{ initialState } from './Reducer.jsx';
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <StateProvider initialState = {initialState} reducer = {reducer}>
     <App />
     <ToastContainer />
    </StateProvider>
  // </StrictMode>,
)
