import React, {useEffect} from 'react'
import styled from '@emotion/styled';

import { useStoreActions, useStoreState } from 'easy-peasy';

function CreatePost() {
    const savePost = useStoreActions((actions) => actions.savePost);
    const fetchPosts = useStoreActions((actions) => actions.fetchPosts);
    const posts = useStoreState((state) => state.posts);
    
    useEffect(() => {
        fetchPosts();
    }, []);

    const InputField = styled.input`
        margin: 5px;
        border-radius:5px;
    `;

    const SaveButton = styled.button`
        margin: 5px;
        border-radius:5px;
        padding: 10px;
    `;

    return (
        <div> 
            <SaveButton type="buttom" onClick={() => savePost({"title": "my post1", "description": "my post 2", "username": "ross"})} />

            {posts && 
                <div>
                    <h1>Create Post</h1>
                    
                    <InputField type="textArea" id="desc" placeholder="Enter Description"></InputField>
                </div>
            }
        </div>
    )



}

export default CreatePost;