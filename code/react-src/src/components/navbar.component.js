import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
/** @jsxImportSource @emotion/react */

function NavBar() {
    
    const navHeight = 4;

    const Navi = styled.nav`
        background-color: grey;
        height: ${navHeight}vh;
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
            position: relative;
            font-size: 2.8vmin;
            
        }
    `;

    const GridCont = styled.div`
        display: grid;
        grid-template-columns: auto auto 10vw 0vw 27vw auto;
        justify-content: space-evenly;
        height: ${navHeight}vh;
        grid-gap: 2vw;
    `;
    //Icon
    const ImgGridItem = styled.div`
        width: 3vw;
        height: 4vh;
        img {
            width: 3vh;
        }
        margin-top: 0.5vh;
        align-content: center;
        padding-left: 2vw;
    `;
    //Text
    const TextGridItem = styled.div`
        width: 5vw;
        height: 4vh;
        margin-top: 0.5vh;
        align-content: center;
        padding-left: 0vw;
        text-align: center;
    `;
    //SearchBar
    const SearchGridItem = styled.div`
        width: 30vw;
        height: 5vh;
        margin-left: 5vw;
    `;
    const SearchBar = styled.input`
        border: 1px solid black;
        border-radius: 8px;
        width: 100%;
        height: 60%;
        margin-top:0.5vh;
        font-size: 18pt;
    `;
    //Login
    const EndGridItem = styled.div`
        width: 4vw;
        height: 5vh;
        position: relative;
        right: 0;
        margin-left: 28vw;
        margin-top: 0.5vh;

    `;

    //inline css
    //css={{ backgroundColor: 'green'}}

    return (
        <Navi>
            <GridCont>
                <ImgGridItem>
                    <img src="https://media.2oceansvibe.com/wp-content/uploads/2014/08/o-DIRTY-BIRD-FRIED-CHICKEN-570.jpg" alt="Logo" />   
                </ImgGridItem>
                <TextGridItem>
                    <Link to={"/"} css={{ textDecoration: "none"}}>Home</Link>
                </TextGridItem>
                <TextGridItem>
                    <Link to={"/posts"} css={{ textDecoration: "none"}}>Genres</Link>
                </TextGridItem>
                <TextGridItem class="add">
                    <Link to={"/posts"} css={{ textDecoration: "none"}}>+ Post</Link>
                </TextGridItem>
                <SearchGridItem>
                    <SearchBar type= "text" placeholder="Search"/>
                </SearchGridItem>
                <EndGridItem>
                <Link to={"/login"}css={{ textDecoration: "none"}}>Login</Link>
                </EndGridItem>
            </GridCont>
        </Navi>
    )
}


export default NavBar;