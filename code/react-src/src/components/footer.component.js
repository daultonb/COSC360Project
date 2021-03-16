import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
/** @jsxImportSource @emotion/react */

function Footer() {
    
    const navHeight = 40.5;

    const FooterDiv = styled.nav`
        background-color: grey;
        height: ${navHeight}px;
        width: 100vw;
        display: flex;
        bottom: 0;
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
        <FooterDiv>
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
                </GridItem2>
                <GridItem3>
                <Link to={"/login"}css={{ textDecoration: "none"}}>Login</Link>
                </GridItem3>
            </GridCont>
        </FooterDiv>
    )
}


export default Footer;