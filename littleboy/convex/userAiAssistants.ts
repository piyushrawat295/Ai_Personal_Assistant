import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const InsertSelectedAssistants = mutation({
  args: {
    records: v.any(),
    uid: v.id("users"),
  },
  handler: async (ctx, args) => {
    const insertedIds = await Promise.all(
      args.records.map((record: any) =>
        ctx.db.insert("userAiAssistants", {
          ...record,
          aiModelId: "Google: Gemini 2.0 Flash",
          uid: args.uid,
        })
      )
    );
    return insertedIds;
  },
});

export const GetAllUseAssistants = query({
  args: {
    uid: v.id("users"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("userAiAssistants")
      .filter((q) => q.eq(q.field("uid"), args.uid))
      .collect();
    return result;
  },
});

export const UpdateUserAiAssistant = mutation({
    args: {
      id: v.id("userAiAssistants"),
      userInstruction: v.string(),
      aiModelId: v.string(), // ✅ Fix: match the DB field casing
    },
    handler: async (ctx, args) => {
      const result = await ctx.db.patch(args.id, {
        aiModelId: args.aiModelId,
        userInstruction: args.userInstruction,
      });
      return result;
    }
  });
  
  export const DeleteAssistant = mutation ({
    args: {
      id: v.id('userAiAssistants')
    },
    handler: async (convexToJson, args) =>{
      await convexToJson.db.delete(args.id);
    }
  })

