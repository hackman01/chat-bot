import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { conversations, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const { userId, title } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const newConversation = await db.insert(conversations).values({
      userId: user[0].id,
      title: title || 'New Chat',
    }).returning();

    return NextResponse.json(newConversation[0], { status: 201 });
  } catch (error) {
    console.error('Error creating conversation:', error);
    return NextResponse.json(
      { error: 'Failed to create conversation' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const userConversations = await db
      .select()
      .from(conversations)
      .where(eq(conversations.userId, userId))
      .orderBy(conversations.updatedAt);

    return NextResponse.json(userConversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conversations' },
      { status: 500 }
    );
  }
}