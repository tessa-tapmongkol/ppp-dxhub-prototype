import React from "react";
import { Link } from "react-router-dom";
import { styleCategory, styleSubcategory } from "../../constants/stringFunctions";
import { oils_fats, milk_cheese, meat, fish_seafood } from "../../constants/subcategoryitems";

function SubCategoriesPage(props) {
    var subcategories;
    if(props.category === "oils_fats") {
        subcategories = oils_fats;
    } else if (props.category === "milk_cheese_eggs") {
        subcategories = milk_cheese;
    } else if (props.category === "meat") {
        subcategories = meat;
    } else if (props.category === "fish_seafood") {
        subcategories = fish_seafood;
    }

    return (
        <body>
            <Link to="/"><button className="searchButton">Back to search</button></Link>
            <h1>{styleCategory(props.category)}</h1>
            <h2>Subcategories</h2>
            {subcategories.map(subcategory => {
                return <Link to={"/compare/" + subcategory} key={subcategory}><p onClick={(event) => props.setSubcategory(event?.target?.textContent)}>{styleSubcategory(subcategory)}</p></Link>
            })}
        </body>
    );
}

export default SubCategoriesPage;