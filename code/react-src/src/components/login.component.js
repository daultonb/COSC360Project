import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';

function Login() {

    const [register, setRegister] = useState(false);
    // Temp Varible Declared to be replaced with function to chack if the 
    const isRegisterDataValid = true;

    const LoginForm = styled.div`
        border: 3px solid #f1f1f1;
        margin: 0 auto;
        background-color: White;
        color: black;
        padding: 50px;
        width: 400px;
    `;

    const LoginFormElement = styled.form`
        
    `;

    const LoginInput = styled.input`
        display: inline-block;
        padding: 12px 20px;
        margin: 8px 0;
        width: 90%;
        border-radius:5px;
    `;

    const LoginButton = styled.input`
        background-color: grey;
        color: white;
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
    &:hover {
        opacity: 0.7;
    }
    `;

    const LoginParagraph = styled.p`
        font-weight: bold;
        color: black;
    `;

    const LoginHeader = styled.h1`
        font-weight: bold;
        text-align: center;
        color:black;    
    `;


    return (
        <div>
            <LoginHeader>Login</LoginHeader>
            <LoginForm>
                <LoginFormElement>
                    <LoginParagraph>Username</LoginParagraph>
                    <LoginInput type="text" placeholder="Enter Username" />
                    <LoginParagraph>Password</LoginParagraph>
                    <LoginInput type="text" placeholder="Enter Password" />
                    {!register &&
                        <div>
                            <LoginButton type="submit" value="Login"></LoginButton>
                            <p><a href="#" onClick={() => setRegister(true)}>Register</a></p>
                        </div>
                    }
                    {register &&
                        <div>
                            <LoginParagraph>Re-Enter Password</LoginParagraph>
                            <LoginInput type="text" placeholder="Enter Password"></LoginInput>
                            <LoginParagraph>First Name</LoginParagraph>
                            <LoginInput type="text" placeholder="Enter Your First Name"></LoginInput>
                            <LoginParagraph>Last Name</LoginParagraph>
                            <LoginInput type="text" placeholder="Enter Your Last Name"></LoginInput>
                            <LoginParagraph>Email</LoginParagraph>
                            <LoginInput type="text" placeholder="Enter Email Address"></LoginInput>
                            <LoginButton type="submit" value="Register" onClick={() => { isRegisterDataValid ? setRegister(false) : setRegister(true)}}></LoginButton>
                            <p><a href="#" onClick={() => setRegister(false)}>Back to Login</a></p>
                        </div>

                    }

                </LoginFormElement>
            </LoginForm>

        </div>
    )
}

export default Login;
