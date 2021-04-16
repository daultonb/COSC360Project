import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { useStoreActions, useStoreState } from 'easy-peasy';

/** @jsxImportSource @emotion/react */

import Hyperlink from './style-components/hyperlink.component';
import Searchbar from './style-components/searchbar.component';


const Navi = styled.nav`
    background-color: #222831;
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
    }
`;

const GridCont = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 0.83fr 0.83fr 3fr 1fr 1fr 1fr 1fr;
    text-align: center;
    font-size: 2.4vmin;
    grid-gap: 1vw;
    padding-top: 0.5vh;
    min-width: 100%;
`;
//Icon
const ImgGridItem = styled.div`
    img {
        width: 3vh;
    }
`;
//Text
const TextGridItem = styled.div`
    align-content: center;
    padding-left: 0.3vw;
    text-align: center;
`;
//SearchBar
const SearchGridItem = styled.div`
    margin-top: -0.8vh;
`;
//Login/logout
const EndGridItem = styled.div`
    float: right;
`;

function NavBar() {

    const myaccount = useStoreState((state) => state.myAccount);
    const checkLogin = useStoreActions((actions) => actions.checkLogin);
    const logout = useStoreActions((actions) => actions.logout);

    useEffect(() => {
        checkLogin();
    }, []);

    //Check if user is admin
    var checkAdmin = "";
    if (myaccount.account?.admin === true) {
        checkAdmin = <Link to={"/admin"}> <Hyperlink text={"Admin"} /></Link>;
    } else {
        checkAdmin = "";
    }

    //Login validation.
    var checkCanPost = "";
    var checkLoggedIn = "";
    var checkLogout = "";
    if (Object.keys(myaccount).length === 0) { //not logged in
        checkLogout = <Link to={"/login"}><Hyperlink text={"Login"} /></Link>;
    } else { //logged in
        checkCanPost = <Link to={"/createpost"}> <Hyperlink text={"New Post"} /></Link>;
        checkLoggedIn = <Link to={"/myaccount"}><Hyperlink text={"My Account"} /></Link>;
        checkLogout = <Link to={"#"} onClick={() => logout()}><Hyperlink text={"Logout"} /></Link>
    }

    return (
        <Navi>
            <GridCont>
                <ImgGridItem>
                    <img src="https://media.2oceansvibe.com/wp-content/uploads/2014/08/o-DIRTY-BIRD-FRIED-CHICKEN-570.jpg" alt="Logo" />
                </ImgGridItem>
                <TextGridItem>
                    <Link to={"/"}><Hyperlink text={"Home"} /></Link>
                </TextGridItem>
                <TextGridItem>
                    <Link to={"/genres"}><Hyperlink text={"Genres"} /></Link>
                </TextGridItem>
                <SearchGridItem>
                    <Searchbar type={"text"} placeholder={"Search"} />
                </SearchGridItem>
                <TextGridItem className="add">
                    {checkCanPost}
                </TextGridItem>
                <TextGridItem>
                    {checkAdmin}
                </TextGridItem>
                <EndGridItem>
                    {checkLoggedIn}
                </EndGridItem>
                <EndGridItem>
                    {checkLogout}
                </EndGridItem>
            </GridCont>
        </Navi>
    )
}


export default NavBar;