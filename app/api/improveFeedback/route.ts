import { NextResponse } from "next/server";
import OpenAI from "openai";

export const GET = async (req: Request) => {
  const openai = new OpenAI();
  const { searchParams } = new URL(req.url);
  const feedback = searchParams.get('feedback');
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: `Give me three tips with examples on what 
      I can do to make this feedback better: "${feedback}". Use HTML for the layout. 
      This is meant for students so don't give a final solution , just give very good tips on how to improve the feedback`  }],
    model: 'gpt-4',
  });
  console.log(completion.choices);
  return NextResponse.json({ message: completion.choices[0].message });
}