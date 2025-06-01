"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = `#graphql
 verifyGoogleToken(token:String!):String
 getCurrentUser:User  #we cam use here param as well but we'll go with headers
 getUserById(id:ID!):User
 `;
