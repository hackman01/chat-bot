'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { WeatherCard } from '@/components/WeatherCard';
import { RaceCard } from '@/components/RaceCard';
import { StockCard } from '@/components/StockCard';

type ToolInvocations = {
    type: string;
    input: unknown;
    output: unknown;
}

type Message = {
    id: string;
    conversationId: string;
    role: "user" | "data" | "assistant" | "system" | "tool";
    content: string | null;
    toolInvocations: ToolInvocations | null;
    createdAt: Date;
}

export default function Chat({selectedConversationId, initMessages}: {selectedConversationId: string, initMessages: Message[]}) {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if(!selectedConversationId){
    return (
            <div className="flex flex-col justify-center items-center h-full w-full bg-gray-300"> 
              <div className="flex-1 overflow-y-auto p-4 space-y-4" id="messages-container">
                <h1>Please select a conversation or create a new one to begin.</h1>
              </div>
            </div>
    )
  }
  
  return (<div className="flex flex-col h-full w-full bg-gray-300">
      <div className="flex-1 overflow-y-auto p-4 space-y-4" id="messages-container">
          {initMessages.map((message: Message) => {
            if(!message.content && message.conversationId === selectedConversationId){
              switch(message.toolInvocations?.type){
                case 'tool-weather':
                  return  <div 
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user' 
                        ? 'bg-gray-100 rounded-tr-none' 
                        : 'bg-gray-100 rounded-tl-none'
                    }`}
                  > 
                  <WeatherCard input={message.toolInvocations.input} output={message.toolInvocations.output} />
                  </div>
                </div>
                case 'tool-races':
                  return  <div 
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user' 
                        ? 'bg-gray-100 rounded-tr-none' 
                        : 'bg-gray-100 rounded-tl-none'
                    }`}
                  >  
                  <RaceCard output={message.toolInvocations.output} />
                  </div>
                </div>
                case 'tool-stock':
                  return  <div 
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user' 
                        ? 'bg-gray-100 rounded-tr-none' 
                        : 'bg-gray-100 rounded-tl-none'
                    }`}
                  >  
                  <StockCard output={message.toolInvocations.output} />
                  </div>
                </div>
                default:
                  return null
              }
            }
          return (
          <div 
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-4 ${
                message.role === 'user' 
                  ? 'bg-gray-100 rounded-tr-none' 
                  : 'bg-gray-100 rounded-tl-none'
              }`}
            > 
           {message.content}
            </div>
          </div>
        )})}
          {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-4 ${
                message.role === 'user' 
                  ? 'bg-gray-100 rounded-tr-none' 
                  : 'bg-gray-100 rounded-tl-none'
              }`}
            >
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case 'text':
                    return (
                      <div 
                        key={`${message.id}-${i}`}
                        className={message.role === 'user' ? 'text-right' : 'text-left'}
                      >
                        {part.text}
                      </div>
                    );
                  case 'tool-weather':
                    return (
                      <div key={`${message.id}-${i}`}>
                        <WeatherCard input={part.input} output={part.output} />
                      </div>
                    );
                  case 'tool-races':
                    return (
                      <div key={`${message.id}-${i}`}>
                        <RaceCard output={part.output} />
                      </div>
                    );
                  case 'tool-stock':
                    return (
                      <div key={`${message.id}-${i}`}>
                        <StockCard output={part.output} />
                      </div>
                    );
                }
              })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-300">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (input.trim()) {
              sendMessage({ text: input},{ body: { conversationId:selectedConversationId } } );
              setInput('');
            }
          }}
          className="flex gap-2"
        >
          <input
            className="flex-1 p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            placeholder="Type your message..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}