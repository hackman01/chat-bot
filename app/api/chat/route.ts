import { streamText, UIMessage, convertToModelMessages, tool, stepCountIs } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import getWeather from '@/lib/getWeather';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google('gemini-2.5-flash'),
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: {
        weather: tool({
          description: 'Get the weather in a location (fahrenheit)',
          inputSchema: z.object({
            location: z.string().describe('The location to get the weather for'),
          }),
          execute: async ({ location }) => {
            const weather = await getWeather({ location });
            return weather;
          },
        }),
        convertFahrenheitToCelsius: tool({
            description: 'Convert a temperature in kelvin to celsius',
            inputSchema: z.object({
              temperature: z
                .number()
                .describe('The temperature in kelvin to convert'),
            }),
            execute: async ({ temperature }) => {
              const celsius = temperature - 273;
              return {
                celsius,
              };
            },
          }),
      },
  });

  return result.toUIMessageStreamResponse();
}