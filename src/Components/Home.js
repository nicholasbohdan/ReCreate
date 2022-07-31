import { useLazyQuery } from '@apollo/client';
import { css } from '@emotion/css';
import React from 'react';
import { GET_ANIME_DATA_LIST } from '../actions/anime';

function Home(){
    
    const [getListAnime, { data }] = useLazyQuery(GET_ANIME_DATA_LIST);
    React.useEffect(() => {
        getListAnime({
            variables: {
                page: 1,
            },
        });
        // eslint-disable-next-line
      }, [getListAnime]);
      
      console.log(data)
    return(
        <div
            className={css`
                width: 100%;
                max-width: 80vw;
                margin: 0 auto;
                text-align: center;
            `}
        >
            <ul 
                className={css`
                    display: table;
                    margin: 0 auto;
                    list-style-type: none;
                    width: 100%;
                    padding: 0px;
                `}
            >
                {!data?
                <div> Loading... </div>
                    : data.Page.mediaList.map((row, key)=>(
                    <li
                        className={css`  
                            float: left;
                            width: 18.35%;
                            margin: 10px;
                            height: 300px
                        `}
                    key={key}>
                        <img 
                            className={css`  
                                object-fit: cover;
                                float: left;
                                width: 100%;
                                height: 237px;
                            `}
                        src={row.media.bannerImage} />
                        <div
                            className={css`
                                background: linear-gradient(to top,rgba(0, 0, 0, 0.83) 0,rgba(0,0,0,.05) 50%,rgba(0,0,0,.05) 50%,rgba(0, 0, 0, 0) 100%);
                                z-index: 1;
                                width: 100%;
                                height: 100%;
                                position: relative;
                                top: -60px;
                                color: white;
                            `}
                        >
                            <lable
                            className={css`
                                font-size: 16px;
                                line-height: 21px;
                            `}
                            >
                                {row.media.title.userPreferred}
                            </lable>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Home;