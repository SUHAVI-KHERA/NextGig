
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, Bot } from 'lucide-react';
import type { FreelancerProfile } from '@/lib/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getAiChatResponse } from '@/app/(app)/freelancers/[id]/actions';
import { Skeleton } from '../ui/skeleton';

interface ChatMessage {
  id: number;
  sender: 'user' | 'freelancer';
  text: string;
  timestamp: string;
}

export function ChatDialog({ freelancer }: { freelancer: FreelancerProfile }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'freelancer',
      text: `Hi there! Thanks for reaching out. I'm reviewing your message and will get back to you shortly.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || isLoading) return;

    const userMsg: ChatMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setNewMessage('');
    setIsLoading(true);

    const chatHistoryForAI = [...messages, userMsg].map(msg => ({
        sender: msg.sender,
        text: msg.text
    }));

    const result = await getAiChatResponse(freelancer, chatHistoryForAI as any);
    
    if (result.success && result.response) {
       const aiMsg: ChatMessage = {
        id: messages.length + 2,
        sender: 'freelancer',
        text: result.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
    } else {
       const errorMsg: ChatMessage = {
        id: messages.length + 2,
        sender: 'freelancer',
        text: "I'm sorry, I seem to be having trouble connecting. Please try again in a moment.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
       };
       setMessages(prev => [...prev, errorMsg]);
    }

    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default"><MessageSquare className="mr-2 h-4 w-4" /> Message</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[700px] flex flex-col h-[80vh] max-h-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
             <Image
                src={freelancer.avatarUrl}
                alt={freelancer.name}
                width={40}
                height={40}
                className="rounded-full"
                data-ai-hint="person avatar"
              />
            Chat with {freelancer.name}
          </DialogTitle>
          <DialogDescription className="flex items-center justify-center text-xs gap-2 text-primary/80">
            <Bot className="w-4 h-4" /> This conversation is powered by AI.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-secondary/50 rounded-lg">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-end gap-2',
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.sender === 'freelancer' && (
                 <Image
                    src={freelancer.avatarUrl}
                    alt={freelancer.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                    data-ai-hint="person avatar"
                 />
              )}
              <div
                className={cn(
                  'max-w-xs md:max-w-md rounded-lg px-4 py-2',
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p className="text-sm">{message.text}</p>
                 <p className={cn("text-xs mt-1", message.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground/70' )}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
           {isLoading && (
            <div className="flex items-end gap-2 justify-start">
               <Image
                  src={freelancer.avatarUrl}
                  alt={freelancer.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                  data-ai-hint="person avatar"
                />
              <div className="max-w-xs md:max-w-md rounded-lg px-4 py-2 bg-muted">
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
           )}
        </div>
        <DialogFooter>
          <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              autoComplete="off"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
