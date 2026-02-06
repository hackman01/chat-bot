import { streamText, UIMessage, convertToModelMessages, tool } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import getWeather from '@/lib/getWeather';
import getF1Matches from '@/lib/getF1Matches';
import getStockPrice from '@/lib/getStockPrice';
import db from '@/db';
import { messages, conversations, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth'

export async function POST(req: Request) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return new Response('User authentication required', { status: 401 });
  }

  const { 
    messages: uiMessages, 
    conversationId 
  }: { 
    messages: UIMessage[]; 
    conversationId?: string;
  } = await req.json();

  let currentConversationId = conversationId;

  try {
    // if (!currentConversationId) {
    //   const user = await db
    //     .select()
    //     .from(users)
    //     .where(eq(users.id, session.user.id))
    //     .limit(1);

    //   if (user.length === 0) {
    //     return new Response('User not found', { status: 404 });
    //   }

    //   const firstMessageContent = (uiMessages[0] as any)?.parts?.find((part: any) => part.type === 'text')?.text || 'New Chat';
    //   const newConversation = await db.insert(conversations).values({
    //     userId: user[0].id,
    //     title: firstMessageContent.slice(0, 50),
    //   }).returning();

    //   currentConversationId = newConversation[0].id;
    // }

    // if (uiMessages.length > 0) {
    //   const lastMessage = uiMessages[uiMessages.length - 1];
    //   const textContent = (lastMessage as any)?.parts?.find((part: any) => part.type === 'text')?.text || '';
      
    //   await db.insert(messages).values({
    //     conversationId: currentConversationId!,
    //     role: lastMessage.role as 'user' | 'assistant' | 'system',
    //     content: textContent,
    //     toolInvocations: (lastMessage as any).parts?.filter((part: any) => part.type === 'tool-call' || part.type === 'tool-result') || null,
    //   });
    // }

    const result = streamText({
      model: "mistral/devstral-2",
      messages: await convertToModelMessages(uiMessages),
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
        // onFinish: async ({ text, toolCalls }) => {
        //   if (currentConversationId) {
        //     await db.insert(messages).values({
        //       conversationId: currentConversationId,
        //       role: 'assistant',
        //       content: text || '',
        //       toolInvocations: toolCalls || null,
        //     });
        //   }
        // },
    });

    const response = result.toUIMessageStreamResponse();
    
    // response.headers.set('X-Conversation-ID', currentConversationId!);
    
    return response;
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}