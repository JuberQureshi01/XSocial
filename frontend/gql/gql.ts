/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "#graphql\n  mutation CreateTweet($payload:CreateTweetData!){\n    createTweet(payload:$payload){\n        id\n    }\n  }\n  ": typeof types.CreateTweetDocument,
    "\n  #graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n": typeof types.FollowUserDocument,
    "\n  #graphql\n  mutation UnfollowUser($to: ID!) {\n    unfollowUser(to: $to)\n  }\n": typeof types.UnfollowUserDocument,
    "\n  query GetAllTweets {\n    getAllTweets {\n      id\n      content\n      imageURl\n      author {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n    }\n  }\n": typeof types.GetAllTweetsDocument,
    "\n  query verifyUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n": typeof types.VerifyUserGoogleTokenDocument,
    "\n  query getCurrentUser {\n    getCurrentUser {\n      id\n      profileImageUrl\n      email\n      firstName\n      lastName\n      recommendedUsers {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      followers {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      tweets {\n        id\n        content\n        author {\n          firstName\n          lastName\n          profileImageUrl\n        }\n      }\n    }\n  }\n": typeof types.GetCurrentUserDocument,
    "\n  query GetuserById($id: ID!) {\n    getUserById(id: $id) {\n      id\n      firstName\n      lastName\n      profileImageUrl\n      followers {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      tweets {\n        content\n        id\n        imageURl\n        author {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n      }\n    }\n  }\n": typeof types.GetuserByIdDocument,
};
const documents: Documents = {
    "#graphql\n  mutation CreateTweet($payload:CreateTweetData!){\n    createTweet(payload:$payload){\n        id\n    }\n  }\n  ": types.CreateTweetDocument,
    "\n  #graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n": types.FollowUserDocument,
    "\n  #graphql\n  mutation UnfollowUser($to: ID!) {\n    unfollowUser(to: $to)\n  }\n": types.UnfollowUserDocument,
    "\n  query GetAllTweets {\n    getAllTweets {\n      id\n      content\n      imageURl\n      author {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n    }\n  }\n": types.GetAllTweetsDocument,
    "\n  query verifyUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n": types.VerifyUserGoogleTokenDocument,
    "\n  query getCurrentUser {\n    getCurrentUser {\n      id\n      profileImageUrl\n      email\n      firstName\n      lastName\n      recommendedUsers {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      followers {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      tweets {\n        id\n        content\n        author {\n          firstName\n          lastName\n          profileImageUrl\n        }\n      }\n    }\n  }\n": types.GetCurrentUserDocument,
    "\n  query GetuserById($id: ID!) {\n    getUserById(id: $id) {\n      id\n      firstName\n      lastName\n      profileImageUrl\n      followers {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      tweets {\n        content\n        id\n        imageURl\n        author {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n      }\n    }\n  }\n": types.GetuserByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation CreateTweet($payload:CreateTweetData!){\n    createTweet(payload:$payload){\n        id\n    }\n  }\n  "): (typeof documents)["#graphql\n  mutation CreateTweet($payload:CreateTweetData!){\n    createTweet(payload:$payload){\n        id\n    }\n  }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation UnfollowUser($to: ID!) {\n    unfollowUser(to: $to)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UnfollowUser($to: ID!) {\n    unfollowUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllTweets {\n    getAllTweets {\n      id\n      content\n      imageURl\n      author {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllTweets {\n    getAllTweets {\n      id\n      content\n      imageURl\n      author {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query verifyUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n"): (typeof documents)["\n  query verifyUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getCurrentUser {\n    getCurrentUser {\n      id\n      profileImageUrl\n      email\n      firstName\n      lastName\n      recommendedUsers {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      followers {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      tweets {\n        id\n        content\n        author {\n          firstName\n          lastName\n          profileImageUrl\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getCurrentUser {\n    getCurrentUser {\n      id\n      profileImageUrl\n      email\n      firstName\n      lastName\n      recommendedUsers {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      followers {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      tweets {\n        id\n        content\n        author {\n          firstName\n          lastName\n          profileImageUrl\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetuserById($id: ID!) {\n    getUserById(id: $id) {\n      id\n      firstName\n      lastName\n      profileImageUrl\n      followers {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      tweets {\n        content\n        id\n        imageURl\n        author {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetuserById($id: ID!) {\n    getUserById(id: $id) {\n      id\n      firstName\n      lastName\n      profileImageUrl\n      followers {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      tweets {\n        content\n        id\n        imageURl\n        author {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;