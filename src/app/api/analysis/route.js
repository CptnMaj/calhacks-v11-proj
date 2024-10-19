

import { NextResponse } from "next/server";

import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = String(`
  You're assisting in listing summaries and important talking points of individual slides, all of which under a single slideshow theme.

  You are given the text data for an entire slideshow, each section per slide number.
`)

const JSON_RESPONSE_TEMPLATE = {
  slides: [
    {
      slide_summary: "<short one sentence summary of slide>",
      talking_points: [
        "<a unique talking point derived from the slides>"
      ],
    }
  ],
  slideshow_summary: "<paragraph summary of entire slideshow>"
}

// To handle a GET request to /api
export async function GET(request) {
  try {
      const completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
              { role: "system", content: `${SYSTEM_PROMPT}. Please use this JSON format: ${JSON.stringify(JSON_RESPONSE_TEMPLATE)}` },
              { role: "user", content: `Fetching data through GET request.` }
          ],
          temperature: 1,
          max_tokens: 500,
      });

      return NextResponse.json({
          message: JSON.stringify(completion.choices[0].message.content),
      }, { status: 200 });
  } catch (error) {
      console.error('Error handling GET request:', error);
      return NextResponse.json({ message: 'Error occurred' }, { status: 500 });
  }
}

// To handle a POST request to /api
export async function POST(request) {


  const completion  = await openai.chat.completions.create({
    messages: [
      { role: "system", content: `${SYSTEM_PROMPT}. Please use this JSON format: ${JSON.stringify(JSON_RESPONSE_TEMPLATE)}`},
      { role: "user", content: `My hobbies are: Videogames. My Interests are: Computer Science` },
    ],
    temperature: 1,
    response_format: { "type": "json_object" },
    max_tokens: 500,
    model: "gpt-4o-mini",
  });

  return NextResponse.json({ message: JSON.stringify(completion.choices[0].message.content) }, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...