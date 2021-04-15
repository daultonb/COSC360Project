import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled';
import { useStoreActions, useStoreState } from 'easy-peasy';

import Button from './style-components/button.component';

const Cont = styled.div`
    padding-top: 50px;
    padding-left: 50px;
`;

function MyAccount() {

    const myaccount = useStoreState((state) => state.myAccount);
    const [isEditing, setIsEditing] = useState(false);
    
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

    //Check login.
    if (!localStorage.getItem('account')) {
        return (
            <div><br></br>You must be logged in to create posts.</div>
        )
    }
    
    
    return (
        <Cont>
        
        {isEditing?
            <div>
                <p>Username: <input type="text" placeholder={myaccount.account.username}></input></p>
                <p>Email: <input type="text" placeholder= {myaccount.account.email}></input></p>
                <p>First name: <input type="text" placeholder= {myaccount.account.first_name}></input></p>
                <p>Last name: <input type="text" placeholder= {myaccount.account.last_name}></input></p>
                <p>About: <input type="text" placeholder= {myaccount.account.about}></input></p>
                <p>Avatar: <input type="file" id="file" accept="image/*" onChange={e => handleChooseFile(e.target.files[0])}></input></p>
                <Button text={"submit"} onClick={() => setIsEditing(!isEditing)}></Button>
            </div>
            :
            <div>
            <p>Username: {myaccount.account.username}</p>
            <p>Email:{myaccount.account.email}</p>
            <p>First name: {myaccount.account.first_name}</p>
            <p>Last name: {myaccount.account.last_name}</p>
            <p>About: {myaccount.account.about}</p>
            <p>Avatar: {myaccount.account.avatar}</p>
            <Button onClick={() => setIsEditing(!isEditing)} text={"Edit My Profile"}/>
            </div>
            }
            
        </Cont>
    )
}

export default MyAccount;