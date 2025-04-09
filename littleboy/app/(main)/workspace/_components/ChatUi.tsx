"use client";

import React, { useContext, useState } from "react";
import EmptyChatState from "./EmptyChatState";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import AssistantsOptions from "@/services/AssistantsOptions";
import { AssistantContext } from "@/context/AssistantContext";
import { toast } from "sonner";
import axios from "axios";

function ChatUi() {
  const [input, setInput] = useState<string>("");

  const context = useContext(AssistantContext);
  if (!context) throw new Error("AssistantContext not found");
  const { assistant } = context;

  const onSendMessage = async () => {
    if (!assistant) {
      toast.error("Please select an assistant first");
      return;
    }

    const AIModel = AssistantsOptions.find(
      (item) => item.name === assistant.aiModelId
    );

    if (!AIModel) {
      toast.error("Selected AI Assistant Model NOT Found!");
      return;
    }

    try {
      const response = await axios.post("/api/eden-ai-api", {
        provider: AIModel.edenAi,
        userInput: input,
      });

      const data = response.data;
      const reply = data?.[AIModel.edenAi]?.generated_text;

      if (reply) {
        console.log("AI Reply:", reply);
        toast.success("AI replied!", { description: reply });
      } else {
        console.log("Full response for debug:", data);
        toast.error("AI failed to respond properly", {
          description: data?.[AIModel.edenAi]?.message || "No response from model",
        });
      }
    } catch (error: any) {
      console.error("Request Error:", error);
      toast.error("AI Request Failed", {
        description: error.response?.data?.detail || "Check console for details",
      });
    }

    setInput("");
  };

  return (
    <div className="mt-20 p-6 relative h-[88vh]">
      <EmptyChatState />
      <div className="flex justify-between p-5 gap-5 absolute bottom-5 w-[92%]">
        <Input
          placeholder="Start Typing here..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
        />
        <Button onClick={onSendMessage}>
          <Send />
        </Button>
      </div>
    </div>
  );
}

export default ChatUi;
