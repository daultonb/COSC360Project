import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled';
import { useStoreActions, useStoreState } from 'easy-peasy';

import Button from './style-components/button.component';
import TextInput from './style-components/textinput.component';
import Alert from './style-components/alert.component';

const PageContent = styled.div`
    max-width: 50%;
    margin: 5% auto;
    color: white;
`;

const ProfileHeader = styled.div`

`;

const Username = styled.span`
    color: gray;
    float: right;
`;

const ProfileAvatar = styled.div`
    width: 100px;
    height: 100px;
    border-radius:20%;
    overflow:hidden;
    & > img {
        display: inline;
        margin: 0 auto;
        height: 100%;
        width: auto;
    }
`;

const ProfileInformation = styled.div`

`;

const EditProfileContent = styled.div`

`;



function MyAccount() {
    const updateAccount = useStoreActions((actions) => actions.updateAccount);
    const setAccount = useStoreActions((actions) => actions.setAccount);
    const [isEditing, setIsEditing] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [about, setAbout] = useState('');

    const [password2, setPassword2] = useState('');
    const [password3, setPassword3] = useState('');

    const topRef = useRef();

    function jumpFunction() {
        topRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const myaccount = JSON.parse(localStorage.getItem('account'));

    //Check login.
    if (!myaccount || !myaccount.account) {
        return (
            <div><br></br>You must be logged in.</div>
        )
    }

    var currentUpload;
    var fileReader;
    const readFile = (e) => {
        const content = fileReader.result;
        currentUpload = content;
    }
    const handleChooseFile = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = readFile;
        fileReader.readAsDataURL(file);
    }

    const attemptUpdate = async () => {
  
        let password;
        if (password2 && password3) {
            if (password2 === password3) {
                password = password2;
            }
        }
        //check if new passwords match

        const account = await updateAccount({
            id: myaccount.account.id,
            password: password,
            email: email,
            first_name: firstName,
            last_name: lastName,
            about: about,
            avatar: currentUpload,
        });
        jumpFunction();
        if (!account.message) {
            myaccount.account = account;
            setAccount(myaccount);
            setAlertMessage("Your account was updated.");
            setShowAlert(true);
            setIsEditing(false);
            return
        }
        setAlertMessage(account.message);
        setShowAlert(true);
    }

    const mimeType = myaccount.account.avatar?.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
    const avatar = mimeType?.indexOf("image") ? <video src={myaccount.account.avatar} controls width="400"></video> : <img src={myaccount.account.avatar}></img>;

    return (
        <PageContent ref={topRef}>
            {showAlert && (
                <Alert id="shown_alert" text={alertMessage}></Alert>
            )}
            <ProfileHeader>
                <ProfileAvatar>
                    {avatar}
                </ProfileAvatar>
                <h1>
                    {myaccount.account.first_name} {myaccount.account.last_name}
                    <Username>
                        {myaccount.account.username}
                    </Username>
                </h1>
                <hr></hr>
            </ProfileHeader>
            <ProfileInformation>
                <div>
                    <p>Account Email: {myaccount.account.email}</p>
                    <p>About: {myaccount.account.about}</p>
                </div>
            </ProfileInformation>
            <Button onClick={() => setIsEditing(!isEditing)} text={"Edit My Profile"} />

            {isEditing && (
                <EditProfileContent>
                    <h4>Change First Name</h4>
                    <TextInput key="first_name1" type="text" placeholder={myaccount.account.first_name} value={firstName} onChange={(e) => setFirstName(e.target.value)}></TextInput>
                    <h4>Change Last Name</h4>
                    <TextInput key="last_name1" type="text" placeholder={myaccount.account.last_name} value={lastName} onChange={(e) => setLastName(e.target.value)}></TextInput>
                    <h4>Change Email</h4>
                    <TextInput key="email1" type="text" placeholder={myaccount.account.email} value={email} onChange={(e) => setEmail(e.target.value)}></TextInput>
                    <h4>Upload Avatar</h4>
                    <input type="file" id="file" accept="image/*" onChange={e => handleChooseFile(e.target.files[0])}></input>
                    <h4>Change About Me</h4>
                    <textarea key="aboutme" value={about} onChange={(e) => setAbout(e.target.value)} id="aboutme"></textarea>
                    <hr></hr>
                    <h4>New Password</h4>
                    <TextInput key="password2" type="password" placeholder="New Password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                    <h4>Re-enter New Password</h4>
                    <TextInput key="password3" type="password" placeholder="New Password" value={password3} onChange={(e) => setPassword3(e.target.value)} />
                    <Button text={"Submit"} onClick={attemptUpdate}></Button>
                </EditProfileContent>
            )}

        </PageContent>
    )
}

export default MyAccount;

{/* <LoginParagraph>Password</LoginParagraph>
<TextInput key="password1" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}