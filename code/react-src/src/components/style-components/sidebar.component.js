import React from 'react'
import styled from '@emotion/styled';

import { useStoreState } from 'easy-peasy';
import { Link, useHistory } from 'react-router-dom';

/** @jsxImportSource @emotion/react */

const SidebarCont = styled.div`
    background-color: white;
    width: 20vw;
    height: 50vh;
    display: inline-block;
    position: fixed;
    left: 8vw;
    top: 7vh;
    border-radius: 10px;
`;

const ContentArea = styled.div`
    padding: 2vh;
    h3{
        font-size: 3.2vmin;
        margin: 0;
    }
`;

const Username = styled.h3`
    color: #202020;
`;

const GenreEntry = styled.div`
    margin: 1vh 0;
    font-weight: 400;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

function Sidebar() {

    const myaccount = useStoreState((state) => state.myAccount);
    const genres = useStoreState((state) => state.genreList);

    
    const history = useHistory();

    const redirect = (genre) => {
        history.push(`/viewposts?genre=${genre}`);
    }

    return (
        <div>
            <SidebarCont>
                <ContentArea>
                    {myaccount.account && (
                        <div>
                            <Username>{myaccount.account.username}</Username>
                            <Link to={"/myaccount"}>View my profile</Link>
                            <hr></hr>
                        </div>
                    )}
                    <h3>Quick List</h3>
                    {genres && genres.map(genre => {
                        return <GenreEntry key={genre.key} css={{color: genre.colorCode}} onClick={e => redirect(genre.key)}>{genre.name}</GenreEntry>
                    })}
                </ContentArea>
            </SidebarCont>
        </div>
    )
}

export default Sidebar;