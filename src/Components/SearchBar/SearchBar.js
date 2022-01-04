import React from "react";
import AutoSuggest from "react-autosuggest";
import { Link } from "react-router-dom";

const SearchBar = ({ data, setCategory }) => {
    const [search, setSearch] = React.useState(""); // what user types in search bar
    const [suggestions, setSuggestions] = React.useState([]); // suggestions based on what user types

    // filters suggestions displayed on search bar based on user input
    const getSuggestions = (value) => {
        return data.filter(category => category?.name.toLowerCase().includes(value.toLowerCase()));
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
                    setCategory(suggestion);
                    setSearch("");
                }}
                getSuggestionValue={suggestion => suggestion}
                renderSuggestion={suggestion => <Link to={"/category/" + suggestion?.name}><span>{suggestion?.name}</span></Link>}
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