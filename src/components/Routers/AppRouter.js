import React from "react";
import {Routes, Route} from "react-router-dom";
import Navbar from "../Navbar/NavBar"
import Home from "../Home/Home";
import News from "../News/News";


const AppRouter = () => {
    return (
        <div style={{width: "100%"}}>
            <Navbar/>
            <div style={{marginTop: "75px", width: "100%"}}/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/news" element={<News/>}/>
            </Routes>
        </div>
    )
}

export default AppRouter;