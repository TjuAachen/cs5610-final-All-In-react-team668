import React, { useState } from 'react';
import './index.css'; // Import your CSS file here
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
    updateSearchKeyword,
    updateSearchResults, updateSearchType,
} from "../../../reducers/search-reducer";
import { getCloudStock } from '../../../services/remoteAPI-service';
import { searchLocalStocks, searchLocalWatchlists } from '../../../services/search-localAPI-service';


function SearchBox() {
    const [isActive, setIsActive] = useState(false);
    const [selectedOption, setSelectedOption] = useState('cloud-stock');
    const {searchKeyword} = useSelector(state => state.search);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");

    const toggleActive = () => {
        setIsActive(!isActive);
    };

    const handleOptionClick = (option) => {
        dispatch(updateSearchType(option));
        setSelectedOption(option);
        setIsActive(false);
    };

    // Mock data for suggestions (Replace this with your data-fetching logic)
    /*const getSuggestions = async (inputValue) => {
        const suggestions = [];
        if (selectedOption === 'cloud-stock') {
            await getAutocomplete(inputValue).then((data) => {
                data.forEach((e) => suggestions.push(e.ticker + ' | ' + e.name));
            })
        }

        return suggestions;
    };

    const onChange = (event, { newValue }) => {
        setValue(newValue);
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const inputProps = {
        placeholder: 'Search...',
        value,
        onChange,
    };*/

    const search = async (event) => {
        event.preventDefault();
        let response = [];
        dispatch(updateSearchKeyword(inputValue))
        switch (selectedOption) {
            case 'cloud-stock':
                response = await getCloudStock(searchKeyword)
                console.log(response, "debug")
                dispatch(updateSearchResults(response));
                break;
            case 'local-watchlist':
                response = await searchLocalWatchlists(searchKeyword)
                dispatch(updateSearchResults(response));
                break;           
            case 'local-stock':
                response = await searchLocalStocks(searchKeyword)
                dispatch(updateSearchResults(response));
                break;
        }
        navigate(`/search/${searchKeyword}`)
    };


    return (
        <div className="box">
            <form onSubmit={search}>
                <div className="input_box">
                    <input type="text" placeholder="Search..." 
                    value = {inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    />
                    <div className="selection" onClick={toggleActive}>
                        <p>{selectedOption}</p><span></span>
                    </div>

                    <div className={`categories ${isActive ? 'active' : ''}`}>
                        <p className="option" onClick={() => handleOptionClick('cloud-stock')}>Cloud Stock</p>
                        <p className="option" onClick={() => handleOptionClick('local-stock')}>Local Stock</p>
                        <p className="option" onClick={() => handleOptionClick('local-watchlist')}>Local Watchlist</p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SearchBox;
