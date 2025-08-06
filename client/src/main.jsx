import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { ContextProvider } from './Users/context/userContext.jsx'
import AdminSetupContext, { AdminContext } from './Admin/Admincontext/Admin-context.jsx'



createRoot(document.getElementById('root')).render(
 
    <BrowserRouter>
    <AdminSetupContext> 
     <ContextProvider>
       <App />
      </ContextProvider>
    </AdminSetupContext>
    </BrowserRouter>
 
)
