import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled';
import { useStoreActions, useStoreState } from 'easy-peasy';

import Button from './style-components/button.component';
import Sidebar from './style-components/sidebar.component';
import Posts from './style-components/post.component';

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
        //console.log("Getting New Posts.");
        //console.log("total:",total);
        if(hasMore){
            //console.log("numPosts (pre):",numPosts);
            let postNum = numPosts + n;
            setNumPosts(postNum);
            //console.log("numPosts:",postNum)
            if(postNum >= total){
                //console.log("numPosts===total");
                //console.log(total);
                //console.log(numPosts);
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
    }, []);

    useEffect(() => {
        fetchN(numPosts);
    }, [numPosts]);

    const PageDiv = styled.div`
        background-color: #2b2b2b;
    `;
    const GridCont = styled.div`
        display: grid;
        grid-template-columns: auto auto;
        justify-content: space-evenly;
        grid-gap: 33px;
        
    `;
    const ContentArea = styled.div`
        margin: 10px;
    `;
    const PostsCont = styled.div`
        background-color: white;
        width: 55vw;
        height: ${postHeight}*${numPosts}vh;
        display: inline-block;
        margin-left: 5vw;
        margin-top: 3vh;
    `;
    
    const JumpBtn = styled.button`
        background-color: grey;
        font-size: 1.7vmin;
        color: white;
        border: 1px solid black;
        border-radius: 5px;
        padding: 12px 20px;
        margin: 8px 0;
        &:hover {
            opacity: 0.7;
        }
        float: right;
        right: 30px;
        bottom: 0;
        z-index: 1;
        position: fixed;
        
    `;

    return (
        <PageDiv>
            <GridCont ref={topRef}>
                <Sidebar/>
                <PostsCont>
                    <ContentArea>
                        <Posts/>
                        <Button onClick={getNewPosts} text={"Load More"}/>
                        <JumpBtn onClick={jumpFunction}>Back to top</JumpBtn>
                    </ContentArea>
                </PostsCont>
            </GridCont>
        </PageDiv>
    )
}

export default Homepage;