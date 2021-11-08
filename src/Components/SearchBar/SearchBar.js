import React from "react";
import AutoSuggest from "react-autosuggest";
import { Link } from "react-router-dom";

function SearchBar(props) {
    const [search, setSearch] = React.useState("");
    const [suggestions, setSuggestions] = React.useState([]);

    const categories = [
        "oils_fats",
        "milk_cheese_eggs",
        "meat",
        "fish_seafood"
    ];

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
                renderSuggestion={suggestion => <Link to={"/subcategories/" + suggestion.toLowerCase()}><span>{suggestion}</span></Link>}
                inputProps={{
                    placeholder: "Search category",
                    value: search,
                    onChange: (_, { newValue, method }) => {
                        setSearch(newValue);
                    } 
                }}
                className="search"
            />
        </div>
    );
}

export default SearchBar;