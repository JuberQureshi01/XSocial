import { User } from "@prisma/client";
import JWT from "jsonwebtoken";
import { JWTUser } from "../types/interfaces";

const secretToken = 'hello123';
export const generateToken =(user: User) => {

  const payload :JWTUser = {
    id: user.id,
    email: user.email,
  }; //sending existing user why we dont send the entire user object due to security purpose

  const token = JWT.sign(payload, secretToken);
  return token;
};

export const decodeToken = (token: string) => {
  if (!token) {
    throw new Error("Token is missing");
  }
  try {
    return JWT.verify(token, secretToken) as JWTUser;
  } catch (error) {
    return null;
  }
};


