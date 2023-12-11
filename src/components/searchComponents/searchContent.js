import React, { useState, useEffect } from "react";
import ResultCard from "../ResultCard";
import { findCurrentUserThunk } from "../../services/users/users-thunks.js";

import {useDispatch, useSelector} from "react-redux";
import "./searchContent.css";
import {updateSearchResults} from "../../reducers/search-reducer.js";
import PaginationComponent from "../Pagination.js";
import ErrorBox from "../ErrorBox/index.js";

function SearchContent() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1); // current page
  const [resultsPerPage, setResultsPerPage] = useState(10); // ech page show 10 results
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {searchType, searchResults, searchError} = useSelector(state => state.search);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  console.log(searchType, searchError, "debug Search content")
  useEffect(() => {
   // dispatch(updateSearchResults(response));

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    dispatch(findCurrentUserThunk());
   
  }, []);

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);
  const cardSize = 400;

  let num = Math.floor(windowWidth / cardSize);
  //console.log(currentResults, "debug current results")
  return (
    <>
    {searchError && (
      <div className="justify-content-center">
    <ErrorBox errorMessage={searchError} />
    </div>
    )}
      <div className={`search-content-container`}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {currentResults.map((item) => (
              <div
                  style={{ flex: `1 0 ${100 / num}%`, maxWidth: `${100 / num}%` }}
              >
                <ResultCard item={item} type={localStorage.getItem("searchType") || searchType} />
              </div>
          ))}
          
        </div>
        <div className="d-flex justify-content-center mt-3">
          
          {/*Just simple frontend pagination, do not need to modify the backend*/}
          {currentResults.length > 0 && <PaginationComponent
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              usersPerPage={resultsPerPage}
              totalCount={searchResults.length}/>}
        </div>

      </div>
      </>
  );
}

export default SearchContent;