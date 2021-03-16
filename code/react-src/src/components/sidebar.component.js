import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';
/** @jsxImportSource @emotion/react */

function Sidebar() {

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

    //inline css
    //css={{ backgroundColor: 'green'}}

    return (
        <div>
                <GridCont>
                <SidebarCont>
                    <ContentArea>
                        <h3>Sidebar</h3>
                        <p>This is in the sidebar</p>
                    </ContentArea>
                </SidebarCont>
            </GridCont>
        </div>
    )
}


export default Sidebar;