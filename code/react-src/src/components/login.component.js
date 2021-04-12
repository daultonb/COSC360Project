import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';

import { useStoreActions, useStoreState } from 'easy-peasy';

const LoginInput = styled.input`
    display: inline-block;
    padding: 12px 20px;
    margin: 8px 0;
    width: 90%;
    border-radius:5px;
`;

const PageDiv = styled.div`
    background-color: #2b2b2b;
    height: 105vh;
    padding-top: 2vh;
`;

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
    margin-top: 10vh;  
`;

function Login() {
    const createAccount = useStoreActions((actions) => actions.createAccount);
    const login = useStoreActions((actions) => actions.login);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [register, setRegister] = useState(false);

    const attemptLogin = async () => {
        const data = await login({ username: username, password: password });
        console.log(data);
        if(data.token) {
            alert("logged in!");
        }
        //if token, "you have logged in successfully"
        //if message, print message
    }

    const attemptRegister = async () => {
        const account = await createAccount({
            username: username,
            password: password,
            email:email,
            first_name: firstName,
            last_name: lastName,
        });
        console.log(account);
        if(!account.message) {
            alert("created!");
        }
        //if no message, "your account has been created etc."
    }

    return (
        <PageDiv>
            <LoginHeader>Login</LoginHeader>
            <LoginForm key="loginform1">
                <LoginParagraph>Username</LoginParagraph>
                <LoginInput key="username1" type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <LoginParagraph>Password</LoginParagraph>
                <LoginInput key="password1" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {!register ?
                    <div>
                        <LoginButton type="submit" onClick={attemptLogin} value="Login"></LoginButton>
                        <p><a href="#" onClick={() => setRegister(true)}>Register</a></p>
                    </div>
                    :
                    <div>
                        <LoginParagraph>Re-Enter Password</LoginParagraph>
                        <LoginInput key="password2" type="password" placeholder="Enter Password" value={password2} onChange={(e) => setPassword2(e.target.value)}></LoginInput>
                        <LoginParagraph>First Name</LoginParagraph>
                        <LoginInput key="first_name1" type="text" placeholder="Enter Your First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}></LoginInput>
                        <LoginParagraph>Last Name</LoginParagraph>
                        <LoginInput key="last_name1" type="text" placeholder="Enter Your Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}></LoginInput>
                        <LoginParagraph>Email</LoginParagraph>
                        <LoginInput key="email1" type="text" placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)}></LoginInput>
                        <LoginButton type="submit" value="Register" onClick={attemptRegister}></LoginButton>
                        <p><a href="#" onClick={() => setRegister(false)}>Back to Login</a></p>
                    </div>
                }
            </LoginForm>

        </PageDiv>
    )
}

export default Login;
