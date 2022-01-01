import React from "react";
import { Link } from "react-router-dom";

function HeadingsPage({ clas, setHeading }) {    
    var headings = clas.headings;

    return (
        <body>
            <Link to="/"><button className="searchButton">Back to search</button></Link>
            <br />
            <br />
            <h1>{clas.name}</h1>
            <h2>Headings</h2>
            {headings.map(heading => {
                return (
                    <Link to={"/name/" + heading.name} key={heading.name}>
                        <p onClick={() => setHeading(heading)}>{heading.name}</p>
                    </Link>
                );
            })}
        </body>
    );
}

export default HeadingsPage;