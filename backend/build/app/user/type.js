"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
exports.types = `#graphql
type User {
id:ID!
firstName:String!
lastName:String
email:String!
password:String
profileImageUrl:String
followers: [User]
following: [User]
recommendedUsers: [User]
tweets :[Tweet] #ispe tweets honge ko tweet schema ke type ke honge

}
`;
