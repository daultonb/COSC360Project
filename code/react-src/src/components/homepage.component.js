import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';

import { useStoreActions, useStoreState } from 'easy-peasy';

function Homepage() {
    const fetchPosts = useStoreActions((actions) => actions.fetchPosts);
    const posts = useStoreState((state) => state.posts);

    useEffect(() => {
        fetchPosts();
    }, []);

    const PageDiv = styled.div`
        background-color: #2b2b2b;
        height: 100vh;
        margin-top: -10vh; 
    `;

    const GridCont = styled.div`
        display: grid;
        grid-template-columns: auto auto;
        justify-content: space-evenly;
        height: 80vh;
        grid-gap: 33px;
        padding-top: 68px;
        padding-left: 0px;
    `;

    const SidebarCont = styled.div`
        background-color: #c5c5c8;
        width: 15vw;
        height: 80vh;
        display: inline-block;
        margin: auto;
    `;

    const ContentArea = styled.div`
        margin: 10px;
    `;

    const PostCont = styled.div`
        background-color: white;
        width: 60vw;
        height: 86vh;
        display: inline-block;
        margin-top: 5vh;
        overflow-y: scroll;
    `;

    const PostContent = styled.div`
        background-color: rgba(0, 0, 0, 0.15);
    `;

    return (
        <PageDiv>
            <GridCont>
                <SidebarCont>
                    <ContentArea>
                        <h3>Sidebar</h3>
                        <p>This is in the sidebar</p>
                    </ContentArea>
                </SidebarCont>
                <PostCont>
                    <ContentArea>
                        {posts && posts.map((post, index) => {
                            return <PostContent key={index}>
                                <h1>{post.title}</h1>
                                <p>{post.description}</p>
                                <p>{post.username}</p>
                                <p>{post.createdAt}</p>
                            </PostContent>;
                        })}
                    </ContentArea>
                </PostCont>
            </GridCont>
        </PageDiv>
    )
}


export default Homepage;