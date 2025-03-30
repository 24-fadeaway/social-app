import './App.css'
import {Route, Routes, } from "react-router-dom"
import Login from "@/pages/login.jsx";
import Home from "@/pages/home.jsx";
import {useContext} from "react";
import ContextProvider from "@/context/contextProvider.jsx";
import LoginProvider from "@/context/contextProvider.jsx";
import Register from "@/pages/register.jsx";



function App() {
    return (

        <LoginProvider>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/home/*" element={<Home/>} />
            <Route path={"/register"} element={<Register/>}/>
        </Routes>
        </LoginProvider>


    )
}

export default App
