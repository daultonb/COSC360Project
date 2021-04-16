import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useStoreActions } from 'easy-peasy';

import { useLocation } from 'react-router-dom';
import Posts from './posts.component';

const SearchResults = styled.div`
    margin: 10vh auto;
    width: 50%;
    padding: 2vh;
    background-color:white;
    border-radius: 10px;
`;

function Search() {
    const searchPosts = useStoreActions((actions) => actions.searchPosts);
    const location = useLocation();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(async () => {
        const searchString = location.pathname.split("/")[2];
        if (!searchString) {
            setShowAlert(true);
            return;
        }
        const posts = await searchPosts(searchString);
        if (posts === 0) {
            setShowAlert(true);
        }
    }, [location]);

    return (
        <SearchResults>
            <h2>Search: {location.pathname.split("/")[2]}</h2>
            {showAlert ? "No search results found" : <Posts></Posts>}
        </SearchResults>
    )
}

export default Search;
