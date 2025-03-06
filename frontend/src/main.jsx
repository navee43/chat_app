import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
// import store from './store'; 
import {HelmetProvider} from 'react-helmet-async'

import frontRoutes from './FrontendRoutes.jsx';
import store from '../src/redux/store.js'





createRoot(document.getElementById('root')).render(
  <StrictMode>
 <HelmetProvider>
    <Provider store={store}>
      <RouterProvider router={frontRoutes} />
    </Provider> 
    </HelmetProvider>
  </StrictMode>
);
