export interface JWTUser {
    id:string,
    email:string,
}

export interface GraphqlContext{
    user?:JWTUser;
}

export interface createTweetPayload{
    content:string
    imageURl?:string
    userId:string
}