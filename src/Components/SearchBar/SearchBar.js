import React from "react";
import AutoSuggest from "react-autosuggest";
import { Link } from "react-router-dom";
import { styleCategory } from "./../../constants/stringFunctions"
import { categories } from "./../../constants/subcategoryitems";

function SearchBar(props) {
    const [search, setSearch] = React.useState("");
    const [suggestions, setSuggestions] = React.useState([]);

    function getSuggestions(value) {
        return categories.filter(category => category.toLowerCase().includes(value.toLowerCase()));
    }

    return (
        <div>
            <AutoSuggest
                suggestions={suggestions}
                onSuggestionsClearRequested={() => setSuggestions([])}
                onSuggestionsFetchRequested={({ value }) => {
                    setSearch(value);
                    setSuggestions(getSuggestions(value))
                }}
                onSuggestionSelected={(_, { suggestion }) => {
                    props.setCategory(suggestion.toLowerCase());
                    setSearch("");
                }}
                getSuggestionValue={suggestion => suggestion}
                renderSuggestion={suggestion => <Link to={"/subcategories/" + suggestion.toLowerCase()}><span>{styleCategory(suggestion)}</span></Link>}
                inputProps={{
                    placeholder: "Search category",
                    value: search,
                    onChange: (_, { newValue, method }) => {
                        setSearch(newValue);
                    } 
                }}
            />
        </div>
    );
}

export default SearchBar;