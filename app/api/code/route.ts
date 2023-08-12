import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage } from "openai";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const def: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "Act as code generator, you must write the code in markdown and use comment to explain it",
};

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [def, ...prompt],
    });

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    return new NextResponse("Error inter !", { status: 500 });
  }
}
