import { Routes, Route } from 'react-router-dom'
import App from './App'
import TextsView from './views/TextsView'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="texts" element={<TextsView />} />
      </Route>
    </Routes>
  )
}
