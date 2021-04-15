import React, {useEffect} from 'react'
import styled from '@emotion/styled';
import { useStoreActions, useStoreState } from 'easy-peasy';

import Button from '././style-components/button.component';
import Hyperlink from './style-components/hyperlink.component';

function PostsList() {
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
    `;

    const LoginInput = styled.input`
        border-radius:5px;
    `;

    const SaveButton = styled.button`
        border-radius:5px;
        padding: 10px;
    `;

    return (
        <PageDiv>
            <Hyperlink href={"https://www.google.ca"} target={"_blank"} text={"Link to Google"}/>
            <ul>
                {posts && posts.map((post, index) => {
                    return <li onClick={fetchPosts} className="post" key={index}>
                        <h1>{post.title}</h1>
                        <p>{post.description}</p>
                        <p>{post.username}</p>
                        <p>{post.createdAt}</p>
                        <Button text={"Delete"} onClick={() => removePost(post.id)}/>
                    </li>;
                })}
                
                <SaveButton type="button" onClick={() => savePost({"title": "my post1", "description": "my post 2", "username": "ross"})} />
                {posts && 
                    <div>
                        <h1>Testing</h1>
                        <LoginInput></LoginInput>
                    </div>
                }
            </ul>
        </PageDiv>
    )
}

export default PostsList;
