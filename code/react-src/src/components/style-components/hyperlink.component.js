import styled from '@emotion/styled';
import React from 'react'

//I want to merge this with the react-router-dom Link to allow us to style it but im not sure how.

function Hyperlink(props) {

    const Link = styled.div` 
        color: white;
        text-decoration: none;
        :hover{
            color: gray;
        }
    `;

    return (
        <Link href={props.href} target={props.target} onClick={props.onClick}>{props.text}</Link>
    )
}

export default Hyperlink;
