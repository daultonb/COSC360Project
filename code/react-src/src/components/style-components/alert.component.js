import React from 'react'
import styled from "@emotion/styled";

/** @jsxImportSource @emotion/react */

function Alert(props) {

    const Alert = styled.div`
        width: 20%;
        height: 50px;
        margin: 0 auto;
        text-align: center;
        line-height: 50px;
        background-color: white;
        border-radius: 5px;
    `;

    return (
        <div>
            <Alert>{props.text}</Alert>
        </div>
    )
}

export default Alert;

