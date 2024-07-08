
import Navbar from "./navbar/Navbar"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./Home/Home"

const App = () => {
 
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
