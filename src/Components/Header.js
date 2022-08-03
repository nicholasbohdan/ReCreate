import React, { useContext, useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { GET_ANIME_SEARCH_LIST } from '../actions/anime';
import { AnimeListContext } from '../context/Context';
import { useLazyQuery } from '@apollo/client';
import { NavLink } from 'react-router-dom';

function Header(){
    const { dataContext, setDataContext } = useContext(AnimeListContext);
    const [ searchValue, setSearchValue ] = useState();
    const [getListAnimeSearch, { data }] = useLazyQuery(GET_ANIME_SEARCH_LIST);
    useEffect(()=>{
        if(data){
            setDataContext({
                ...dataContext,
                animeSearchList: data.Page.media
            })
        }
    },[data])
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
        // getListAnimeSearch({
        //     variables: { 
        //         page: 1,
        //         search: searchValue
        //     }
        // })
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
                                    padding: 8px 16px;
                                `}
                                disabled={dataContext === null ? true : false}
                            type="text" placeholder="Search.." name="search" onChange={(e)=>handleOnChange(e)}/>
                            <button
                                className={css`
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
                        padding-right: 4px;
                    `}
                    to="/anime-list">AnimeList</NavLink>| 
                    <NavLink
                    className={css`
                        padding-left: 4px;
                        text-decoration: none;
                        color: inherit;
                    `}
                    to="/collection">Collection</NavLink>
                </nav>
            </div>
        </div>
    )
}
export default Header;