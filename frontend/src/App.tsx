import { Outlet, Link } from 'react-router-dom'

export default function App() {
  return (
    <>
      <nav>
        <Link to="/money">💰 Money</Link>
        <Link to="/pain">😣 Pain</Link>
        <Link to="/meds">💊 Meds</Link>
      </nav>
      <div className="container">
        <Outlet />
      </div>
    </>
  )
}
