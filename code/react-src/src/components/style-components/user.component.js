import React from 'react'
import styled from '@emotion/styled';
import Moment from 'react-moment';

const ProfileHeader = styled.div``;

const Username = styled.span`
    color: lightgray;
    float: right;
`;

const ProfileAvatar = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow:hidden;
    & > img {
        display: inline;
        margin: 0 auto;
        width: 100%;
    }
`;

const ProfileInformation = styled.div``;

const UserPosts = styled.div``;

function User({account}) {
    const mimeType = account.avatar?.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
    const avatar = mimeType?.indexOf("image") ? <video src={account.avatar} controls width="400"></video> : <img src={account.avatar}></img>;

    return (
        <div>
            <ProfileHeader>
                <ProfileAvatar>
                    {avatar}
                </ProfileAvatar>
                <h1>
                    {account.first_name} {account.last_name}
                    <Username>
                        {account.username}, member for <Moment fromNow ago withTitle titleFormat="D MMM YYYY HH:mm:ss">{account.createdAt}</Moment>
                    </Username>
                </h1>
                <hr></hr>
            </ProfileHeader>
            <ProfileInformation>
                <div>
                    <p>User Email: {account.email}</p>
                    <p>About: {account.about}</p>
                </div>
            </ProfileInformation>
            <UserPosts>
                posts go herr
            </UserPosts>
        </div>
    )
}

export default User;
