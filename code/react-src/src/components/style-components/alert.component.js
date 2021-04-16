import React from 'react'
import styled from "@emotion/styled";

/** @jsxImportSource @emotion/react */

function Alert(props) {

    const Alert = styled.div`
        width: 33%;
        margin: 0 auto;
        text-align: center;
        line-height: 50px;
        background-color: white;
        border-radius: 5px;
        color: black;
    `;

    return (
        <div>
            <Alert>{props.text}</Alert>
        </div>
    )
}

export default Alert;

