import React from "react";
import { Link } from "react-router-dom";
import { styleCategory, styleSubcategory } from "../../constants/stringFunctions";
import { oils_fats, milk_cheese, meat, fish_seafood, bread_cereal, category_type, vegetables, small_electricity } from "../../constants/subcategoryitems";

function SubCategoriesPage(props) {
    var subcategories;
    if(props.category === category_type.OILS_FATS) {
        subcategories = oils_fats;
    } else if (props.category === category_type.MILK_CHEESE_EGGS) {
        subcategories = milk_cheese;
    } else if (props.category === category_type.MEAT) {
        subcategories = meat;
    } else if (props.category === category_type.FISH_SEAFOOD) {
        subcategories = fish_seafood;
    } else if (props.category === category_type.BREAD_CEREAL) {
        subcategories = bread_cereal;
    } else if (props.category === category_type.VEGETABLES) {
        subcategories = vegetables;
    } else if (props.category === category_type.SMALL_ELECTRICITY) {
        subcategories = small_electricity;
    }

    return (
        <body>
            <Link to="/"><button className="searchButton">Back to search</button></Link>
            <br />
            <br />
            <h1>{styleCategory(props.category)}</h1>
            <h2>Subcategories</h2>
            {subcategories.map(subcategory => {
                return <Link to={"/compare/" + subcategory} key={subcategory}><p onClick={(event) => props.setSubcategory(event?.target?.textContent)}>{styleSubcategory(subcategory)}</p></Link>
            })}
        </body>
    );
}

export default SubCategoriesPage;