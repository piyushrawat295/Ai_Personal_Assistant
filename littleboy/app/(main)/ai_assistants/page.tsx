"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import AIassistantsList from "@/services/AIassistantsList";
import { Checkbox } from "@/components/ui/checkbox";
import { BlurFade } from "@/components/magicui/blur-fade";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { Button } from "@/components/ui/button";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthContext } from "@/context/AuthContext";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

// Type for DB assistant
export type ASSISTANT = {
  _id: Id<"userAiAssistants">;
  id: number;
  name: string;
  title: string;
  image: string;
  instruction: string;
  userInstruction: string;
  sampleQuestions: any;
  aiModelId?: string;
  uid: Id<"users">;
};

// Type for static assistant list
export type StaticAssistant = {
  id: number;
  name: string;
  title: string;
  image: string;
  instruction: string;
  userInstruction: string;
  sampleQuestions: string[];
};

function AIassistants() {
  const [selectedAssistant, setSelectedAssistant] = useState<StaticAssistant[]>([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const convex = useConvex();
  const router = useRouter();
  const insertAssistant = useMutation(api.userAiAssistants.InsertSelectedAssistants);

  useEffect(() => {
    user && GetUserAssistants();
  }, [user]);

  const GetUserAssistants = async () => {
    const result = await convex.query(api.userAiAssistants.GetAllUseAssistants, {
      uid: user._id,
    });
    if (result.length > 0) {
      router.replace("/workspace");
    }
  };

  const onSelect = (assistant: StaticAssistant) => {
    setSelectedAssistant((prev) =>
      prev.some((item) => item.id === assistant.id)
        ? prev.filter((item) => item.id !== assistant.id)
        : [...prev, assistant]
    );
  };

  const isAssistantSelected = (assistant: StaticAssistant) => {
    return selectedAssistant.some((item) => item.id === assistant.id);
  };

  const OnClickContinue = async () => {
    if (!user) return;
    setLoading(true);

    await insertAssistant({
      records: selectedAssistant.map((item) => ({
        ...item,
        uid: user._id,
      })),
      uid: user._id,
    });

    setLoading(false);
    router.replace("/workspace");
  };

  return (
    <div className="px-10 mt-20 md:px-28 lg:px-36 xl:px-48">
      <div className="flex justify-between items-center">
        <div>
          <SparklesText
            text="Welcome to the world of AI 🤖"
            className="text-3xl font-bold"
          />
          <TypingAnimation className="text-xl mt-2">
            Choose your AI companion 🚀
          </TypingAnimation>
        </div>
        <Button
          onClick={OnClickContinue}
          disabled={selectedAssistant.length === 0 || loading}
        >
          {loading && <Loader2Icon className="animate-spin mr-2" />}
          Continue
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
        {AIassistantsList.map((assistant, index) => (
          <BlurFade key={assistant.image} delay={0.25 + index * 0.05} inView>
            <div
              key={assistant.id}
              className="hover:border p-3 rounded-xl hover:scale-105 transition-all ease-in-out cursor-pointer"
              onClick={() => onSelect(assistant)}
            >
              <Checkbox
                className="absolute m-2"
                checked={isAssistantSelected(assistant)}
                onCheckedChange={() => onSelect(assistant)}
              />
              <Image
                src={assistant.image}
                alt={assistant.title}
                width={200}
                height={200}
                quality={100}
                className="rounded-2xl w-full h-[220px] object-cover"
              />
              <h2 className="text-center font-bold text-lg">{assistant.name}</h2>
              <h2 className="text-center text-gray-600 dark:text-gray-300">
                {assistant.title}
              </h2>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

export default AIassistants;
