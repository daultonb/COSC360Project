import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled';

import { useStoreActions, useStoreState } from 'easy-peasy';

import Posts from './posts.component';
import Comment from './style-components/comment.component';
import Button from './style-components/button.component';

import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';

const PageDiv = styled.div`
    width: 60%;
    padding: 2vh;
    margin: 10vh auto;
    background-color: white;
    border-radius: 10px;
`;

const ContentList = styled.div`
    overflow-y: auto;
    max-height: 50vh;
`;

const Username = styled.span` 
    color: blue;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;


function Admin() {

    const posts = useStoreState((state) => state.posts);
    const fetchN = useStoreActions((actions) => actions.fetchNPosts);
    const fetchComments = useStoreActions((actions) => actions.getAllComments);
    const getUsers = useStoreActions((actions) => actions.getAllAccounts);
    const deleteUser = useStoreActions((actions) => actions.removeAccount);

    const [comments, setComments] = useState();
    const [users, setUsers] = useState();
    
    useEffect(async () => {
        await fetchN(10);
        setComments(await fetchComments(20));
        setUsers(await getUsers());
    }, []);

    const history = useHistory();

    const userRedirect = (username) => {
        history.push(`/user/${username}`);
    }

    const attemptDeleteUser = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this user?");
        if(!confirmed) return;
        await deleteUser(id)
        setUsers(await getUsers());
    }

     //Check login.
    if (!JSON.parse(localStorage.getItem('account')).account.admin) {
        return (
        <PageDiv><p>You must be an admin to view this page.</p></PageDiv>
        )
    }


    return (
        <PageDiv>
            <h2>Recent Posts</h2>
            <ContentList>
                {posts && (<Posts></Posts>)}
            </ContentList>
            <hr></hr>
            <h2>Recent Comments</h2>
            <ContentList>
                {comments && comments.map(comment => {
                    return <Comment hasAccess={() => {return false}} key={comment.id} showPostLink={true} comment={comment}></Comment>;
                })}
            </ContentList>
            <h2>All Users</h2>
            <ContentList>
                {users && users.map(user => {
                    return (
                        <div key={user.id}>
                            <Button float="right" text={"Remove User"} onClick={e => attemptDeleteUser(user.id)}></Button>
                            <h3><Username onClick={e=> userRedirect(user.username)}>{user.username}</Username> - {user.email}</h3>
                            <h4>{user.first_name} {user.last_name}</h4>
                            Signed up <Moment fromNow ago withTitle titleFormat="D MMM YYYY HH:mm:ss">{user.createdAt}</Moment> ago
                            <br></br>
                            Last updated <Moment fromNow ago withTitle titleFormat="D MMM YYYY HH:mm:ss">{user.updatedAt}</Moment> ago
                            <hr></hr>
                        </div>
                    );
                })}
            </ContentList>
        </PageDiv>
    )
}

export default Admin;