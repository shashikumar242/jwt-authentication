import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter,Route,Routes} from "react-router-dom";
import {Provider} from "react-redux";
import './index.css'
import App from './App.jsx';
import Dashboard from './components/Dashboard.jsx';
import store from './redux/store.js';
import ProtectedRoute from './HOC/ProtectedRoute.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
     <Route path="/" exact element={<App/>}/>

     <Route path="/dashboard" element={<ProtectedRoute>
      <Dashboard/>
      </ProtectedRoute>}/>
    </Routes>
 
    </BrowserRouter>
 </Provider>
  </StrictMode>,
)
