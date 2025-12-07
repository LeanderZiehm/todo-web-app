import { Outlet, Link } from 'react-router-dom'
import { insertText } from './services/api';
import MyForm from './components/MyForm';

console.log("hi app.tsx");

export default function App() {
  return (
    <>
      <nav>
        <Link to="/texts"> Texts</Link>
      </nav>
      <div className="container">
        hello
      <MyForm submitFunction={insertText}/>
         <Outlet /> 
      </div>
    </>
  )
}
