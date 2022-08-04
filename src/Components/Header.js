import React, { useContext, useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { GET_ALL_GENRES } from '../actions/anime';
import { AnimeListContext } from '../context/Context';
import { useQuery } from '@apollo/client';
import { NavLink } from 'react-router-dom';

function Header(){
    const { dataContext, setDataContext } = useContext(AnimeListContext);
    const [newGenreList, setNewGenreList] = useState([]);
    const [ openFilter, setOpenFilter ] = useState(false);
    const [ searchValue, setSearchValue ] = useState();
    const { data: genreList, loading: isGenreListLoading } = useQuery(GET_ALL_GENRES);
    useEffect(()=>{
        if(!isGenreListLoading){
            let temp = genreList.GenreCollection.filter(row=>row !== 'Hentai');
            setDataContext({
                ...dataContext,
                genreList: temp
            })
            setNewGenreList(temp)
        }
    },[isGenreListLoading])

    const handleFilterbyGenres = (genre) => {
        setDataContext({
            ...dataContext,
            filter:{
                genre: genre
            }
        })
        setSearchValue()
    }

    const handleOpenFilterbyGenres = () => {
        setOpenFilter(!openFilter)
    }

    const handleOnChange = (e) => {
        setSearchValue(e.target.value)
    }
    const handleSearch = () => {
        setDataContext({
            ...dataContext,
            filter:{
                search: searchValue
            }
        })
    }
    const handleRemoveFilterGenre = () => {
        setDataContext({
            filter:{}
        })
    }
    return(
        <div
            className={css`
                width: 100%;
                background-color: #1a1a1a;
                padding-bottom: 12px;
            `}
        >
            <div
                className={css`
                    width: 100%;
                `}
            >
                <nav 
                className={css`
                    width: 100%;
                    margin: 0 auto;
                    max-width: 80%;
                    color: white;
                    background-color: #1a1a1a 
                    display: block; 
                    padding: 14px 16px;
                `}
                >
                    <label
                        className={css`
                            font-style: italic;
                            font-size: 24px;
                            font-weight: 700;
                        `}
                    >DaiFlix </label>
                    <div  
                        className={css`
                            float: right;
                            background: #1a1a1a;
                            font-size: 17px;
                            border: none;
                            cursor: pointer;
                        `}
                    >
                        
                            <input
                                className={css`
                                    @media (max-width: 600px) {
                                        padding: 8px 6px;
                                        margin: 0px;
                                    };
                                    padding: 8px 16px;
                                `}
                                disabled={dataContext === null ? true : false}
                            type="text" placeholder="Search.." name="search" onChange={(e)=>handleOnChange(e)}/>
                            <button
                                className={css`
                                    @media (max-width: 600px) {
                                        padding: 8px 6px;
                                        margin: 0px;
                                    };
                                    padding: 8px 16px;
                                `}
                                disabled={dataContext === null ? true : false}
                            id='submit'
                            onClick={()=>handleSearch()}><i class="fa fa-search"></i></button>
                        
                    </div>
                </nav>
            </div>
            <div
                className={css`
                    width: 100%;
                    background-color: #DA1212;
                `}
            >
                <nav 
                className={css`
                    width: 100%;
                    margin: 0 auto;
                    max-width: 80%;
                    display: block; 
                    color: white;
                    padding: 14px 16px;
                `}
                >
                    <NavLink
                    className={css`
                        text-decoration: none;
                        color: inherit;
                        padding-right: 6px;
                    `}
                    to="/anime-list">Anime List</NavLink>| 
                    <NavLink
                    className={css`
                        padding-left: 6px;
                        text-decoration: none;
                        color: inherit;
                    `}
                    to="/collection">Collection</NavLink>
                    {/* <p>A Collapsible:</p>
                    <button type="button" class="collapsible">Open Collapsible</button> */}
                    <button
                        className={css`
                            margin-left: 6px;
                            background-color: #DA1212;
                            color: white;
                            font-size: 14px;
                            cursor: pointer;
                            border: none;
                            outline: none;
                        `}
                        onClick={()=>handleOpenFilterbyGenres()}
                    >Filter By Genre</button>
                    {
                        (typeof dataContext?.filter !== 'undefined' && typeof dataContext?.filter !== {}) ? 
                        (typeof dataContext.filter.genre !== 'undefined' ? (
                            <button
                                className={css`
                                    margin-left: 6px;
                                    background-color: #DA1212;
                                    color: white;
                                    font-size: 14px;
                                    cursor: pointer;
                                    border: none;
                                    outline: none;
                                `}
                                onClick={()=>handleRemoveFilterGenre()}
                            >{dataContext.filter?.genre} ✘</button>
                        ) : null) : null
                    }
                    <dialog
                        className={css`
                            @media (max-width: 600px) {
                                left: 54vw;
                            };
                            background-color: #DA1212;
                            margin: 0px;
                            color: white;
                            list-style-type: none;
                            left: 21vw;
                            z-index: 6;
                        `}
                        open={openFilter}
                    >
                        {
                            newGenreList?.map((row, key)=>(
                                <li
                                    className={css`
                                        padding: 4px;
                                        cursor: pointer;
                                    `}
                                    key={key}
                                    onClick={()=>handleFilterbyGenres(row)}
                                >
                                    {row}
                                </li>
                            ))
                        }
                    </dialog>
                </nav>
            </div>
        </div>
    )
}
export default Header;