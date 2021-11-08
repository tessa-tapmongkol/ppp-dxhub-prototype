import React from "react";
import SearchBar from "../../Components/SearchBar/SearchBar";

function SearchPage(props) {
    return (
        <body>
            <h1>Search</h1>
            <SearchBar
                setCategory={props.setCategory}
            />
        </body>
    )
}

export default SearchPage;