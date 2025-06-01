import { prismaClient } from "../clients/db";
import { redisClient } from "../clients/redis/redis";
import { createTweetPayload, GraphqlContext } from "../types/interfaces";

class TweetService{

    public static async getAllTweets(){
        const cachedTweet = await redisClient.get('ALL-TWEETS')
        if(cachedTweet) return JSON.parse(cachedTweet)
            const tweets= await prismaClient.tweet.findMany({orderBy:{createdAt:"desc"}})
        await redisClient.set('ALL-TWEETS',JSON.stringify(tweets));
        return tweets;
    }

    public static async createTweet(payload:createTweetPayload,ctx:GraphqlContext){
        // const checkLimitFlag = await redisClient.get(`RATE_LIMIT:TWEET:${ctx?.user?.id}`)
        // if(checkLimitFlag){
        //     throw new Error("Please Wait.....")
        // }
          const tweet =await prismaClient.tweet.create({
                data:{
                    content:payload.content,
                    imageURl:payload.imageURl,
                    author:{connect:{id:ctx?.user?.id}},
                }
                })
                // await redisClient.setex(`RATE_LIMIT:TWEET:${ctx?.user?.id}`,10,1);
                await redisClient.del('ALL-TWEETS')
                return tweet;
    }
}
export default TweetService;