import React, {useState} from 'react'
import styled from '@emotion/styled';

import Hyperlink from './hyperlink.component';

function Sidebar() {
    
    const SidebarCont = styled.div`
        background-color: #c5c5c8;
        width: 20vw;
        height: 50vh;
        display: inline-block;
        position: fixed;
        left: 8vw;
        top: 8vh;
    `;

    const ContentArea = styled.div`
        padding: 8px;
        padding-left: 4vw;
        
        p, a{
            font-size: 2.8vmin;
            text-decoration: none;
        }
        h3{
            font-size: 3.2vmin;
        }
    `;

    

    return (
        <div>
            <SidebarCont>
                <ContentArea>
                    <h3>Navigation</h3>
                        <Hyperlink href={"#"} text= {"Counter Strike: GO"}/>
                        <Hyperlink href={"#"} text= {"League of Legends"}/>
                        <Hyperlink href={"#"} text= {"Overwatch"}/>
                        <Hyperlink href={"#"} text= {"Rocket League"}/>
                        <Hyperlink href={"#"} text= {"Valorant"}/>
                </ContentArea>
            </SidebarCont>
        </div>
    )
}

export default Sidebar;