'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { WeatherCard } from '@/components/WeatherCard';
import { RaceCard } from '@/components/RaceCard';
import { StockCard } from '@/components/StockCard';
  

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();
  return (
    <div className="flex w-[70%] flex-col bg-amber-200 py-6 stretch">
      {messages.map(message => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
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
              // case 'tool-convertFahrenheitToCelsius':
              //   return (
              //     <pre key={`${message.id}-${i}`}>
              //       {JSON.stringify(part, null, 2)}
              //     </pre>
              //   );
            }
          })}
        </div>
      ))}

      <form
        onSubmit={e => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput('');
        }}
      >
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={e => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}