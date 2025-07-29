
'use client';

import { useState, useEffect, useRef } from 'react';
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
import { MessageSquare, Send, Bot, Loader2 } from 'lucide-react';
import type { FreelancerProfile } from '@/lib/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getSimpleAiResponse } from '@/app/(app)/freelancers/[id]/actions';
import { Skeleton } from '../ui/skeleton';

interface ChatMessage {
  id: number;
  sender: 'user' | 'freelancer';
  text: string;
  timestamp: string;
}


export function ChatDialog({ freelancer }: { freelancer: FreelancerProfile }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || isLoading) return;

    const userMessageText = newMessage;
    setNewMessage('');

    // Add user message to local state
    const userMessage: ChatMessage = {
        id: Date.now(),
        sender: 'user',
        text: userMessageText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const currentChatHistory = [...messages, userMessage];
    setMessages(currentChatHistory);
    
    setIsLoading(true);

    // Get AI response
    const aiResult = await getSimpleAiResponse(freelancer, currentChatHistory.map(m => ({sender: m.sender, text: m.text})));

    if(aiResult.success && aiResult.response) {
        const aiMessage: ChatMessage = {
            id: Date.now() + 1,
            sender: 'freelancer',
            text: aiResult.response,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMessage]);
    } else {
        const errorMessage: ChatMessage = {
            id: Date.now() + 1,
            sender: 'freelancer',
            text: "I'm sorry, I seem to be having trouble connecting. Please try again in a moment.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, errorMessage]);
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
            <Bot className="w-4 h-4" /> This conversation is powered by AI and is not saved.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-secondary/50 rounded-lg">
           {messages.length === 0 ? (
             <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Start the conversation!</p>
             </div>
          ) : (
            messages.map((message) => (
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
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className={cn("text-xs mt-1", message.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground/70' )}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))
          )}
           {isLoading && (
            <div className="flex items-end gap-2 justify-start animate-pulse">
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
            <div ref={messagesEndRef} />
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
