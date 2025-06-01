// import { graphql } from "../../gql"; //firstly import it from graphql then start server of codegen then import from here

import { gql } from "graphql-request";

export const verifyUserGoogleTokenQuery = gql`
  query verifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`;

export const getCurrentUserQuery = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      profileImageUrl
      email
      firstName
      lastName
      recommendedUsers {
        id
        firstName
        lastName
        profileImageUrl
      }
      followers {
        id
        firstName
        lastName
        profileImageUrl
      }
      following {
        id
        firstName
        lastName
        profileImageUrl
      }
      tweets {
        id
        content
        author {
          firstName
          lastName
          profileImageUrl
        }
      }
    }
  }
`;

export const getUserByIdQuery = gql`
  query GetuserById($id: ID!) {
    getUserById(id: $id) {
      id
      firstName
      lastName
      profileImageUrl
      followers {
        id
        firstName
        lastName
        profileImageUrl
      }
      following {
        id
        firstName
        lastName
        profileImageUrl
      }
      tweets {
        content
        id
        imageURl
        author {
          id
          firstName
          lastName
          profileImageUrl
        }
      }
    }
  }
`;
