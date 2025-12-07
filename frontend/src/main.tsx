import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
//import MoneyView from './views/MoneyView'
//import PainView from './views/PainView'
//import MedsView from './views/MedsView'
import TextsView from './views/TextsView'
import './index.css'

// console.log(import.meta.env.VITE_API_URL)
// console.log("main hi");
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
         <Route path="texts" element={<TextsView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
