import React, { useMemo } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdHome, IoMdNotificationsOutline } from "react-icons/io";
import { IoSearchSharp, IoPersonOutline, IoMailOutline } from "react-icons/io5";
import { TbPremiumRights } from "react-icons/tb";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/user";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

import { User } from "@/gql/graphql";
import Signin from "@/components/Auth/Signin";

interface ṬwitterlayoutProps {
  children: React.ReactNode;
}

interface SidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const TweeterLayout: React.FC<ṬwitterlayoutProps> = (props) => {
  const { user } = useCurrentUser();
  // console.log(user)

  const SidebarMenuItems: SidebarButton[] = useMemo(
    () => [
      {
        title: "Home",
        icon: <IoMdHome />,
        link: "/",
      },
      { title: "Explore", icon: <IoSearchSharp />, link: "/" },
      {
        title: "Notifications",
        icon: <IoMdNotificationsOutline />,
        link: "/",
      },
      {
        title: "Messages",
        icon: <IoMailOutline />,
        link: "/",
      },
      {
        title: "Premium",
        icon: <TbPremiumRights />,
        link: "/",
      },
      {
        title: "Profile",
        icon: <IoPersonOutline />,
        link: `${user?.id}` || "/",
      },
    ],
    [user?.id]
  );

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen pl-0 pr-0 sm:pl-40 sm:pr-44 overflow-x-hidden ">
        <div className="col-span-2 pl-3  sm:col-span-3 flex flex-col justify-start pt-8">
          <div className="text-3xl h-fit w-fit hover:bg-zinc-800 rounded-full p-2 cursor-pointer transition-all ">
            <FaXTwitter />
          </div>
          <div className="mt-4 text-2xl font-bold">
            <ul>
              {SidebarMenuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    className="flex mt-2 w-fit font-light text-xl justify-start items-center gap-4  hover:bg-zinc-800 rounded-full p-2 cursor-pointer transition-all "
                    href={item.link}
                  >
                    <span
                      className="text-center
"
                      title={item.title}
                    >
                      {item.icon}
                    </span>
                    <span className="pr-2 hidden sm:inline ">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <button className=" hidden sm:inline rounded-full bg-white mt-8 text-black text-lg w-[90%] py-2.5 hover:bg-zinc-200 cursor-pointer ">
              Post
            </button>
           { !user&& <button className=" sm:hidden rounded-full bg-white mt-8 text-black text-lg w-fit p-2.5 hover:bg-zinc-200 cursor-pointer ">
              <FaGoogle />
            </button>}
          </div>
          {user ? (
            <div className="flex absolute bottom-4 px-2 py-1 hover:bg-zinc-800 cursor-pointer rounded-4xl items-center justify-center">
              <div className="pr-3">
                <Image
                  src={
                    user?.profileImageUrl
                      ? user?.profileImageUrl
                      : "https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg"
                  }
                  alt="Profile Image"
                  width={40}
                  height={40}
                  className="rounded-full h-10 w-10 object-cover"
                />
              </div>
              <div className=" min-w-24 w-fit pr-3 sm:block hidden">
                <h1>{user.firstName + " " + user.lastName}</h1>
                <p className="opacity-70 text-sm">@{user.firstName + "123"}</p>
              </div>
            </div>
          ) : null}
        </div>
        <div className="sm:col-span-6 col-span-10 border-x-[0.5px] border-zinc-700 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none]">
          {props.children}
        </div>
        <div className=" col-span-3">
          {!user ? (
              <Signin />
          ) : (
            <div className=" hidden md:block px-4 py-3 bg-black text-white rounded-lg">
              <h1 className="my-2 text-2xl mb-5">
                Users you may also like to follow
              </h1>
              {user?.recommendedUsers?.map((el: User) => (
                <div
                  className="flex items-center gap-3 mt-2 rounded-2xl px-2.5 hover:bg-zinc-600 bg-zinc-900 p-2"
                  key={el?.id}
                >
                  {el?.profileImageUrl && (
                    <Image
                      src={el?.profileImageUrl}
                      alt="user-image"
                      className="rounded-full"
                      width={60}
                      height={60}
                    />
                  )}
                  <div>
                    <div className="text-lg text-white mb-2">
                      {el?.firstName} {el?.lastName}
                    </div>
                    <Link
                      href={`/${el?.id}`}
                      className="bg-zinc-950 mt-3 text-white text-sm px-5 py-1 w-full rounded-lg"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TweeterLayout;
