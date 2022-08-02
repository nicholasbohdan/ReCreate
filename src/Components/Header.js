import React from 'react';
import { css } from '@emotion/css';

function Header(){
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
                    max-width: 90%;
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
                    max-width: 90%;
                    display: block; 
                    color: white;
                    padding: 14px 16px;
                `}
                >
                    <a
                    className={css`
                        text-decoration: none;
                        color: inherit;
                        padding-right: 4px;
                    `}
                    href="/">AnimeList</a>| 
                    <a
                    className={css`
                        padding-left: 4px;
                        text-decoration: none;
                        color: inherit;
                    `}
                    href="/collection">Collection</a>
                </nav>
            </div>
        </div>
    )
}
export default Header;