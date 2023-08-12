import { NextResponse } from "next/server";

import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY!,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    const response = await replicate.run(
      "haoheliu/audio-ldm:b61392adecdd660326fc9cfc5398182437dbe5e97b5decfb36e1a36de68b5b95",
      {
        input: {
          text: prompt
        }
      }
    );
    return NextResponse.json(response);
  } catch (error) {
    return new NextResponse("Error inter ! " + error, { status: 500 });
  }
}
