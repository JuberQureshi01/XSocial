import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider,QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools} from '@tanstack/react-query-devtools'

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    
    <div className={inter.className}>
      <QueryClientProvider client={queryClient}>
 <GoogleOAuthProvider clientId="370198205815-26r6kvfvnr6cl8vkv6uv6c7dkt2v4ce9.apps.googleusercontent.com">
      <Component {...pageProps} />{" "}
      <Toaster/>
      <ReactQueryDevtools/>
      </GoogleOAuthProvider>
    </QueryClientProvider>
    </div>
    
  );
}
