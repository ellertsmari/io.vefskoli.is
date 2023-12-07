import { NextResponse } from "next/server";
import OpenAI from "openai";

export const GET = async (req: Request) => {
  const openai = new OpenAI();
  const { searchParams } = new URL(req.url);
  const feedback = searchParams.get('feedback');
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: `Give me a nicely styled HTML code
      with the following content: Three tips with examples on what 
      I can do to make this feedback better: "${feedback}". 
      This is meant for students so don't give a final solution , 
      just give very good tips on how to improve the feedback. Do not style any HTML tags. 
      Add classes and use them to style it nicely. 
      Also there is no need to repeat the original feedback. Just give the three tips in a nicely styled manner 
      and nothing else. Your answer should only include the HTML code <div> and end with a </div> and nothing else 
      (no intro saying something like "below is..." or outro saying something like "please note..." and no markup like "\`\`\`html ").
      `  }],
    model: 'gpt-4-1106-preview',
  });
  console.log(completion.choices);
  return NextResponse.json({ message: completion.choices[0].message });
}