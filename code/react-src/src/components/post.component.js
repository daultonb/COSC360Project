import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled';

import { useStoreActions, useStoreState } from 'easy-peasy';

function Posts() {
    
    const posts = useStoreState((state) => state.posts);

    const PostContent = styled.div`
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background-color: rgba(0, 0, 0, 0.15);
        padding: 10px;
        margin: 10px;
    `;

    const PostTitle = styled.h1` 

    `;

    const PostDescription = styled.p` 

    `;

    const PostUsername = styled.p` 
    align-items: flex-start;
    `;

    const PostDate = styled.p` 
    align-items: flex-start;
    `;

return (
         <div>
                        {posts && posts.map((post, index) => {
                            const mimeType = post.data?.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
                            const postMedia = mimeType?.indexOf("image") ? <video src={post.data} controls width="400"></video> : <img src={post.data}></img>;
                            return <PostContent key={index}>
                                <PostUsername>Posted by {post.username}</PostUsername>
                                <PostDate> Post Created On {new Date(post.createdAt).toString()}</PostDate>
                                <PostTitle>{post.title}</PostTitle>
                                <PostDescription>{post.description}</PostDescription>
                                {postMedia}
                                
                            </PostContent>;
                        })}
        </div>
   
)


}

export default Posts;