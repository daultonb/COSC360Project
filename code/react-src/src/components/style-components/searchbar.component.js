import React from 'react'
import styled from '@emotion/styled';

import { useHistory } from 'react-router-dom';

const SearchBar = styled.input`
    border: 1px solid black;
    border-radius: 5px;
    width: 100%;
    height: 3vh;
    margin-top:0.5vh;
    font-size: 2.0vmin;
    padding: 0 1vh;
    &:focus {
        outline: none;
    }
`;

function Searchbar(props) {
    const history = useHistory();

    const redirect = (searchString) => {
        history.push(`/search/${searchString}`);
    }

    const submitForm = (e) => {
        e.preventDefault();
        const searchEle = document.getElementById("searchinput");
        const searchString = searchEle.value;
        if (searchString) {
            searchEle.value = '';
            redirect(searchString);
        }
    }

    return (
        <form onSubmit={submitForm}>
            <SearchBar key="searchbarinput" id="searchinput" type={props.type} placeholder={props.placeholder}></SearchBar>
        </form>
    )
}

export default Searchbar
