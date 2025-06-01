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
const app = (0, express_1.default)();
// ✅ Middleware setup (ORDER MATTERS)
app.use((0, cors_1.default)()); // Allows cross-origin requests
app.use(express_1.default.json()); // Required for parsing JSON bodies
// app.use(bodyParser.json()); // Extra JSON parsing
// app.use(bodyParser.urlencoded({ extended: true })); // Optional for form data
const initserver = () => __awaiter(void 0, void 0, void 0, function* () {
    const typeDefs = `
        type Query {
            sayHello: String
        }
    `;
    const resolvers = {
        Query: {
            sayHello: () => "Hello from GraphQL!",
        },
    };
    const server = new server_1.ApolloServer({ typeDefs, resolvers });
    yield server.start();
    app.use("/graphql", (0, express4_1.expressMiddleware)(server));
    return app;
});
exports.initserver = initserver;
(0, exports.initserver)();
