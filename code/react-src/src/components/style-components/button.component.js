import React from 'react'
import styled from "@emotion/styled";

/** @jsxImportSource @emotion/react */

function Button(props) {

    const Button = styled.button`
        background-color: #30475e;
        font-size: 1.7vmin;
        color: white;
        border: 0;
        border-radius: 5px;
        padding: 1.2vh 2.0vh;
        margin: 0.2vh;
        text-transform: uppercase;
        transition: all 0.4s;
        &:hover {
            opacity: 0.7;
            cursor: pointer;
            background-color: #47688a;
        }

    `;

    return <Button onClick={props.onClick} type={props.type} css={{ height: props.height, width: props.width, float: props.float }}>{props.text}</Button>;
}

export default Button;

