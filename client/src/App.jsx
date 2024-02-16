import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider  } from '@chakra-ui/react'
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

function App() {

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      </ChakraProvider>
  )
}


export default App
