import { NextResponse } from "next/server";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { prompt, amount, resolution } = await req.json();

    const res = await openai.createImage({
      prompt: prompt,
      n: Number(amount),
      size: resolution,
    });
    return NextResponse.json(res.data.data);
  } catch (error) {
    return new NextResponse("Internal Error " +error, { status: 500 });
  }
}
