import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';

function Login() {

    const propColor = 'red';

    const hasImage = true;
    
    const LoginForm = styled.div`
        margin: 0 auto;
        background-color: white;
        color: red;
        padding: 100px;
        width: ${hasImage ? 100 : 200}px;
        img > {
            border: 2px solid #000;
        }
    `;

    const LoginFormElement = styled.form`
        margin: 5px;
    `;

    const LoginInput = styled.input`
        border-radius:5px;
    `;

    const LoginParagraph = styled.p`
        color: blue;
    `;

    return (
        <LoginForm>
            <LoginFormElement>
                <img src="" alt="test"></img>
                <LoginInput type="text" placeholder="Test" />
            </LoginFormElement>
            <p>Testing</p>
            <LoginParagraph>Testing 2</LoginParagraph>
        </LoginForm>
    )
}

export default Login;
