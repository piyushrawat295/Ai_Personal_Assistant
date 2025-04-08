"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { ASSISTANT } from "../../ai_assistants/page";
import { useAssistant } from "@/context/AssistantContext";
import { BlurFade } from "@/components/magicui/blur-fade";

function AssistantList() {
  const convex = useConvex();
  const { user } = useContext(AuthContext);
  const { assistant, setAssistant } = useAssistant();
  const [assistantList, setAssistantList] = useState<ASSISTANT[]>([]);

  useEffect(() => {
    if (user) fetchUserAssistants();
  }, [user && assistant==null]);

  const fetchUserAssistants = async () => {
    try {
      const result = await convex.query(
        api.userAiAssistants.GetAllUseAssistants,
        { uid: user._id }
      );
      setAssistantList(result);
    } catch (error) {
      console.error("Error fetching assistants:", error);
    }
  };

  return (
    <div className="p-5 bg-secondary border-r-[1px] h-screen relative">
      <h2>Your Personal AI Assistant</h2>
      <Button className="w-full mt-3">+ Add New Assistant</Button>
      <Input className="bg-white mt-3" placeholder="Search" />
      <div className="mt-5">
        {assistantList.map((assistant_, index) => (
          <BlurFade key={assistant_.image} delay={0.25 + index * 0.05} inView>
          <div
            key={index}
            onClick={() => setAssistant(assistant_)}
            className={`flex items-center gap-3 p-2 border-b cursor-pointer hover:dark:bg-slate-700 hover:bg-gray-200 rounded-xl ${assistant_.id == assistant?.id && "bg-gray-200"}`}
          >
            <Image
              src={assistant_.image}
              alt={assistant_.name}
              width={60}
              height={60}
              className="rounded-xl w-[60px] h-[60px] object-cover"
            />
            <div>
              <h2 className="font-bold">{assistant_.name}</h2>
              <h2 className="text-sm text-gray-600 dark:text-gray-300">
                {assistant_.title}
              </h2>
            </div>
          </div>
          </BlurFade>
        ))}
      </div>
      <div className="absolute bottom-10 flex gap-3 items-center hover:bg-gray-200 w-[90%] p-2 rounded-xl cursor-pointer">
        {user?.picture ? (
          <Image
            src={user.picture}
            alt="user"
            width={35}
            height={35}
            className="rounded-full"
          />
        ) : (
          <div className="w-[35px] h-[35px] rounded-full bg-gray-300" />
        )}
        <div>
          <h2 className="font-bold">{user?.name}</h2>
          <h2 className="text-gray-400 text-sm">
            {user?.orderId ? "Pro User" : "Free User"}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default AssistantList;
