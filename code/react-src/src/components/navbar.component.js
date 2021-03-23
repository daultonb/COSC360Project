import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
/** @jsxImportSource @emotion/react */

function NavBar() {
    
    const navHeight = 40.5;

    const Navi = styled.nav`
        background-color: grey;
        height: ${navHeight}px;
        width: 100vw;
        display: flex;
        position: fixed;
        top: 0;
        padding: 10px;
        a {
            text-decoration: none;
        }
        a, p {
            font-family: Arial;
            font-size: 20pt;
            
        }
    `;

    const GridCont = styled.div`
        display: grid;
        grid-template-columns: auto auto auto 550px auto;
        justify-content: space-evenly;
        height: ${navHeight}px;
        grid-gap: 1.5vw;
        padding-left: 2vw;
    `;

    const GridItem1 = styled.div`
        width: 4vw;
        height: 5vh;
        img {
            width: 30px;
        }
        margin-top: 0.5vh;
        align-content: center;
    `;
    const GridItem2 = styled.div`
        width: 30vw;
        height: 5vh;
        margin-left: 13.5vw;
    `;
    const SearchBar = styled.input`
        border: 1px solid black;
        border-radius: 8px;
        width: 100%;
        height: 60%;
        margin-top:0.5vh;
        font-size: 18pt;
    `;
    const GridItem3 = styled.div`
        width: 4vw;
        height: 5vh;
        position: relative;
        right: 0;
        margin-left: 40vw;
        margin-top: 0.5vh;

    `;

    //inline css
    //css={{ backgroundColor: 'green'}}

    return (
        <Navi>
            <GridCont>
                <GridItem1>
                    <img src="https://media.2oceansvibe.com/wp-content/uploads/2014/08/o-DIRTY-BIRD-FRIED-CHICKEN-570.jpg" alt="Logo" />   
                </GridItem1>
                <GridItem1>
                    <Link to={"/"} css={{ textDecoration: "none"}}>Home</Link>
                </GridItem1>
                <GridItem1>
                    <Link to={"/posts"} css={{ textDecoration: "none"}}>Categories</Link>
                </GridItem1>
                <GridItem2>
                    <SearchBar type= "text" placeholder="Search"/>
                </GridItem2>
                <GridItem3>
                    <Link to={"/login"}css={{ textDecoration: "none"}}>Login</Link>
                </GridItem3>
            </GridCont>
        </Navi>
    )
}


export default NavBar;