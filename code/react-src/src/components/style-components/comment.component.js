import React, { useState } from 'react'
import styled from '@emotion/styled';
import { useStoreActions } from 'easy-peasy';

import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';
import Button from './button.component';

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

function Comment({comment, showPostLink, hasAccess, deleteCallback}) {

    const deleteComment = useStoreActions((actions) => actions.removeComment);

    const history = useHistory();

    const userRedirect = (username) => {
        history.push(`/user/${username}`);
    }

    const redirect = (postId) => {
        history.push(`/post/${postId}`);
    }

    const attemptDelete = async () => {
        if (!hasAccess()) {
            return;
        }
        const confirmed = window.confirm("Are you sure you want to delete this?");
        if(!confirmed) return;
        await deleteComment(comment.id)
        deleteCallback();
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
            {hasAccess && (
                <Button onClick={attemptDelete} float="right" text={"Remove"}></Button>
            )}
            <CommentBody>
                {commentMedia}
                &nbsp;
                {comment.text}
            </CommentBody>
        </CommentContent>
    )
}

export default Comment;