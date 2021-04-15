import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { useStoreActions, useStoreState } from 'easy-peasy';

/** @jsxImportSource @emotion/react */

import Hyperlink from './style-components/hyperlink.component';
import Searchbar from './style-components/searchbar.component';

function NavBar() {

    const myaccount = useStoreState((state) => state.myAccount);
    const checkLogin = useStoreActions((actions) => actions.checkLogin);
    const logout = useStoreActions((actions) => actions.logout);

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
        grid-template-columns: auto auto auto 6vw  35vw auto auto 0vw;
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
        width: 100px;
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
    //Login
    const EndGridItem = styled.div`
        width: 150px;
        height: 4vh;
        position: relative;
        right: 0;
        margin-left: 3vw;
        margin-top: 0.5vh;

    `;

     //Check if user is admin
    var checkAdmin = "";
    if (myaccount.account?.admin === true) {
        checkAdmin = <Link to={"/admin"}> <Hyperlink text={"Admin"}/></Link>;
    }else{
        checkAdmin = "";
    }

    //Login validation.
    var checkCanPost = "";
    var checkLoggedIn = "";
    var checkLogout = "";
    if (Object.keys(myaccount).length === 0) { //not logged in
        checkLogout = <Link to={"/login"}><Hyperlink text={"Login"}/></Link>;
    }else{ //logged in
        checkCanPost = <Link to={"/createpost"}> <Hyperlink text={"+ Post"}/></Link>;
        checkLoggedIn = <Link to={"/myaccount"}><Hyperlink text={"My Account"}/></Link>;
        checkLogout = <Link onClick={()=> logout()}><Hyperlink text={"Logout"}/></Link>
    }


    //inline css
    //css={{ backgroundColor: 'green'}}


    // <img src="../resources/newPost_200.png" alt="Create a Post" />

    return (
        <Navi>
            <GridCont>
                <ImgGridItem>
                    <img src="https://media.2oceansvibe.com/wp-content/uploads/2014/08/o-DIRTY-BIRD-FRIED-CHICKEN-570.jpg" alt="Logo" />   
                </ImgGridItem>
                <TextGridItem>
                    <Link to={"/"}><Hyperlink text={"Home"}/></Link>
                </TextGridItem>
                <TextGridItem>
                    <Link to={"/posts"}><Hyperlink text={"Genres"}/></Link>
                </TextGridItem>
                <TextGridItem class="add">
                {checkCanPost}
                </TextGridItem>
                <SearchGridItem>
                    <Searchbar type= {"text"} placeholder={"Search"}/>
                </SearchGridItem>
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