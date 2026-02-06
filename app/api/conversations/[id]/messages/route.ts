import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { messages, conversations } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const conversationId = params.id;

    if (!conversationId) {
      return NextResponse.json(
        { error: 'Conversation ID is required' },
        { status: 400 }
      );
    }

    const conversationMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(messages.createdAt);

    const conversation = await db
      .select()
      .from(conversations)
      .where(eq(conversations.id, conversationId))
      .limit(1);

    if (conversation.length === 0) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      conversation: conversation[0],
      messages: conversationMessages,
    });
  } catch (error) {
    console.error('Error fetching conversation messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conversation messages' },
      { status: 500 }
    );
  }
}