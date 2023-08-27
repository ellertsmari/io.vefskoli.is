import { NextResponse } from "next/server";
import OpenAI from "openai";

export const GET = async (req: Request) => {
  const openai = new OpenAI();
  const { searchParams } = new URL(req.url);
  const feedback = searchParams.get('feedback');
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: `imrove this feedback: "${feedback}"`  }],
    model: 'gpt-4',
  });
  console.log(completion.choices);
  return NextResponse.json({ message: completion.choices[0].message });
}