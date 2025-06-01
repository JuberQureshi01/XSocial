import React from "react";
import Image from "next/image";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { CgLoadbarSound } from "react-icons/cg";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";

interface FeedCardProops {
  data: Tweet;
}

const FeedCard: React.FC<FeedCardProops> = (props) => {
  const { data } = props;
  // console.log("ye aarha hai ",data);
  return (
    <div className="border-t-[0.5px] border-zinc-700 p-5 hover:bg-zinc-900 transition-all cursor-pointer w-fit flex flex-wrap overflow-x-hidden">
      <div className="grid grid-cols-12 gap-2 ">
        <div className="col-span-1">
          <Link href={data?.author?.id || "/"}>
            {data.author?.profileImageUrl && (
              <Image
                src={data.author.profileImageUrl}
                alt="user-image"
                className="rounded-full"
                height={50}
                width={50}
              />
            )}
          </Link>
        </div>
        <div className="col-span-11">
          { data.author&&
            <Link href={data.author?.id}>
              <h5>
                {data.author?.firstName} {data.author?.lastName}
              </h5>
            </Link>
          }
          <p>{data.content}</p>
          {data.imageURl && (
            <Image
              src={data.imageURl}
              alt="user-image"
              className=" flex justify-center py-2 h-[250px] w-[390px] rounded-md"
              height={80}
              width={250}
            />
          )}
          <div className="flex justify-between mt-5 ">
            <div className="flex items-center gap-1 text-md hover:text-sky-300  ">
              <FaRegComment />
              <p className="">12k</p>
            </div>
            <div className="flex items-center gap-1 text-md  hover:text-green-300 ">
              <FaRetweet />
              <p>12k</p>
            </div>
            <div className="flex items-center gap-1 text-md  hover:text-red-400 ">
              <CiHeart />
              <p>12k</p>
            </div>
            <div className="flex items-center gap-1 text-md pr-4  hover:text-sky-300 ">
              <CgLoadbarSound />
              <p>12k</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
