import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled';
import { useStoreActions } from 'easy-peasy';

/** @jsxImportSource @emotion/react */

import User from './style-components/user.component';
import { useLocation } from 'react-router-dom';

const PageContent = styled.div`
    max-width: 60%;
    margin: 5% auto;
    color: white;
`;


function Profile() {
    const getAccount = useStoreActions((actions) => actions.getAccountFromName);
    const location = useLocation();
    const [account, setAccount] = useState();

    useEffect(async () => {
        const username = location.pathname.split("/")[2];
        if (!username) {
            return;
        }
        const newAccount = await getAccount(username);
        setAccount(newAccount[0]);
    }, []);

    return (
        <PageContent>
            {account ? <User account={account}></User> : "Loading..."}
        </PageContent>
    )
}

export default Profile;
