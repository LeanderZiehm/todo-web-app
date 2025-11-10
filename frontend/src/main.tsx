import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import MoneyView from './views/MoneyView'
import PainView from './views/PainView'
import MedsView from './views/MedsView'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="money" element={<MoneyView />} />
          <Route path="pain" element={<PainView />} />
          <Route path="meds" element={<MedsView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
