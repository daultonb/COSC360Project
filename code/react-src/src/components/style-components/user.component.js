import React, {useState, useEffect} from 'react'
import styled from '@emotion/styled';
import Moment from 'react-moment';
import Posts from '../posts.component';
import { useStoreActions } from 'easy-peasy';
import Comment from './comment.component';

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
    transition: all 2s;
    & > img {
        display: inline;
        margin: 0 auto;
        width: 100%;
        height: 100%;
    }
    &:hover {
        transform: scale(1.1);
    }
`;

const ProfileInformation = styled.div``;

const UserData = styled.div`
    max-height: 50vh;
    background-color: white;
    color: #000;
    border-radius: 10px;
    overflow-y: auto;
    padding: 1vh;
`;

function User({account}) {
    const getPosts = useStoreActions((actions) => actions.fetchPostsFromUser);
    const getComments = useStoreActions((actions) => actions.getCommentsForUser);

    const [comments, setComments] = useState();
    const [numPosts, setNumPosts] = useState();

    useEffect(async () => {
        setNumPosts(await getPosts(account.username));
        setComments(await getComments(account.username));
    }, [])

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
                        {account.username}, a member for <Moment fromNow ago withTitle titleFormat="D MMM YYYY HH:mm:ss">{account.createdAt}</Moment>
                    </Username>
                </h1>
                <hr></hr>
            </ProfileHeader>
            <ProfileInformation>
                <div>
                    <p>{account.about}</p>
                </div>
            </ProfileInformation>
            <h2>Posts created:</h2>
            <UserData>
                {numPosts > 0 ? <Posts></Posts> :  "No posts for user." }
            </UserData>
            <h2>Comments created:</h2>
            <UserData>
                {comments?.length > 0 ? 
                    comments.map(comment => {
                        return <Comment hasAccess={() => {return false}} key={comment.id} comment={comment} showPostLink={true}></Comment>
                    })
                    :
                    "No comments for user."
                }
            </UserData>
        </div>
    )
}

export default User;
