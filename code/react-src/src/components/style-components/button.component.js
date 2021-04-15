import React from 'react'
import styled from "@emotion/styled";

/** @jsxImportSource @emotion/react */

function Button(props) {

    const Button = styled.button`
        background-color: grey;
        font-size: 1.7vmin;
        color: white;
        border: 1px solid black;
        border-radius: 5px;
        padding: 12px 20px;
        margin: 8px 0;
        &:hover {
            opacity: 0.7;
        }

    `;

    //inline css
    //css={{ backgroundColor: 'green'}}

    return (
        <div>
        <Button onClick={props.onClick} type={props.type} css={{height: props.height, width:props.width}}>{props.text}</Button>
        </div>
    )
}

export default Button;

