
'use client';

import { useState, useEffect } from 'react';
import { SettingsForm } from '@/components/settings/settings-form';
import { getUserProfile } from '@/lib/firebase/firestore';
import type { FreelancerProfile } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function SettingsPage() {
  const [userProfile, setUserProfile] = useState<FreelancerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const profile = await getUserProfile();
      setUserProfile(profile);
      setLoading(false);
    }
    fetchProfile();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account, profile settings, and generate AI content.
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
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-1/2" />
               <Skeleton className="h-24 w-full" />
               <Skeleton className="h-24 w-full" />
               <Skeleton className="h-10 w-full" />
            </CardContent>
        </Card>
      ) : (
        <SettingsForm userProfile={userProfile} />
      )}
    </div>
  );
}
