import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled';
import { useStoreActions, useStoreState } from 'easy-peasy';

import Button from './style-components/button.component';
import Sidebar from './style-components/sidebar.component';
import Posts from './posts.component';

function Homepage() {
    const fetchN = useStoreActions((actions) => actions.fetchNPosts);
    const fetchTotal = useStoreActions((actions) => actions.fetchTotal);

    const [total, setTotal] = useState(0);

    const [hasMore, setHasMore] = useState(true);
    const n = 5;
    const [numPosts, setNumPosts] = useState(n);

    const [lastTotal, setLastTotal] = useState(total);

    const postHeight = 5;

    const topRef = useRef();

    function jumpFunction(){
        topRef.current.scrollIntoView({behavior: 'smooth'});
    }

    const getNewPosts = ()=> {
        if(hasMore){
            let postNum = numPosts + n;
            setNumPosts(postNum);
            if(postNum >= total){
                setHasMore(false);
            }
        }else{
            console.log("hasMore is False");
        }
    }
    
    useEffect(async () => {
        const total = await fetchTotal();
        setLastTotal(total);
        setTotal(total);
        setNumPosts(n);
        const newInterval = setInterval(async () => { 
            setTotal(await fetchTotal());
        }, 60000);

        return () => {
            clearInterval(newInterval);
        } 
    }, []);

    useEffect(() => {
        if (total !== lastTotal) {
            setLastTotal(total);
            fetchN(numPosts);
            alert("New posts found!");
        }
    }, [total]);

    useEffect(() => {
        fetchN(numPosts);
    }, [numPosts]);

    const PageDiv = styled.div`
        padding-bottom: 15px;
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
        border-radius: 10px;
    `;
    
    const JumpBtn = styled.button`
        background-color: #30475e;
        font-size: 1.7vmin;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 12px 20px;
        margin: 8px 0;
        text-transform: uppercase;
        &:hover {
            opacity: 0.7;
        }
        float: right;
        right: 30px;
        bottom: 55px;
        z-index: 1;
        position: fixed;
    `;

    return (
        <PageDiv>
            <GridCont ref={topRef}>
                <Sidebar/>
                <PostsCont>
                    <ContentArea>
                        <h2>Newest Posts</h2>
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