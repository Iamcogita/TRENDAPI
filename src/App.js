import React from "react";
import TrendingQueries from "./TrendingQueries.tsx";

const App = () => {
    return (
    <>
        <TrendingQueries />
        <br/>
        <span class="green-background">IF FAILED TO LOAD:</span>
        <p/>
        <a href="http://localhost:4000/trends"> Click here for a Json from google trends api </a>
    </>
    )
}

export default App;