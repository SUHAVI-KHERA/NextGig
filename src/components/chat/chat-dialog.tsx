
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
import { MessageSquare, Send } from 'lucide-react';
import type { FreelancerProfile } from '@/lib/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: number;
  sender: 'me' | 'them';
  text: string;
  timestamp: string;
}

export function ChatDialog({ freelancer }: { freelancer: FreelancerProfile }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'them',
      text: `Hi there! Thanks for reaching out. How can I help with your project?`,
      timestamp: '10:00 AM',
    },
     {
      id: 2,
      sender: 'me',
      text: `Hello, ${freelancer.name}! I was impressed by your profile. I have a project that might be a great fit.`,
      timestamp: '10:01 AM',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMsg: ChatMessage = {
      id: messages.length + 1,
      sender: 'me',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
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
          <DialogDescription>
            Discuss project details, ask questions, and collaborate.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-secondary/50 rounded-lg">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-end gap-2',
                message.sender === 'me' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.sender === 'them' && (
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
                  message.sender === 'me'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p className="text-sm">{message.text}</p>
                 <p className={cn("text-xs mt-1", message.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground/70' )}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              autoComplete="off"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
