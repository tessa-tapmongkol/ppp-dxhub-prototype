import React from "react";
import { Link } from "react-router-dom";

function GroupsPage({ category, setGroup }) {    
    var groups = category.groups;

    return (
        <body>
            <Link to="/"><button className="searchButton">Back to search</button></Link>
            <br />
            <br />
            <h1>{category.name}</h1>
            <h2>Groups</h2>
            {groups.map(group => {
                return (
                    <Link to={"/group/" + group.name} key={group.id}>
                        <p onClick={() => setGroup(group)}>{group.name}</p>
                    </Link>
                );
            })}
        </body>
    );
}

export default GroupsPage;