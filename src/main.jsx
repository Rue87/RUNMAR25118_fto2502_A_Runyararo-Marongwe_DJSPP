import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'  //Added routing capability for navigating between pages
import { PodcastProvider } from './context/PodcastContext';
import { AudioProvider } from './context/AudioContext'; // Added context for audio management
import AudioPlayerBar from "./components/AudioPlayerBar";

createRoot(document.getElementById('root')).render(
<StrictMode>
<BrowserRouter>   
 <PodcastProvider>
   <AudioProvider>
    <App />
    </AudioProvider>
    </PodcastProvider>
    </BrowserRouter>
  </StrictMode>,
)
