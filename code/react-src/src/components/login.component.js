import React, { useState, useRef } from 'react'
import styled from '@emotion/styled';
import { useStoreActions, useStoreState } from 'easy-peasy';

import Button from './style-components/button.component';
import TextInput from './style-components/textinput.component';
import Alert from './style-components/alert.component';

const PageDiv = styled.div`
    background-color: #2b2b2b;
    height: 115vh;
    padding-top: 10vh;
`;

const LoginForm = styled.div`
    border: 3px solid #f1f1f1;
    margin: 0 auto;
    background-color: White;
    color: black;
    padding: 50px;
    width: 400px;
`;

const LoginParagraph = styled.p`
    font-weight: bold;
    color: black;
`;

const LoginHeader = styled.h1`
    font-weight: bold;
    text-align: center;
    color:white;  
    margin-top: 5vh;  
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

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const topRef = useRef();

    function jumpFunction(){
        topRef.current.scrollIntoView({behavior: 'smooth'});
    }

    const attemptLogin = async () => {
        const data = await login({ username: username, password: password });
        jumpFunction();
        if(data.token) {
            setAlertMessage("You are now logged in.");
            setShowAlert(true);
            return;
        }
        setAlertMessage(data.message);
        setShowAlert(true);
    }

    const attemptRegister = async () => {
        const account = await createAccount({
            username: username,
            password: password,
            email: email,
            first_name: firstName,
            last_name: lastName,
        });
        jumpFunction();
        if(!account.message) {
            setAlertMessage("Your account was created.");
            setShowAlert(true);
            setRegister(false);
            return
        }
        setAlertMessage(account.message);
        setShowAlert(true);
    }

    return (
        <PageDiv ref={topRef}>
            {showAlert && (
                <Alert id="shown_alert" text={alertMessage}></Alert>
            )}
            <LoginHeader>Login</LoginHeader>
            <LoginForm key="loginform1">
                <LoginParagraph>Username</LoginParagraph>
                <TextInput key="username1" type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <LoginParagraph>Password</LoginParagraph>
                <TextInput key="password1" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {!register ?
                    <div>
                        <Button type={"submit"} onClick={attemptLogin} text={"Login"} width={"100%"}></Button>
                        <Button onClick={() => setRegister(true)} text={"Register"} width={"100%"}/>
                    </div>
                    :
                    <div>
                        <LoginParagraph>Re-Enter Password</LoginParagraph>
                        <TextInput key="password2" type="password" placeholder="Enter Password" value={password2} onChange={(e) => setPassword2(e.target.value)}></TextInput>
                        <LoginParagraph>First Name</LoginParagraph>
                        <TextInput key="first_name1" type="text" placeholder="Enter Your First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}></TextInput>
                        <LoginParagraph>Last Name</LoginParagraph>
                        <TextInput key="last_name1" type="text" placeholder="Enter Your Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}></TextInput>
                        <LoginParagraph>Email</LoginParagraph>
                        <TextInput key="email1" type="text" placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)}></TextInput>
                        <Button type={"submit"} text={"Register"} onClick={attemptRegister} width={"100%"} />
                        <Button onClick={() => setRegister(false)} text={"Back to Login"} width={"100%"}/>
                    </div>
                }
            </LoginForm>

        </PageDiv>
    )
}

export default Login;
