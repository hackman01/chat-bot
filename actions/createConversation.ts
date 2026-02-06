"use server"
import { auth } from "@/lib/auth";
import db from "@/db";
import { conversations } from "@/db/schema";

export async function createConversation() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      throw new Error('User authentication required');
    }

    const newConversation = await db.insert(conversations).values({
      userId: session.user.id,
      title: 'New Chat',
    }).returning();

    return newConversation[0];
  } catch (error) {
    console.error('Error creating conversation:', error);
    return { error: 'Failed to create conversation' }
  }
}