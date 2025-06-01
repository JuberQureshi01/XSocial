
import axios from "axios";
import { prismaClient } from "../clients/db";
import { generateToken } from "./jwt";
import { redisClient } from "../clients/redis/redis";

interface tokenResults {
  azp?: String;
  aud?: string;
  sub?: string;
  email?: string;
  email_verified?: string;
  nbf?: string;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  iat?: string;
  exp?: string;
  jti?: string;
  alg?: string;
  kid?: string;
  typ?: string;
}

class UserService {
    public static async verifyGoogleAuthToken(token:string){
        const googleToken = token;
            const googleOauthUrl = new URL("https://oauth2.googleapis.com/tokeninfo");
            googleOauthUrl.searchParams.set("id_token", googleToken);
        
            const { data } = await axios.get<tokenResults>(googleOauthUrl.toString(), {
              //<tokenResults> for safety purpose cause it check the current coming data make the <tokenResults>
              responseType: "json",
            });
            // console.log(data.email);
            // console.log(token);
        
            const user = await prismaClient.user.findUnique({
              where: { email: data.email },
            });
            if (!user) {
              await prismaClient.user.create({
                data: {
                  email: data.email ?? "",
                  firstName: data.given_name ?? "",
                  lastName: data.family_name,
                  profileImageUrl: data.picture,
                },
              });
    }
    // console.log(user);
        const userInDb = await prismaClient.user.findUnique({
          where: {
            email: data.email,
          },
        });
        if (!userInDb) throw new Error("user with email not found");
        const userToken = await generateToken(userInDb);
        return userToken;
}

public static async getUserById(id:string){
   const user = prismaClient.user.findUnique({
      where: {
        id,
      },
    });
    return user;
}

public static async getCurrentUser(id:string){
  if (!id) {
      return null;
    }

    const user = await prismaClient.user.findUnique({ where: { id } });
    return user;
}

 public static followUser(from: string, to: string) {
    return prismaClient.follows.create({
      data: {
        followers: { connect: { id: from } },
        following: { connect: { id: to } },
      },
    });
  }

  public static unfollowUser(from: string, to: string) {
    return prismaClient.follows.delete({
      where: { followerId_followingId: { followerId: from, followingId: to } },
    });
  }


}

export default UserService;