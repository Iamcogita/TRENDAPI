import React from "react";
import TrendingQueries from "./TrendingQueries.tsx";
import './App.css';

const App = () => {
    return (
    <>
        <TrendingQueries >;
            <a href="http://localhost:4000/trends"> CLICK HERE IF FAILED TO LOAD </a>
            <p>To get a raw Json file from google trends Api</p>
        </TrendingQueries >
    </>
    )
}

export default App;