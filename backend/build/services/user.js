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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const db_1 = require("../clients/db");
const jwt_1 = require("./jwt");
class UserService {
    static verifyGoogleAuthToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const googleToken = token;
            const googleOauthUrl = new URL("https://oauth2.googleapis.com/tokeninfo");
            googleOauthUrl.searchParams.set("id_token", googleToken);
            const { data } = yield axios_1.default.get(googleOauthUrl.toString(), {
                //<tokenResults> for safety purpose cause it check the current coming data make the <tokenResults>
                responseType: "json",
            });
            // console.log(data.email);
            // console.log(token);
            const user = yield db_1.prismaClient.user.findUnique({
                where: { email: data.email },
            });
            if (!user) {
                yield db_1.prismaClient.user.create({
                    data: {
                        email: (_a = data.email) !== null && _a !== void 0 ? _a : "",
                        firstName: (_b = data.given_name) !== null && _b !== void 0 ? _b : "",
                        lastName: data.family_name,
                        profileImageUrl: data.picture,
                    },
                });
            }
            // console.log(user);
            const userInDb = yield db_1.prismaClient.user.findUnique({
                where: {
                    email: data.email,
                },
            });
            if (!userInDb)
                throw new Error("user with email not found");
            const userToken = yield (0, jwt_1.generateToken)(userInDb);
            return userToken;
        });
    }
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = db_1.prismaClient.user.findUnique({
                where: {
                    id,
                },
            });
            return user;
        });
    }
    static getCurrentUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return null;
            }
            const user = yield db_1.prismaClient.user.findUnique({ where: { id } });
            return user;
        });
    }
    static followUser(from, to) {
        return db_1.prismaClient.follows.create({
            data: {
                followers: { connect: { id: from } },
                following: { connect: { id: to } },
            },
        });
    }
    static unfollowUser(from, to) {
        return db_1.prismaClient.follows.delete({
            where: { followerId_followingId: { followerId: from, followingId: to } },
        });
    }
}
exports.default = UserService;
