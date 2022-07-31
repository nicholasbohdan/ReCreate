import { gql } from "@apollo/client";
export const GET_ANIME_DATA_LIST = gql`
  query get {
    Page(page : 1){
        pageInfo {
            total
            perPage
            currentPage
            lastPage
            hasNextPage
        }
        mediaList{
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
                bannerImage
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