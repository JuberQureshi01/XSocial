import { gql } from "graphql-request";

export const createTweetMutation = gql
  `#graphql
  mutation CreateTweet($payload:CreateTweetData!){
    createTweet(payload:$payload){
        id
    }
  }
  `;
