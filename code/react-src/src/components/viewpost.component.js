import { useStoreActions, useStoreState } from 'easy-peasy'
import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import styled from '@emotion/styled';
import Moment from 'react-moment';

const PostPage = styled.div`
    margin: 10vh auto;
    width: 60%;
    padding: 2vh;
    background-color: white;
    border-radius: 10px;
`;

const PostContent = styled.div`
    padding: 1vh;
`;

const PostBody = styled.div`

`;

const PostTitle = styled.h1` 
    padding: 0;
    margin: 0;
    font-weight: 400;
`;

const PostDetails = styled.span`
    color: gray;
`;

const PostDescription = styled.p` 

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

function ViewPost() {
    const genres = useStoreState((state) => state.genreList);
    const fetchPost = useStoreActions((actions) => actions.fetchPost)
    const [post, setPost] = useState();

    const location = useLocation();
    const history = useHistory();

    const userRedirect = (username) => {
        history.push(`/user/${username}`);
    }

    useEffect(async () => {
        const postId = location.pathname.split("/")[2];
        if (!postId) {
            return;
        }
        setPost(await fetchPost(Number(postId)));
    }, []);
    
    const mimeType = post?.data?.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
    const postMedia = mimeType?.indexOf("image") ? <video src={post?.data} controls width="400"></video> : <img src={post?.data}></img>;

    return (
        <PostPage>
            {post ? (
                <PostContent>
                    <PostHead>
                        <PostTitle>{post.title}</PostTitle>
                        <PostDetails>
                            Posted by <PostUsername onClick={e => userRedirect(post.username)}>{post.username}</PostUsername>,&nbsp;
                            <Moment fromNow withTitle titleFormat="D MMM YYYY HH:mm:ss">{post.createdAt}</Moment>
                            &nbsp; in {genres.find(genre => genre.key === post.genre).name}
                        </PostDetails>
                    </PostHead>
                    <PostBody>
                        <PostDescription>{post.description.length > 100 ? post.description.substring(0, 100) + "..." : post.description}</PostDescription>
                    </PostBody>
                    {postMedia}
                </PostContent>
            ) : "Loading..."}
        </PostPage>
    )
}

export default ViewPost
