import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled';
import Sidebar from './sidebar.component';

import { useStoreActions, useStoreState } from 'easy-peasy';


function Homepage() {
    const fetchPosts = useStoreActions((actions) => actions.fetchPosts);
    const fetchN = useStoreActions((actions) => actions.fetchNPosts);
    const fetchTotal = useStoreActions((actions) => actions.fetchTotal);
    const [hasMore, setHasMore] = useState(true);
    const n = 5;
    const [numPosts, setNumPosts] = useState(n);
    const posts = useStoreState((state) => state.posts);
    const total = useStoreState((state) => state.total);
    const postHeight = 5;
    const topRef = useRef();

    function jumpFunction(){
        topRef.current.scrollIntoView({behavior: 'smooth'});
    }

    const getNewPosts = ()=> {
        console.log("Getting New Posts.");
        console.log("total:",total);
        if(hasMore){
            console.log("numPosts (pre):",numPosts);
            let postNum = numPosts + n;
            setNumPosts(postNum);
            console.log("numPosts:",postNum)
            if(postNum >= total){
                console.log("numPosts===total");
                console.log(total);
                console.log(numPosts);
                setHasMore(false);
            }
        }else{
            console.log("hasMore is False");
        }
    }

    useEffect(() => {
        fetchTotal();
        setNumPosts(n);
        fetchN(numPosts);
        console.log("fetches Complete.");
        console.log("useEffect total:",total);
    }, []);

    useEffect(() => {
        fetchN(numPosts);
    }, [numPosts]);

    const PageDiv = styled.div`
        background-color: #2b2b2b;
        
        margin-top: -10vh; 
    `;

    const GridCont = styled.div`
        display: grid;
        grid-template-columns: auto auto;
        justify-content: space-evenly;
        grid-gap: 33px;
        padding-top: 68px;
    `;

    const ContentArea = styled.div`
        margin: 10px;
        height: ${postHeight}vh;
    `;

    const PostsCont = styled.div`
        background-color: white;
        width: 55vw;
        height: ${postHeight}*${numPosts}vh;
        display: inline-block;
        margin-left: 5vw;
        margin-top: 5vh;
    `;

    const PostContent = styled.div`
        background-color: rgba(0, 0, 0, 0.15);
        padding: 10px;
        margin: 10px;
    `;
    
    const JumpBtn = styled.button`
        width: 100px;
        height: 50px;
        float: right;
        right: 30px;
        bottom: 0;
        background-color: grey;
        z-index: 1;
        position: fixed;
        border: solid black 1px;
        
    `;

    const LoadBtn = styled.button`
        width: 100px;
        height: 50px;
        float: left;
        background-color: grey;
        border: solid black 1px;
        margin: 15px;
    `;

    return (
        <PageDiv>
            <GridCont ref={topRef}>
                <Sidebar/>
                <PostsCont>
                    <ContentArea>
                        {posts && posts.map((post, index) => {
                            return <PostContent key={index}>
                                <h1>{post.title}</h1>
                                <p>{post.description}</p>
                                <img src={post.file}></img>
                                <p>{post.username}</p>
                                <p>{new Date(post.createdAt).toString()}</p>
                            </PostContent>;
                        })}
                        <LoadBtn onClick={getNewPosts}>Load More</LoadBtn>
                        <JumpBtn onClick={jumpFunction}>Back to top</JumpBtn>
                    </ContentArea>
                </PostsCont>
            </GridCont>
        </PageDiv>
    )
}

export default Homepage;