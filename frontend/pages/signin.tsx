import Signin from '@/components/Auth/Signin'
import React from 'react'

function signin() {
  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 bg-black text-white items-center justify-center p-8">
        <div className="max-w-sm space-y-6 text-center">
          <h1 className="text-4xl font-bold">X Social Media</h1>
          <p className="text-gray-300">
            Join a growing network of thinkers, creators, and community voices.
            Discover what people are talking about in real time.
          </p>
          <p className="text-sm text-gray-400">
            Safe, secure & always connected. Your network, your voice.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
       <div>
          <h2 className="text-3xl font-bold w-[90%] md:w-[65%] mb-2">Welcome Back 👋</h2>
          <p className="text-gray-500">
            Sign in to your account to access the latest posts, connect with friends, and explore the community.
          </p>
        </div>
        <div className="max-w-md w-full"><Signin/></div>
      </div>
    </div>
  )
}

export default signin