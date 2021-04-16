import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useStoreActions, useStoreState } from 'easy-peasy';

import Button from './style-components/button.component';
import { useHistory } from 'react-router-dom';

const GenreList = styled.div`
    margin: 10vh auto;
    width: 50%;
`;

const GenreEntry = styled.div`
    background-color: white;
    padding: 2vh;
    margin: 1em;
`;

function Genres() {
    const genres = useStoreState((state) => state.genreList);

    const history = useHistory();

    const redirect = (genre) => {
        history.push(`/viewposts?genre=${genre}`);
    }

    return (
        <GenreList>
            {genres && genres.map(genre => {
                return (
                    <GenreEntry key={genre.key}>
                        <h1 style={{color: genre.colorCode, fontWeight: 400}}>{genre.name}</h1>
                        <p>{genre.description}</p>
                        <Button type={"button"} text={"View Posts"} onClick={e => redirect(genre.key) }width={"100%"} ></Button>
                    </GenreEntry>
                )
            })}
        </GenreList>
    )
}

export default Genres
