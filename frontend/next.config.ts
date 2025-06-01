import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  images:{
    domains:['cdn3.vectorstock.com',"lh3.googleusercontent.com","i.pinimg.com","res.cloudinary.com"]
  },
};

export default nextConfig;
