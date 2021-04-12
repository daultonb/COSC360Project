import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { useStoreActions, useStoreState } from 'easy-peasy';

/** @jsxImportSource @emotion/react */

function NavBar() {

    const myaccount = useStoreState((state) => state.myAccount);
    const checkLogin = useStoreActions((actions) => actions.checkLogin);

    useEffect(() => {
        checkLogin();
    }, []);

    const Navi = styled.nav`
        background-color: grey;
        height: 4vh;
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
        grid-template-columns: auto auto auto 5vw  35vw auto 0vw;
        justify-content: space-evenly;
        height: 4vh;
        grid-gap: 1vw;
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
        width: 80px;
        height: 4vh;
        margin-top: 0.5vh;
        align-content: center;
        padding-left: 0.3vw;
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
        font-size: 2.5vmin;
    `;
    //Login
    const EndGridItem = styled.div`
        width: 190px;
        height: 5vh;
        position: relative;
        right: 0;
        margin-left: 10vw;
        margin-top: 0.5vh;

    `;

    
    //Check login.
    var checkLoggedIn = "";
    if (Object.keys(myaccount).length === 0) {
        checkLoggedIn = <Link to={"/login"}css={{ textDecoration: "none"}}>Login</Link>;
    }else{
        checkLoggedIn = <Link to={"/myaccount"}css={{ textDecoration: "none"}}>My Account</Link>;
    }


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
                    <Link to={"/createpost"} css={{ textDecoration: "none"}}>+ Post</Link>
                </TextGridItem>
                <SearchGridItem>
                    <SearchBar type= "text" placeholder="Search"/>
                </SearchGridItem>
                <EndGridItem>
                    <Link to={"/admin"} css={{ textDecoration: "none"}}>Admin</Link>
                </EndGridItem>
                <EndGridItem>
                    <Link to={"/login"}css={{ textDecoration: "none"}}>{checkLoggedIn}</Link>
                </EndGridItem>
            </GridCont>
        </Navi>
    )
}


export default NavBar;