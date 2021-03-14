import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';

function Homepage() {
    const navBar = styled.nav `
    height: 83px;
    width: 100%
    background-color: #c5c5c8;
    `;

    return (
        <navBar>
            <img src="" alt="Logo"/>
           <a href="#">Home</a>
           <a href="#">Categories</a>
           
        </navBar>
    )
}


export default Homepage;