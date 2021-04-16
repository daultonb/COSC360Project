import React, { useState } from 'react'
import styled from '@emotion/styled';
import { useStoreState } from 'easy-peasy';

import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';

/** @jsxImportSource @emotion/react */

const PostContent = styled.div`
    background-color: rgba(0, 0, 0, 0.15);
    padding: 1vh;
    margin: 1vh;
    border-radius: 5px;
`;

const PostBody = styled.div`

`;

const PostTitle = styled.h1` 
    padding: 0;
    margin: 0;
    font-weight: 400;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

const PostDescription = styled.p` 

`;

const PostDetails = styled.span`
    color: gray;
`;

const PostUsername = styled.span` 
    color: blue;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

const PostHead = styled.div`
    display: grid;
    grid-template-rows: 1fr 0.5fr;
`;

function Posts() {
    const posts = useStoreState((state) => state.posts);
    const genres = useStoreState((state) => state.genreList);

    const history = useHistory();

    const redirect = (postId) => {
        history.push(`/post/${postId}`);
    }

    const userRedirect = (username) => {
        history.push(`/user/${username}`);
    }

    return (
        <div>
            {posts && posts.map((post, index) => {
                return <PostContent key={index}>
                    <PostHead>
                        <PostTitle css={{color: genres?.find(genre => genre.key === post.genre).colorCode }} onClick={e => redirect(post.id)}>{post.title}</PostTitle>
                        <PostDetails>
                            Posted by <PostUsername onClick={e => userRedirect(post.username)}>{post.username}</PostUsername>,&nbsp;
                            <Moment fromNow withTitle titleFormat="D MMM YYYY HH:mm:ss">{post.createdAt}</Moment>
                        </PostDetails>
                    </PostHead>
                    <PostBody>
                        <PostDescription>{post.description.length > 100 ? post.description.substring(0, 100) + "..." : post.description}</PostDescription>
                    </PostBody>
                </PostContent>;
            })}
        </div>
    )
}

export default Posts;