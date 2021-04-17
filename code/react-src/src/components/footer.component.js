import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
/** @jsxImportSource @emotion/react */

const Navi = styled.nav`
    background-color: #222831;
    height: 6vh;
    width: 99vw;
    bottom: 0;
    color: grey;
    font-family: Arial;
`;

const GridCont = styled.div`
    display: grid;
    grid-template-columns: 0.2fr 0.2fr;
    text-align: center;
    font-size: 1.8vmin;
    grid-gap: 66vw;
    padding-top: 0.5vh;
    min-width: 100%;
`;

//Text
const GridItem1 = styled.div`
    align-content: center;
    text-align: center;
    width: 10vw;
`;
const GridItem2 = styled.div`
    align-content: center;
    text-align: center;
    width: 22vw;
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