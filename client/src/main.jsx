import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'

import { ContextProvider } from './Users/context/userContext.jsx'



createRoot(document.getElementById('root')).render(
 
    <BrowserRouter>
     <ContextProvider>
      <App />
     </ContextProvider>
    </BrowserRouter>
 
)
