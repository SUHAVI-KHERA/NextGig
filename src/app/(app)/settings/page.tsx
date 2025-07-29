
import { SettingsForm } from '@/components/settings/settings-form';
import { getUserProfile } from '@/lib/firebase/firestore';

export default async function SettingsPage() {
  const userProfile = await getUserProfile();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account, profile settings, and generate AI content.
        </p>
      </div>
      <SettingsForm userProfile={userProfile} />
    </div>
  );
}
