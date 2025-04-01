"use client";
import React, { useContext, useEffect } from "react";
import Header from "./_components/Header";
import { useRouter } from "next/navigation";
import { GetAuthUserData } from "@/services/GlobalApi";
import { useConvex } from "convex/react";
import { AuthContext } from "@/context/AuthContext";
import { api } from "@/convex/_generated/api";

function Provider({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const convex = useConvex();

  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    CheckUseAuth();
  }, []);

  const CheckUseAuth = async () => {
    const token = localStorage.getItem("user_token");

    const user = token && (await GetAuthUserData(token));
    console.log(user);
    if (!user?.email) {
      router.replace("/SignIn");
      return;
    }

    try {
      const result = await convex.query(api.users.GetUser, {
        email: user?.email
      });
      setUser(result);;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Provider;
