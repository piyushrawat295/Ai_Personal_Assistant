"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import AIassistantsList from "@/services/AIassistantsList";
import { Checkbox } from "@/components/ui/checkbox";
import { BlurFade } from "@/components/magicui/blur-fade";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { RainbowButton } from "@/components/magicui/rainbow-button";
type ASSISTANT = {
  id: number;
  name: string;
  title: string;
  image: string;
  instruction: string;
  userInstruction: string;
  sampleQuestions: string[];
};

function AIassistants() {
  const [selectedAssistant, setSelectedAssistant] = useState<ASSISTANT[]>([]);

  const onSelect = (assistant: ASSISTANT) => {
    setSelectedAssistant((prev) =>
      prev.some((item) => item.id === assistant.id)
        ? prev.filter((item) => item.id !== assistant.id)
        : [...prev, assistant]
    );
  };

  const isAssistantSelected = (assistant: ASSISTANT) => {
    return selectedAssistant.some((item) => item.id === assistant.id);
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
        <RainbowButton>Continue</RainbowButton>
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
              <h2 className="text-center font-bold text-lg">
                {assistant.name}
              </h2>
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
