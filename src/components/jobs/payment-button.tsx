'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Rocket } from 'lucide-react';

export function PaymentButton({ budget }: { budget: number }) {
  const { toast } = useToast();

  const handlePayment = () => {
    toast({
      title: "Payment Simulated!",
      description: `A payment of $${budget.toLocaleString()} has been processed.`,
      className: "bg-primary text-primary-foreground border-primary",
    });
  };

  return (
    <Button onClick={handlePayment} className="w-full">
      <Rocket className="mr-2 h-4 w-4" />
      Mark as Complete & Simulate Payment
    </Button>
  );
}
