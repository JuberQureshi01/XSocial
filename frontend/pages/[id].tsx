import TweeterLayout from "@/components/FeedCard/layout/TweeterLayout";
import { useCurrentUser } from "@/hooks/user";
import type { GetServerSideProps, NextPage } from "next";
import { BsArrowLeftShort } from "react-icons/bs";
import Image from "next/image";
import FeedCard from "@/components/FeedCard";
import { User } from "@/gql/graphql";
import { graphqlClient } from "@/client/api";
import { getUserByIdQuery } from "@/graphql/query/user";
import { useRouter } from "next/router";
import {  useCallback, useMemo } from "react";
import { followUserMutation, unfollowUserMutation } from "@/graphql/mutations/user";
import { useQueryClient } from "@tanstack/react-query";

interface ServerProps {
  userInfo?: User;
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
  const router = useRouter();
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  // console.log(props)
 const amIFollowing = useMemo(() => {
    if (!props.userInfo) return false;
    return (
      (user?.following?.findIndex(
        (el) => el?.id === props.userInfo?.id
      ) ?? -1) >= 0
    );
  }, [user?.following, props.userInfo]);

  const handleFollowUser = useCallback(async () => {
    if (!props.userInfo?.id) return;

    await graphqlClient.request(followUserMutation, { to: props.userInfo?.id });
    await queryClient.invalidateQueries(["curent-user"]);
  }, [props.userInfo?.id, queryClient]);

  const handleUnfollowUser = useCallback(async () => {
    if (!props.userInfo?.id) return;

    await graphqlClient.request(unfollowUserMutation, {
      to: props.userInfo?.id,
    });
    await queryClient.invalidateQueries(["curent-user"]);
  }, [props.userInfo?.id, queryClient]);

  return (
    <div>
      <TweeterLayout>
        <div>
          <nav className="flex items-center gap-3 p-3">
            <BsArrowLeftShort
              className="text-4xl cursor-pointer hover:text-zinc-400 "
              onClick={() => router.back()}
            />
            <div>
              <h1 className="text-2xl font-bold">{`${props.userInfo?.firstName} ${props.userInfo?.lastName}`}</h1>
              <h1 className="text-md font-bold text-slate-500">
                No. of Post is {props.userInfo?.tweets.length || 0}
              </h1>
            </div>
          </nav>
          <div className="p-4 border-b border-slate-600 ">
            {user?.profileImageUrl && (
              <Image
                src={props.userInfo?.profileImageUrl}
                alt="User-image"
                width={100}
                className="rounded-full"
                height={100}
              />
            )}
            <h1 className="text-2xl font-bold mt-5">
              {props.userInfo?.firstName} {props.userInfo?.lastName}
            </h1>
            <div className="flex justify-between items-center">
              {" "}
              <div className="flex gap-4 mt-2 text-sm text-gray-400">
                <span>{props.userInfo?.followers?.length} Followers</span>
                <span>{props.userInfo?.following?.length} Following</span>
              </div>
              {user?.id != props.userInfo?.id && (
                <>
                  {amIFollowing ? (
                    <button onClick={handleUnfollowUser} className="bg-white text-black px-3 py-1 rounded-full ">
                      Unfollow
                    </button>
                  ) : (
                    <button onClick={handleFollowUser} className="bg-white text-black px-3 py-1 rounded-full ">
                      Follow
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <div>
            {props.userInfo?.tweets?.map((tweet) =>
              tweet ? <FeedCard data={tweet} key={tweet.id} /> : null
            )}
          </div>
        </div>
      </TweeterLayout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string | undefined;
  if (!id) {
    return { notFound: true, props: { user: undefined } };
  }
  const userInfo = await graphqlClient.request(getUserByIdQuery, { id });
  console.log("solve karo", userInfo);
  if (!userInfo?.getUserById) {
    return { notFound: true };
  }
  return {
    props: {
      userInfo: userInfo.getUserById as User,
    },
  };
}; //server side rendering kari h yha so that it makes out page more fast AND SECURE ANS SEO FRIENDLY

export default UserProfilePage;
