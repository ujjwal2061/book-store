import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import {QueryClientProvider,QueryClient} from "@tanstack/react-query"

const  queryClient= new QueryClient();

createRoot(document.getElementById('root')).render(
 
    <BrowserRouter>
     <QueryClientProvider client={queryClient} >
     <App />
     </QueryClientProvider>
    </BrowserRouter>
 
)
