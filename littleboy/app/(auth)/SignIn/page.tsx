"use client";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import React, { useContext } from "react";
import { MailOpen } from "lucide-react";
import { GetAuthUserData } from "@/services/GlobalApi";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

function SignIn() {
  const router = useRouter();
  const CreateUser = useMutation(api.users.CreateUser);
  const { user, setUser } = useContext(AuthContext);
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      if (typeof window !== "undefined") {
        localStorage.setItem("user_token", tokenResponse.access_token);
      }
      const user = await GetAuthUserData(tokenResponse.access_token);
      console.log(user);
      const result = await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
      });
      // console.log("--", result);
      setUser(result);
      router.replace("/ai_assistants");
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <div className="p-20 flex items-center flex-col justify-center h-screen">
      <div className="gap-10 border rounded-2xl p-15 shadow-md">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
        <h2 className="m-5 text-2xl">Sign In to AI Personal Assistant</h2>
        <Button onClick={() => googleLogin()} className="bg-black text-white">
          <MailOpen /> Login with Email
        </Button>
      </div>
    </div>
  );
}

export default SignIn;
