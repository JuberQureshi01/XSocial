
import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "@/client/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

function Signin() {
  const router = useRouter();
    const queryClient = useQueryClient();
    // console.log(router.pathname)
  const handleLoginWithGoogle = async (cred: CredentialResponse) => {
    const googleToken = cred.credential;
    const token_exist = localStorage.getItem("token");
    if (token_exist) {
      localStorage.removeItem("token");
    }
    // console.log(googleToken);

    if (!googleToken) {
      return toast.error("There is some error try again ");
    }
    // console.log(googleToken)
    const { verifyGoogleToken } = await graphqlClient.request(
      verifyUserGoogleTokenQuery,
      { token: googleToken }
    );
    if(router.pathname!='/'){
   router.push("/")
    }

    toast.success("Welcome");
    // console.log(verifyGoogleToken);
    if (verifyGoogleToken) {
      window.localStorage.setItem("token", verifyGoogleToken);

      // Query invalidate kar rahe hain taaki naya data fetch ho jaaye (current user ke liye )
      // Pehle wali cache clear hogi aur naye token ke saath fresh data milega
      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    }
  };
  return (
    <div
      className="bg-zinc-900 p-5 flex items-center justify-center gap-3 flex-col
     rounded-lg"
    >
      <h1>SignIn with Google</h1>
      <p className="h-[1px] w-full bg-zinc-700"></p>
      <GoogleLogin
        onSuccess={(credential) => handleLoginWithGoogle(credential)}
      />
    </div>
  );
}

export default Signin;
