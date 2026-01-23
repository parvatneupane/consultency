import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Apple from './components/apple.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Apple />
  </StrictMode>,
)
