"use client";
import { AssistantContext } from "@/context/AssistantContext";
import Image from "next/image";
import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AssistantsOptions from "@/services/AssistantsOptions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, Trash } from "lucide-react";

function AssistantSettings() {
  const { assistant, setAssistant } = useContext(AssistantContext);
  return (
    assistant && (
      <div className="p-5 bg-secondary border-l-[1px] h-screen">
        <h2 className="font-bold text-xl">Settings</h2>
        <div className="mt-4 flex gap-3">
          <Image
            src={assistant?.image}
            alt="assistant"
            width={100}
            height={100}
            className="rounded-xl h-[80px] w-[90px]"
          />
          <div>
            <h2 className="font-bold">{assistant?.name}</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {assistant?.title}
            </p>
          </div>
        </div>
        <div className="mt-4 text-gray-500">
          <h2>Model:</h2>
          <Select defaultValue={assistant.aiModelId}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              {AssistantsOptions.map((model, index) => [
                <SelectItem key={index} value={model.name}>
                  <div className="flex gap-2 items-center m-1">
                    <Image
                      src={model.logo}
                      alt={model.name}
                      width={20}
                      height={20}
                      className="rounded-md"
                    />
                    <h2>{model.name}</h2>
                  </div>
                </SelectItem>,
              ])}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4">
          <h2 className="text-gray-500">Instruction:</h2>
          <Textarea
            placeholder="Add Instruction"
            className="h-[180px] bg-white"
            value={assistant?.userInstruction}
            onChange={(e) =>
              setAssistant({ ...assistant, userInstruction: e.target.value })
            }
          />
        </div>
        <div className="absolute bottom-10 right-5 flex gap-5">
            <Button variant="ghost"><Trash/>Delete</Button>
            <Button> <Save/>Save</Button>
        </div>
      </div>
    )
  );
}

export default AssistantSettings;
