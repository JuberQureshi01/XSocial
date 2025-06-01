 export const queries = `#graphql
 verifyGoogleToken(token:String!):String
 getCurrentUser:User  #we cam use here param as well but we'll go with headers
 getUserById(id:ID!):User
 `