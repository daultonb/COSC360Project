import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';
/** @jsxImportSource @emotion/react */

function Homepage() {

    const PageDiv = styled.div`
        background-color: #2b2b2b;
        height: 100vh;
        margin-top: -10vh; 
    `;

    const GridCont = styled.div`
        display: grid;
        grid-template-columns: auto auto;
        justify-content: space-evenly;
        height: 80vh;
        grid-gap: 33px;
        padding-top: 68px;
        padding-left: 0px;
    `;
    
    const SidebarCont = styled.div`
        background-color: #c5c5c8;
        width: 15vw;
        height: 80vh;
        display: inline-block;
        margin: auto;
    `;

    const ContentArea = styled.div`
        margin: 10px;
    `;

    const PostCont = styled.div`
        background-color: white;
        width: 60vw;
        height: 86vh;
        display: inline-block;
        margin-top: 5vh;
    `;

    //inline css
    //css={{ backgroundColor: 'green'}}

    return (
        <PageDiv>
                <GridCont>
                <SidebarCont>
                    <ContentArea>
                        <h3>Sidebar</h3>
                        <p>This is in the sidebar</p>
                    </ContentArea>
                </SidebarCont>
                <PostCont>
                    <ContentArea>
                        <h1>Post!</h1>
                        <p>This is in the main</p>
                    </ContentArea>  
                </PostCont>
            </GridCont>
        </PageDiv>
    )
}


export default Homepage;