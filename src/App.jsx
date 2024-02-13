import './App.css'
import './index.css'
import {Routes,Route} from "react-router-dom";
import Home from './routes/Home'
function App() {

  return (
    <div className='gradient-bg-welcome'>
     <Routes>
    <Route path="/" element={<Home />}  exact />
    </Routes>
    </div>
  )
}

export default App
