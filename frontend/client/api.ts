import { GraphQLClient } from "graphql-request";

const isClient = typeof window !="undefined";

export const graphqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_CLOUDINARY_API_URL as string,{ //base url with this { here query },{here params} send for graphql 
    headers:()=>({
        authorization: isClient?(`Bearer ${window.localStorage.getItem('token')}`):"",
    })
})