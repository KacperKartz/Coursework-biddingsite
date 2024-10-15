import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { router } from './router.jsx';
import { Provider} from "react-redux"
import { Auth0Provider } from "@auth0/auth0-react"
import { store } from './store/store.js';



createRoot(document.getElementById('root')).render(
  <StrictMode>
<Auth0Provider
  domain={import.meta.env.VITE_AUTH0_DOMAIN}
  clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
  redirectUri={window.location.origin}>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </Auth0Provider>
  </StrictMode>,
)
