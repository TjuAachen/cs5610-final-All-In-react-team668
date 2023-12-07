import {createSlice} from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        // refreshing or navigating back to the search screen remembers the result.
        searchKeyword: "",
        searchResults: [],
        searchType: "cloud-stock"
    },
    reducers: {
        updateSearchKeyword(state, action) {
            state.searchKeyword = action.payload;
            localStorage.setItem("searchKeyword", action.payload);
        },
        updateSearchResults(state, action) {
            state.searchResults = action.payload;
            localStorage.setItem("searchResults", JSON.stringify(action.payload));
        },
        updateSearchType(state, action) {
            state.searchType = action.payload;
            localStorage.setItem("searchType", action.payload);
        },
        cleanSearchReducer(state, action) {
            state.searchKeyword = "";
            state.searchResults = [];
            state.searchType = "cloud-stock";
        },
    }
});

export const {updateSearchKeyword, updateSearchResults, cleanSearchReducer} = searchSlice.actions;
export default searchSlice.reducer;