"use client";
import React, { useContext, useEffect } from "react";
import Header from "./_components/Header";
import { useRouter } from "next/navigation";
import { GetAuthUserData } from "@/services/GlobalApi";
import { useConvex } from "convex/react"; 
import { AuthContext } from "@/context/AuthContext"; 
import { api } from "@/convex/_generated/api"; 
import { AssistantProvider } from "@/context/AssistantContext";

function Provider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const convex = useConvex();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    checkUserAuth();
  }, []);

  const checkUserAuth = async () => {
    const token = localStorage.getItem("user_token");
    const userData = token ? await GetAuthUserData(token) : null;

    if (!userData?.email) {
      router.replace("/SignIn");
      return;
    }

    try {
      const result = await convex.query(api.users.GetUser, { email: userData?.email });
      setUser(result);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <AssistantProvider>
      <Header />
      {children}
    </AssistantProvider>
  );
}

export default Provider;
