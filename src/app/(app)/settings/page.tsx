
'use client';

import { useState, useEffect } from 'react';
import { SettingsForm } from '@/components/settings/settings-form';
import type { FreelancerProfile } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { freelancers } from '@/lib/data';

export default function SettingsPage() {
  const [userProfile, setUserProfile] = useState<FreelancerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a fetch from a static source. In a real app, this would be from an API.
    const profile = freelancers.find(f => f.id === '1');
    setUserProfile(profile || null);
    setLoading(false);
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account and profile settings.
        </p>
      </div>
      {loading || !userProfile ? (
         <Card>
            <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Make changes to your public profile here. Click save when you're done.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                </div>
                 <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-full" />
                </div>
              </div>
               <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-24 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-1/2" />
                </div>
               <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-24 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-24 w-full" />
                </div>
               <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                </div>
                 <Skeleton className="h-10 w-40" />
            </CardContent>
        </Card>
      ) : (
        <SettingsForm userProfile={userProfile} />
      )}
    </div>
  );
}
