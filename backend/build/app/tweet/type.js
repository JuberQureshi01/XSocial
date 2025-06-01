"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
exports.types = `#graphql

input CreateTweetData {
    content :String!
    imageURl:String
}

type Tweet{
    id:ID!
    content:String!
    imageURl:String
    author:User #author is a type of user
}
`;
