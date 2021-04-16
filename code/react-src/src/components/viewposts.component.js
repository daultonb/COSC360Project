import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useStoreActions } from 'easy-peasy';

import { useLocation } from 'react-router-dom';
import Posts from './posts.component';

const Results = styled.div`
    margin: 10vh auto;
    width: 50%;
    padding: 2vh;
    background-color:white;
    border-radius: 10px;
`;

function ViewPosts() {
    const getPosts = useStoreActions((actions) => actions.fetchPostsByGenre);
    const location = useLocation();
    const [showAlert, setShowAlert] = useState(false);

    const useQuery = () => {
        return new URLSearchParams(location.search);
    }

    const params = useQuery();

    useEffect(async () => {
        if (params.get("genre")) {
            const posts = await getPosts(params.get("genre"));
            if (posts === 0) {
                setShowAlert(true);
            }
        }
    }, []);

    return (
        <Results>
            <h2>Viewing posts: {params.get("genre")}</h2>
            {showAlert ? "No search results found" : <Posts></Posts>}
        </Results>
    )
}

export default ViewPosts;
