import React from "react";
import SearchBar from "../../Components/SearchBar/SearchBar";

const SearchPage = ({ setCategory, data }) => {
    return (
        <body>
            <h1>Search</h1>
            <SearchBar
                data={data}
                setCategory={setCategory}
            />
        </body>
    )
}

export default SearchPage;