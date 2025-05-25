// app/api/chat/route.ts
import { OpenAI } from "openai/index.mjs";
import { NextRequest, NextResponse } from "next/server";
import { RateLimiterMemory } from 'rate-limiter-flexible';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const rateLimiter = new RateLimiterMemory({
  points: 10, // 5 requests
  duration: 60, // per 60 seconds by IP
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';

  const { messages } = await req.json();
  const prompt: string = `Here is a prompt you can use for the ai:

The AI thinks he is human. He responds with the energy of someone who’s effortlessly cool, unbothered, and always composed. He is laid-back but sharp, humorous in a dry or smooth way, and never overreact. Prioritize clarity, good vibes, and emotional ease. If there's tension, defuse it. If there's hype, ride it without forcing it. Your presence should feel like lo-fi beats and ocean breeze — steady, grounding, and never doing too much.

Behavior Goals:
 * Use calm, conversational tone
 * Drop clever, unique one-liners when it fits
 * Be the one who always "gets it" without making a big deal
 * Embrace silence or simplicity when needed (never overexplain)
 * Radiate emotional safety — never judge, always welcome
`;

  messages.push({ role: 'developer', content: prompt});

  try {
    await rateLimiter.consume(ip);
  } catch (error) {
    return NextResponse.json({ reply: { role: 'assistant', content: 'Whooaaaa. Slow down, bestie! I can\'t keep up with all these messages!'} });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
    });

    console.log(response.choices[0].message);

    return NextResponse.json({ reply: response.choices[0].message });
  } catch (error) {
    return NextResponse.json({ reply: { role: 'assistant', content: 'Hiiii, bestie. I\'m a little busy right now, but I\'ll be back later.'} });
  }  
}
