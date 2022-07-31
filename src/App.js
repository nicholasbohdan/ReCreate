import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { css } from '@emotion/css';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Home from './Components/Home';

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <nav 
            className={css`
                width: 100%;
                margin: 0 auto;
                text-align: center;
                max-width: 80%
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
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path='/contact' component={Contact} />
            <Route path='/about' component={About} /> */}
        </Routes>
      </ApolloProvider>
    </Router>
  );
}

export default App;
