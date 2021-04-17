import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
/** @jsxImportSource @emotion/react */

const Navi = styled.nav`
    background-color: #222831;
    height: 6vmin;
    width: 99vw;
    bottom: 0;
    color: grey;
    font-family: Arial;
`;

const GridCont = styled.div`
    display: grid;
    grid-template-columns: 48vw 48vw;
    text-align: center;
    font-size: 1.8vmin;
    grid-gap: 3vw;
    
`;

//Text
const GridItem1 = styled.div`
    align-content: center;
    text-align: center;
    width: 15vw;
    height:5vh;
`;
const GridItem2 = styled.div`
    text-align: center;
    height:5vh;
`;

function Footer() {


    return (
        <Navi>
            <GridCont>
                <GridItem1>
                    <p>COSC 360 Project</p>
                </GridItem1>
                <GridItem2>
                    <p>DDR&trade; Damyn Fillipuzzi, Daulton Baird, Ross Morrison</p>
                </GridItem2>
            </GridCont>
        </Navi>
    )
}


export default Footer;