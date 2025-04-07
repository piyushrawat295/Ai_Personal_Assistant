"use client";
import { AssistantContext, useAssistant } from "@/context/AssistantContext";
import Image from "next/image";
import React, { useContext, useState } from "react";
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
import { Loader2Icon, Save, Trash } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function AssistantSettings() {
  const { assistant, setAssistant } = useAssistant();
  const UpdateAssistant = useMutation(api.userAiAssistants.UpdateUserAiAssistant);
  const[loading,setLoading] = useState(false);
  const onHandleInputChange = (field: string, value: string) => {
    setAssistant((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };
  const OnSave = async () => {
    if (!assistant?._id || !assistant?.aiModelId || !assistant?.userInstruction) return;
  
    setLoading(true);
    await UpdateAssistant({
      id: assistant?._id,
      aiModelId: assistant.aiModelId,
      userInstruction: assistant.userInstruction,
    });
    setLoading(false);
  };
  

  
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
          <Select
  defaultValue={assistant.aiModelId}
  onValueChange={(value) => onHandleInputChange("aiModelId", value)}
>

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
  onChange={(e) => onHandleInputChange("userInstruction", e.target.value)}
/>

        </div>
        <div className="absolute bottom-10 right-5 flex gap-5">
            <Button disabled={loading} variant="ghost"><Trash/>Delete</Button>
            <Button className="cursor-pointer"onClick={OnSave} disabled={loading}>{loading?<Loader2Icon className="animate-spin"/>:<Save/>}  Save</Button>
        </div>
      </div>
    )
  );
}

export default AssistantSettings;
