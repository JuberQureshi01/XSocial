import { Tweet } from "@prisma/client"
import { prismaClient } from "../../clients/db"
import {createTweetPayload, GraphqlContext} from "../../types/interfaces"
import TweetService from "../../services/tweet"

const queries = {
    getAllTweets:()=>TweetService.getAllTweets()
}

const mutations={
    createTweet:async(parent:any,{payload}:{payload:createTweetPayload},ctx:GraphqlContext)=>{
        if(!ctx.user) throw new Error("Logged in first")
           return await TweetService.createTweet(payload,ctx);
    },
}
const extraResolvers ={
    Tweet :{
        author:(parent:Tweet)=> prismaClient.user.findUnique({where:{id:parent.authorId}})
    }
}

export const resolvers = {mutations,extraResolvers,queries};