import { gql } from "graphql-request";

export const getAllTweetQuery = gql`
  query GetAllTweets {
    getAllTweets {
      id
      content
      imageURl
      author {
        id
        firstName
        lastName
        profileImageUrl
      }
    }
  }
`;
