import React from 'react'
import styled from '@emotion/styled';

function Searchbar(props) {

    const SearchBar = styled.input`
        border: 1px solid black;
        border-radius: 8px;
        width: 100%;
        height: 60%;
        margin-top:0.5vh;
        font-size: 2.5vmin;
    `;

    return (
        <div>
            <SearchBar type={props.type} placeholder={props.placeholder}></SearchBar>
        </div>
    )
}

export default Searchbar
