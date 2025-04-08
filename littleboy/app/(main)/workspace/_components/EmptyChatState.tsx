"use client";
import { motion } from "framer-motion";
import React, { useContext } from "react";
import { AssistantContext } from "@/context/AssistantContext";
import { ChevronRight } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";

function EmptyChatState() {
  const context = useContext(AssistantContext);
  const assistant = context?.assistant;
  return (
    <div className="flex flex-col items-center">
      <h2 className=" text-center stext-3xl font-bold tracking-tighter md:text-4xl lg:text-6xl">
        How Can I{" "}
        <motion.span
          animate={{ backgroundPosition: "100% 50%" }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse", // smooth back and forth
            ease: "linear",
          }}
          style={{
            backgroundImage:
              "linear-gradient(135deg, #FF0080, #7928CA, #0070F3, #38bdf8)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
            backgroundPosition: "0% 50%", // initial value
          }}
        >
          Assist You?
        </motion.span>
      </h2>
      <div className="mt-7">
        {assistant?.sampleQuestions.map((suggestion: string, index: number) => (
            <BlurFade delay={0.25*index} key={suggestion}>
          <div key={index}>
            <h2 className="cursor-pointer p-4 text-lg mt-1 border rounded-xl hover:bg-gray-100 flex items-center justify-between gap-10">{suggestion} 
            <ChevronRight/>
            </h2>
            
          </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

export default EmptyChatState;
