import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import Sidebar from './sidebar.component';

import { useStoreActions, useStoreState } from 'easy-peasy';

function Homepage() {
    const fetchPosts = useStoreActions((actions) => actions.fetchPosts);
    const posts = useStoreState((state) => state.posts);

    useEffect(() => {
        fetchPosts();
    }, []);

    const PageDiv = styled.div`
        background-color: #2b2b2b;
        padding-top: 4vh;
        min-height: 100vh;
        
    `;

    const GridCont = styled.div`
        display: grid;
        grid-template-columns: auto auto;
        justify-content: space-evenly;
        grid-gap: 1vw;
    `;

    const ContentArea = styled.div`
        margin: 10px;
    `;

    const PostCont = styled.div`
        background-color: white;
        width: 60vw;
        display: inline-block;
    `;

    const PostContent = styled.div`
        background-color: rgba(0, 0, 0, 0.15);
        padding: 10px;
        margin: 10px;
    `;

    return (
        <PageDiv>
            <GridCont>
                <Sidebar/>
                <PostCont>
                    <ContentArea>
                        {posts && posts.map((post, index) => {
                            return <PostContent key={index}>
                                <h1>{post.title}</h1>
                                <p>{post.description}</p>
                                <p>User: {post.username}</p>
                                <p>Time: {post.createdAt}</p>
                            </PostContent>;
                        })}
                    </ContentArea>
                </PostCont>
            </GridCont>
        </PageDiv>
    )
}


export default Homepage;