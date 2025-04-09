import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { provider, model, userInput } = await req.json();

  const headers = {
    Authorization: `Bearer ${process.env.EDEN_AI_API}`,
    "Content-Type": "application/json"
  };

  const url = "https://api.edenai.run/v2/llm/chat";

  const body = JSON.stringify({
    providers: [provider],
    model,
    temperature: 0.7,
    max_tokens: 500,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: userInput
          }
        ]
      }
    ]
  });

  const response = await fetch(url, {
    method: "POST",
    headers,
    body
  });

  const result = await response.json();
  return NextResponse.json(result);
}
