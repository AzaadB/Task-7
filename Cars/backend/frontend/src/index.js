import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CarsContextProvider} from './context/CarContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CarsContextProvider>
    <App />
    </CarsContextProvider>
  </React.StrictMode>
);
