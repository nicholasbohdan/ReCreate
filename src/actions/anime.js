import { gql } from "@apollo/client";
export const GET_ANIME_DATA_LIST = gql`
  query get($page: Int) {
    Page(page : $page, perPage: 48){
        pageInfo {
            total
            perPage
            currentPage
            lastPage
            hasNextPage
        }
        mediaList(type:ANIME){
            media {
                title {
                    romaji
                    english
                    native
                    userPreferred
                }
                coverImage {
                  extraLarge
                  large
                  medium
                  color
                }
                id
                idMal
                season
                seasonYear
                type
                format
                status
                episodes
                duration
                isAdult
                averageScore
                popularity
                source
                countryOfOrigin
                isLicensed
                genres
            }
        }
  }
}
`;

export const GET_ANIME_SEARCH_LIST = gql`
  query get($page: Int, $search: String) {
    Page(page : $page, perPage: 48){
      pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
      }
      media(search: $search, isAdult: false){
          id
          idMal
          title {
            romaji
            english
            native
            userPreferred
          }
          coverImage {
            extraLarge
            large
            medium
            color
          }
      }
    }
}
`;

export const GET_ANIME_LIST_GENRE = gql`
  query get($page: Int, $genre: String) {
    Page(page : $page, perPage: 48){
      pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
      }
      media(genre: $genre, isAdult: false){
          id
          idMal
          title {
            romaji
            english
            native
            userPreferred
          }
          coverImage {
            extraLarge
            large
            medium
            color
          }
      }
    }
}
`;

export const GET_ANIME_DATA_DETAIL = gql`
  query get($id: Int) {
    Media(id: $id){
      id
      idMal
      title {
        romaji
        english
        native
        userPreferred
      }
      type
      format
      status
      description
      season
      seasonYear
      episodes
      duration
      chapters
      volumes
      countryOfOrigin
      hashtag
      trailer {
        id
        site
        thumbnail
      }
      coverImage {
        extraLarge
        large
        medium
        color
      }
      bannerImage
      genres
      popularity
      averageScore
      meanScore
      siteUrl
      reviews {
        edges {
          node {
            id
            rating
            ratingAmount
            score
          }
        }
      }
      rankings {
        id
        rank
        type
        format
        year
        season
        allTime
        context
      }
      characters {
        edges {
          id
          node{
            name {
              first
              middle
              last
              full
              native
              userPreferred
            }
            image {
              large
              medium
            }
            description
            gender
            
          }
        }
      }
      staff {
        edges {
          id
          node{
            id
            name {
              first
              middle
              last
              full
              native
              userPreferred
            }
            image {
              large
              medium
            }
            description
            gender
            age
          }
        }
      }
      studios {
        edges {
          id
          node{
            id
            name
            isAnimationStudio
            siteUrl
          }
        }
      }
     }
}
`;

export const GET_ALL_GENRES = gql`
  query get {
    GenreCollection
  }
`;

export const GET_ALL_TREND_ANIME = gql`
  query get {
    Page(page : 1, perPage: 10){
      mediaTrends(sort: POPULARITY){
          media {
              title {
                  romaji
                  english
                  native
                  userPreferred
              }
              coverImage {
                extraLarge
                large
                medium
                color
              }
              id
              idMal
              season
              seasonYear
              type
              format
              status
              episodes
              duration
              isAdult
              averageScore
              popularity
              source
              countryOfOrigin
              isLicensed
              genres
          }
      }
  }
}
`;