export const types = `#graphql
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