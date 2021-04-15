import styled from '@emotion/styled';
import React from 'react'

//I want to merge this with the react-router-dom Link to allow us to style it but im not sure how.

function Hyperlink(props) {

    const Link = styled.a` 
        color: #e45911;
        text-decoration: none;   
        :hover{
            color: orange;
        }
    `;

    return (
        <div>
        <Link href={props.href} target={props.target} onClick={props.onClick}>{props.text}</Link>
        </div>
    )
}

export default Hyperlink;
