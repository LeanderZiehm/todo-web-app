import { Outlet, Link } from 'react-router-dom'

console.log("app hi");
export default function App() {
  return (
    <>
      <nav>
        <Link to="/texts"> Texts</Link>
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
