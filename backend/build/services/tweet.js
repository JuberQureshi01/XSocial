"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../clients/db");
const redis_1 = require("../clients/redis/redis");
class TweetService {
    static getAllTweets() {
        return __awaiter(this, void 0, void 0, function* () {
            const cachedTweet = yield redis_1.redisClient.get('ALL-TWEETS');
            if (cachedTweet)
                return JSON.parse(cachedTweet);
            const tweets = yield db_1.prismaClient.tweet.findMany({ orderBy: { createdAt: "desc" } });
            yield redis_1.redisClient.set('ALL-TWEETS', JSON.stringify(tweets));
            return tweets;
        });
    }
    static createTweet(payload, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // const checkLimitFlag = await redisClient.get(`RATE_LIMIT:TWEET:${ctx?.user?.id}`)
            // if(checkLimitFlag){
            //     throw new Error("Please Wait.....")
            // }
            const tweet = yield db_1.prismaClient.tweet.create({
                data: {
                    content: payload.content,
                    imageURl: payload.imageURl,
                    author: { connect: { id: (_a = ctx === null || ctx === void 0 ? void 0 : ctx.user) === null || _a === void 0 ? void 0 : _a.id } },
                }
            });
            // await redisClient.setex(`RATE_LIMIT:TWEET:${ctx?.user?.id}`,10,1);
            yield redis_1.redisClient.del('ALL-TWEETS');
            return tweet;
        });
    }
}
exports.default = TweetService;
