import { streamText, UIMessage, convertToModelMessages, tool, stepCountIs } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import getWeather from '@/lib/getWeather';
import getF1Matches from '@/lib/getF1Matches';
import getStockPrice from '@/lib/getStockPrice';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: "mistral/devstral-2",
    messages: await convertToModelMessages(messages),
    tools: {
        weather: tool({
          description: 'Get the weather in a location',
          inputSchema: z.object({
            location: z.string().describe('The location to get the weather for'),
          }),
          execute: async ({ location }) => {
            const weather = await getWeather({ location });
            return weather;
          },
        }),
        races: tool({
          description: 'Get the next scheduled F1 race',
          inputSchema: z.object(),
          execute: async () => {
            const race = await getF1Matches();
            return race;
          },
        }),
        stock: tool({
          description: 'Get the stock price of a company',
          inputSchema: z.object({
            company: z.string().describe('The company to get the stock price for'),
          }),
          execute: async ({ company }) => {
            const stock = await getStockPrice({ company });
            return stock;
          },
        })
      },
  });

  return result.toUIMessageStreamResponse();
}

