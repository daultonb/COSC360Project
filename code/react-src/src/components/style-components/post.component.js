import React, {useState} from 'react'
import styled from '@emotion/styled';
import {useStoreState} from 'easy-peasy';

function Posts() {
    
    const posts = useStoreState((state) => state.posts);

    const PostContent = styled.div`
        background-color: rgba(0, 0, 0, 0.15);
        padding: 1vh;
        margin: 1vh;
    `;

    const PostBody = styled.div`
        display: grid;
        grid-template-areas: 'title';
        justify-content: space-evenly;
        grid-gap: 20px;
    `;

    const PostTitle = styled.h1` 
        grid-area: 'title';
    `;

    const PostDescription = styled.p` 
        
    `;

    const PostUsername = styled.p` 
        
    `;

    const PostDate = styled.p` 
        
    `;

    const PostMedia = styled.div`

    `;

    const PostHead = styled.div`
        display: grid;
        grid-template-columns: auto auto;
    `;


return (
        <div>
            {posts && posts.map((post, index) => {
                const mimeType = post.data?.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
                const postMedia = mimeType?.indexOf("image") ? <video src={post.data} controls width="400"></video> : <img src={post.data}></img>;
                return <PostContent key={index}>
                    
                    <PostHead>
                        <PostUsername>Posted by {post.username}</PostUsername>
                        <PostDate> Post Created On {new Date(post.createdAt).toString()}</PostDate>
                    </PostHead>
                    <PostBody>
                        <PostTitle>{post.title}</PostTitle>
                        <PostDescription>{post.description}</PostDescription>
                        <PostMedia>{postMedia}</PostMedia>
                    </PostBody>
                    
                </PostContent>;
            })}
        </div>
)


}

export default Posts;