
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
import { sendMessage } from '@/app/(app)/freelancers/[id]/actions';
import { Skeleton } from '../ui/skeleton';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';

interface FirestoreChatMessage {
  id: string;
  sender: 'user' | 'freelancer';
  text: string;
  createdAt: Timestamp;
}

export function ChatDialog({ freelancer }: { freelancer: FreelancerProfile }) {
  const [messages, setMessages] = useState<FirestoreChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);

  // For this demo, we'll use a consistent conversation ID between the user and freelancer.
  // In a real app, this would be more dynamic, perhaps based on logged-in user IDs.
  const conversationId = `user1_${freelancer.id}`;
  const messagesEndRef = useRef<HTMLDivElement>(null);


   useEffect(() => {
    const messagesRef = collection(db, 'chats', conversationId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    setIsHistoryLoading(true);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
         createdAt: doc.data().createdAt,
      })) as FirestoreChatMessage[];
      
      setMessages(msgs);
      setIsHistoryLoading(false);
    }, (error) => {
        console.error("Error fetching real-time messages:", error);
        setIsHistoryLoading(false);
    });

    return () => unsubscribe();
  }, [conversationId]);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || isLoading) return;

    const messageText = newMessage;
    setNewMessage('');
    setIsLoading(true);

    await sendMessage(freelancer, conversationId, messageText);
    
    setIsLoading(false);
  };

  const formatTimestamp = (timestamp: Timestamp | null) => {
    if (!timestamp) return '';
    return timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

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
          {isHistoryLoading ? (
             <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          ) : messages.length === 0 ? (
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
                    {formatTimestamp(message.createdAt)}
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
              disabled={isLoading || isHistoryLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || isHistoryLoading}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
