import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';
/** @jsxImportSource @emotion/react */

function Sidebar() {
    
    const SidebarCont = styled.div`
        background-color: #c5c5c8;
        width: 15vw;
        display: inline-block;
        position: fixed;
        left: 0;
        margin-left: 10vw;
    `;

    const ContentArea = styled.div`
        margin: 10px;
    `;

    //inline css
    //css={{ backgroundColor: 'green'}}

    return (
        <div>
                <SidebarCont>
                    <ContentArea>
                        <h3>Sidebar</h3>
                        <p>This is in the sidebar</p>
                        <p>This is in the sidebar</p>
                        <p>This is in the sidebar</p>
                        <p>This is in the sidebar</p>
                        <p>This is in the sidebar</p>
                    </ContentArea>
                </SidebarCont>
        </div>
    )
}


export default Sidebar;