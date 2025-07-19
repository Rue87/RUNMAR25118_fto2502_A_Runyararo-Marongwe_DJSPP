import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'  //Added routing capability for navigating between pages
import { PodcastProvider } from './context/PodcastContext';

createRoot(document.getElementById('root')).render(
<StrictMode>
<BrowserRouter>   
 <PodcastProvider>
    <App />
    </PodcastProvider>
    </BrowserRouter>
  </StrictMode>,
)
