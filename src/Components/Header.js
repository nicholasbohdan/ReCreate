import React, { useContext, useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { GET_ALL_GENRES } from '../actions/anime';
import { AnimeListContext } from '../context/Context';
import { useQuery } from '@apollo/client';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';
import { Button, Input } from '@mui/material';

function Header(){
    const { dataContext, setDataContext } = useContext(AnimeListContext);
    const [newGenreList, setNewGenreList] = useState([]);
    const [ openFilter, setOpenFilter ] = useState(false);
    const [ searchValue, setSearchValue ] = useState('');
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
        setSearchValue('')
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
    const handleClearSearch = () => {
        setDataContext({
            filter:{}
        })
        setSearchValue('')
    }
    return(
        <div>
            <Box 
                sx={{ flexGrow: 1 }}
                // style={{
                //     width: '100%',
                //     margin: '0 auto',
                //     maxWidth: '80%',
                //     color: 'white', 
                //     display: 'block', 
                //     padding: '14px 16px',
                // }}
                
                style={{
                    width: '100%',
                    backgroundColor: '#1a1a1a',
                    // paddingBottom: 12,
                }}
            >
                <AppBar
                    position="static"
                    // style={{
                    //     width: '100%',
                    //     margin: '0 auto',
                    //     maxWidth: '80%',
                    //     backgroundColor: '#1a1a1a',
                    //     color: 'white', 
                    //     display: 'block', 
                    //     padding: '14px 16px',
                    // }}
                    style={{
                        width: '100%',
                        backgroundColor: '#1a1a1a',
                        // paddingBottom: 12,
                    }}
                >
                    <Toolbar
                    style={{
                        width: '100%',
                        margin: '0 auto',
                        maxWidth: '80%',
                        backgroundColor: '#1a1a1a',
                        color: 'white', 
                        // display: 'block', 
                        // padding: '7px 8px',
                    }}
                    >
                    <Typography 
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                        style={{
                            fontStyle: 'italic',
                            fontSize: 24,
                            fontWeight: 700,
                        }}
                    >
                        DaiFlix
                    </Typography>
                    <InputBase 
                        style={{
                            color: 'white',
                            borderRadius: 12,
                            border: '2px solid #DA1212',
                            width: '20%',
                            backgroundColor: '#222',
                            padding: '4px 8px',
                            // paddingBottom: 12,
                        }}
                        placeholder='Search'
                    />
                    {/* <Button>Login</Button> */}
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
        
        // <div
        //     className={css`
        //         width: 100%;
        //         background-color: #1a1a1a;
        //         padding-bottom: 12px;
        //     `}
        // >
        //     <div
        //         className={css`
        //             width: 100%;
        //         `}
        //     >
        //         <nav 
        //         className={css`
        //             width: 100%;
        //             margin: 0 auto;
        //             max-width: 80%;
        //             color: white;
        //             background-color: #1a1a1a 
        //             display: block; 
        //             padding: 14px 16px;
        //         `}
        //         >
        //             <label
        //                 className={css`
        //                     font-style: italic;
        //                     font-size: 24px;
        //                     font-weight: 700;
        //                 `}
        //             >DaiFlix </label>
        //             <div  
        //                 className={css`
        //                     @media (max-width: 600px) {
        //                         width: 70%;
        //                     };
        //                     float: right;
        //                     background: #1a1a1a;
        //                     font-size: 17px;
        //                     border: none;
        //                     cursor: pointer;
        //                 `}
        //             >
        //                     <input
        //                         className={css`
        //                             @media (max-width: 600px) {
        //                                 padding: 8px 6px;
        //                                 width: 40%;
        //                             };
        //                             color: white;
        //                             border-radius: 12px;
        //                             border: 2px solid #DA1212;
        //                             background: #222;
        //                             padding: 8px 16px;
        //                             margin: 2px;
        //                             text-decoration: none;
        //                             cursor: pointer;
        //                             &:hover{
        //                                 color: white;
        //                                 background: #DA1212;
        //                             }
        //                         `}
        //                         disabled={dataContext === null ? true : false}
        //                         type="text"
        //                         placeholder="Search.."
        //                         name="search"
        //                         onChange={(e)=>handleOnChange(e)}
        //                         value={searchValue}
        //                     />
        //                     <button
        //                         className={css`
        //                             color: white;
        //                             border-radius: 12px;
        //                             border: 2px solid #DA1212;
        //                             background: #222;
        //                             padding: 8px 16px;
        //                             margin: 2px;
        //                             text-decoration: none;
        //                             cursor: pointer;
        //                             &:hover{
        //                                 color: white;
        //                                 background: #DA1212;
        //                             }
        //                         `}
        //                         disabled={dataContext === null ? true : false}
        //                     id='submit'
        //                     onClick={()=>handleSearch()}><i className="fa fa-search"></i></button>
        //                     {
        //                         typeof searchValue !== 'undefined' && searchValue !== '' ? (
        //                             <button
        //                                 className={css`
        //                                     color: white;
        //                                     border-radius: 12px;
        //                                     border: 2px solid #DA1212;
        //                                     background: #222;
        //                                     padding: 8px 16px;
        //                                     margin: 2px;
        //                                     text-decoration: none;
        //                                     cursor: pointer;
        //                                     &:hover{
        //                                         color: white;
        //                                         background: #DA1212;
        //                                     }
        //                                 `}
        //                                 disabled={dataContext === null ? true : false}
        //                                 id='submit'
        //                                 onClick={()=>handleClearSearch()}
        //                             >
        //                                 <i class="fa fa-close"></i>
        //                             </button>
        //                         ) : null
        //                     }
                        
        //             </div>
        //         </nav>
        //     </div>
        //     <div
        //         className={css`
        //             width: 100%;
        //             background-color: #DA1212;
        //         `}
        //     >
        //         <nav 
        //         className={css`
        //             width: 100%;
        //             margin: 0 auto;
        //             max-width: 80%;
        //             display: block; 
        //             color: white;
        //             padding: 14px 16px;
        //         `}
        //         >
        //             <NavLink
        //             className={css`
        //                 text-decoration: none;
        //                 color: inherit;
        //                 padding-right: 6px;
        //             `}
        //             to="/anime-list">Anime List</NavLink>| 
        //             <NavLink
        //             className={css`
        //                 padding-left: 6px;
        //                 text-decoration: none;
        //                 color: inherit;
        //             `}
        //             to="/collection">Collection</NavLink>
        //             {/* <p>A Collapsible:</p>
        //             <button type="button" class="collapsible">Open Collapsible</button> */}
        //             <button
        //                 className={css`
        //                     margin-left: 6px;
        //                     background-color: #DA1212;
        //                     color: white;
        //                     font-size: 14px;
        //                     cursor: pointer;
        //                     border: none;
        //                     outline: none;
        //                 `}
        //                 onClick={()=>handleOpenFilterbyGenres()}
        //             >Filter By Genre</button>
        //             {
        //                 (typeof dataContext?.filter !== 'undefined' && typeof dataContext?.filter !== {}) ? 
        //                 (typeof dataContext.filter.genre !== 'undefined' ? (
        //                     <button
        //                         className={css`
        //                             margin-left: 6px;
        //                             background-color: #DA1212;
        //                             color: white;
        //                             font-size: 14px;
        //                             cursor: pointer;
        //                             border: none;
        //                             outline: none;
        //                         `}
        //                         onClick={()=>handleRemoveFilterGenre()}
        //                     >{dataContext.filter?.genre} ✘</button>
        //                 ) : null) : null
        //             }
        //             <dialog
        //                 className={css`
        //                     @media (max-width: 600px) {
        //                         left: 54vw;
        //                     };
        //                     background-color: #DA1212;
        //                     margin: 0px;
        //                     color: white;
        //                     list-style-type: none;
        //                     left: 21vw;
        //                     z-index: 6;
        //                 `}
        //                 open={openFilter}
        //             >
        //                 {
        //                     newGenreList?.map((row, key)=>(
        //                         <li
        //                             className={css`
        //                                 padding: 4px;
        //                                 cursor: pointer;
        //                             `}
        //                             key={key}
        //                             onClick={()=>handleFilterbyGenres(row)}
        //                         >
        //                             {row}
        //                         </li>
        //                     ))
        //                 }
        //             </dialog>
        //         </nav>
        //     </div>
        // </div>
    )
}
export default Header;