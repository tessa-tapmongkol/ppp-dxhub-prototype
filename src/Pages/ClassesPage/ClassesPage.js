import React from "react";
import { Link } from "react-router-dom";

const ClassesPage = ({ group, setClass }) => {
    var classes = group.classes;
    
    return (
        <body>
            <Link to="/"><button className="searchButton">Back to search</button></Link>
            <br />
            <br />
            <h1>{group.name}</h1>
            <h2>Classes</h2>
            {classes.map(clas => {
                return (
                    <Link to={"/class/" + clas.name} key={clas.id}>
                        <p onClick={() => setClass(clas)}>{clas.name}</p>
                    </Link>
                );
            })}
        </body>
    );
}

export default ClassesPage;