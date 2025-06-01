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
exports.initserver = void 0;
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors")); // Added CORS
const user_1 = require("./user");
const jwt_1 = require("../services/jwt");
const index_1 = require("./tweet/index");
const app = (0, express_1.default)();
const initserver = () => __awaiter(void 0, void 0, void 0, function* () {
    const typeDefs = `
    ${user_1.User.types}
    ${index_1.Tweets.types}
        type Query {
           ${user_1.User.queries}
           ${index_1.Tweets.queries}
        }
        type Mutation{
        ${index_1.Tweets.mutations}
        ${user_1.User.mutations}
        }
    `;
    const resolvers = Object.assign(Object.assign({ Query: Object.assign(Object.assign({}, user_1.User.resolvers.queries), index_1.Tweets.resolvers.queries), Mutation: Object.assign(Object.assign({}, index_1.Tweets.resolvers.mutations), user_1.User.resolvers.mutations) }, index_1.Tweets.resolvers.extraResolvers), user_1.User.resolvers.extraResolvers);
    const server = new server_1.ApolloServer({ typeDefs, resolvers });
    yield server.start();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use("/graphql", (0, express4_1.expressMiddleware)(server, {
        context: (_a) => __awaiter(void 0, [_a], void 0, function* ({ req, res }) {
            const authHeader = req.headers.authorization;
            const token = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer "))
                ? authHeader.split("Bearer ")[1]
                : null;
            let user = null;
            if (token) {
                user = (0, jwt_1.decodeToken)(token);
            }
            return { user };
        }),
    }));
    return app;
});
exports.initserver = initserver;
(0, exports.initserver)();
