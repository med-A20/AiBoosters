import { NextResponse } from "next/server";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages : prompt
      });
    
    return NextResponse.json(response.data.choices[0].message)
  } catch (error) {
    
    return new NextResponse("Error inter !",{ status : 500})
  }
    
}