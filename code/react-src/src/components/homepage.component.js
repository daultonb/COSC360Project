import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useStoreActions, useStoreState } from 'easy-peasy';


function Homepage() {
    const fetchPosts = useStoreActions((actions) => actions.fetchPosts);
    const fetchN = useStoreActions((actions) => actions.fetchNPosts);
    const fetchTotal = useStoreActions((actions) => actions.fetchTotal);
    const [hasMore, setHasMore] = useState(false);
    const n = 5;
    const [numPosts, setNumPosts] = useState(n);
    const posts = useStoreState((state) => state.posts);
    const total = useStoreState((state) => state.total);

    const getNewPosts = ()=> {
        console.log("Getting New Posts.");
        console.log(total);
        if(hasMore){
            fetchN(numPosts);
            setNumPosts(numPosts+n);
            if(numPosts >= total){
                console.log("numPosts===total");
                console.log(total);
                console.log(numPosts);
                setHasMore(false);
            }
        }else{
            console.log("hasMore is False");
        }
    }

    useEffect(async() => {
        await fetchTotal();
        fetchN(numPosts);
        console.log("fetches Complete.");
        console.log(total);
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
                        <InfiniteScroll
                        dataLength={total}
                        next={getNewPosts()}
                        hasMore={hasMore}
                        loader={<h3>Loading New Posts...</h3>}
                        >
                        {posts.map((post, index) => {
                        return <PostContent key={index}>
                            <h1>{post.title}</h1>
                            <p>{post.description}</p>
                            <p>{post.username}</p>
                            <p>{post.createdAt}</p>
                        </PostContent>;
                        })}
                        </InfiniteScroll>
                        
                    </ContentArea>
                </PostCont>
            </GridCont>
        </PageDiv>
    )
}


export default Homepage;