import React, { useState } from 'react'
import styled from '@emotion/styled';
import { useStoreState } from 'easy-peasy';

import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';
import Hyperlink from './hyperlink.component';

/** @jsxImportSource @emotion/react */

const CommentContent = styled.div`
    background-color: rgba(0, 0, 0, 0.15);
    padding: 1vh;
    margin: 1vh;
    border-radius: 5px;
`;

const CommentBody = styled.div`

`;

const CommentName = styled.span` 
    color: blue;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

const ViewLink = styled.span`
    color: gray;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

function Comment({comment, showPostLink}) {
    const history = useHistory();

    const userRedirect = (username) => {
        history.push(`/user/${username}`);
    }

    const redirect = (postId) => {
        history.push(`/post/${postId}`);
    }

    const mimeType = comment?.data?.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
    const commentMedia = mimeType?.indexOf("image") ? <video src={comment?.data} controls width="300"></video> : <img style={{maxWidth: 250, verticalAlign: "middle"}} src={comment?.data}></img>;

    return (
        <CommentContent>
            Posted by <CommentName onClick={e => userRedirect(comment.username)}>{comment.username}</CommentName>,&nbsp;
            <Moment fromNow withTitle titleFormat="D MMM YYYY HH:mm:ss">{comment.createdAt}</Moment>
            {showPostLink && ( 
                <span>
                    &nbsp;- <ViewLink onClick={e=> redirect(comment.post_id)}>View Post</ViewLink>
                </span> 
            )}
            <CommentBody>
                {commentMedia}
                {comment.text}
            </CommentBody>
        </CommentContent>
    )
}

export default Comment;