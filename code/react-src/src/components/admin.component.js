import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled';

import { useStoreActions, useStoreState } from 'easy-peasy';

const Cont = styled.div`
        padding-top: 50px;
        padding-left: 50px;
`;

function Admin() {
    const savePost = useStoreActions((actions) => actions.savePost);
    const removePost = useStoreActions((actions) => actions.removePost);
    const fetchPosts = useStoreActions((actions) => actions.fetchPosts);
    const posts = useStoreState((state) => state.posts);
    
    
    useEffect(() => {
        fetchPosts();
    }, []);

    const PageDiv = styled.div`
        background-color: #2b2b2b;
        padding-top: 2vh;
        min-height: 100vh;
        padding-bottom: 2vh;
    `;

    //SearchBar
    const SearchGridItem = styled.div`
        width: 30vw;
        height: 5vh;
        margin-left: 28.5vw;
    `;
    const SearchBar = styled.input`
        border: 1px solid black;
        border-radius: 8px;
        width: 100%;
        height: 60%;
        margin-top: 0.5vh;
        font-size: 2.5vmin;
    `;

    return (
        <PageDiv>
            <SearchGridItem>
                <SearchBar type= "text" placeholder="Search"/>
            </SearchGridItem>

            <ul>
                {posts && posts.map((post, index) => {
                    return <li onClick={fetchPosts} className="post" key={index}>
                        <h1>{post.title}</h1>
                        <p>{post.description}</p>
                        <p>{post.username}</p>
                        <p>{post.createdAt}</p>
                        <button onClick={() => removePost(post.id)}>Delete</button>
                    </li>;
                })}
                
            </ul>
        </PageDiv>
    )
}

export default Admin;