import Image from "next/image";
import React, { useCallback, useState } from "react";
import FeedCard from "@/components/FeedCard";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import TweeterLayout from "@/components/FeedCard/layout/TweeterLayout";
import { GetServerSideProps } from "next";
import { graphqlClient } from "@/client/api";
import { getAllTweetQuery } from "@/graphql/query/tweet";
import { GetAllTweetsQuery, Tweet } from "@/gql/graphql";
import { IoImageOutline } from "react-icons/io5";
import { useCurrentUser } from "@/hooks/user";

interface HomeProps {
  tweets?: Tweet;
}

export default function Home(props: HomeProps) {
  const { mutate } = useCreateTweet();
  const [content, setContent] = useState("");
  const { user } = useCurrentUser();
  const { tweets = props?.tweets } = useGetAllTweets();
  const [url, setUrl] = useState<string | null>(null);

  const handleUploadImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      // console.log(data)
      setUrl(data.secure_url);
    };

    input.click();
  };

  const handleCreateTweet = useCallback(async () => {
    mutate({
      content,
      imageURl: url,
    });

    setContent("");
    setUrl("");
  }, [content, mutate, url]);

  return (
    <div>
      <TweeterLayout>
        <div className="col-span-6 border-x-[0.5px] border-zinc-700 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none]">
          <div className="border-t-[0.5px] border-zinc-700 p-5  w-fit flex flex-wrap overflow-x-hidden">
            <div className="grid grid-cols-12 gap-2 ">
              <div className="col-span-1">
                {user?.profileImageUrl && (
                  <Image
                    src={user?.profileImageUrl}
                    alt="user-image"
                    className="rounded-full"
                    height={50}
                    width={50}
                  />
                )}
              </div>
              <div className="col-span-10 w-full ">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  name=""
                  placeholder="Write something"
                  className=" focus:outline-none text-xl px-3 w-full bg-transparent border-b border-zinc-700 [scrollbar-width:none] [-ms-overflow-style:none] "
                  rows={3}
                  id=""
                ></textarea>
                {url && (
                  <div className="relative ">
                    <Image
                      src={url}
                      alt="Uploaded image"
                      unoptimized
                      width={1}
                      height={1}
                      className="w-auto h-auto max-w-60 max-h-60 rounded-sm"
                    />
                  </div>
                )}
                <div className="mt-2 flex gap-6 items-center ">
                  <div className="text-center mt-4">
                    <IoImageOutline
                      onClick={handleUploadImage}
                      className="text-xl hover:text-sky-500 cursor-pointer"
                    />
                  </div>
                  <button
                    onClick={handleCreateTweet}
                    className="rounded-full bg-white  text-black text-lg py-1.5 px-4 hover:bg-zinc-200 cursor-pointer "
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
          {(tweets as Tweet[]).map((tweet: Tweet) =>
            tweet ? <FeedCard key={tweet.id} data={tweet} /> : null
          )}
        </div>
      </TweeterLayout>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const getAllTweets = await graphqlClient.request<GetAllTweetsQuery>(
    getAllTweetQuery
  );
  return {
    props: {
      tweets: getAllTweets.getAllTweets,
    },
  };
};
