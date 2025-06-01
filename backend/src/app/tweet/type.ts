export const types = `#graphql

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
`