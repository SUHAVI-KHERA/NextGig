
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  title: z.string().min(5, {
    message: 'Title must be at least 5 characters.',
  }),
  bio: z.string().min(20, {
    message: 'Bio must be at least 20 characters.',
  }).max(300, {
    message: 'Bio must not be longer than 300 characters.',
  }),
   workHistory: z.string().min(20, {
    message: 'Work history must be at least 20 characters.',
  }),
  jobPreferences: z.string().min(20, {
    message: 'Job preferences must be at least 20 characters.',
  }),
  skills: z.string().min(2, {
    message: 'Please add at least one skill.',
  }),
  rate: z.coerce.number().min(1, {
    message: 'Rate must be a positive number.',
  }),
  videoResumeUrl: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export async function updateUserProfile(data: ProfileFormValues) {
  try {
    // This is a simulation. In a real app, you would save this to a database.
    console.log('Simulating profile update with data:', data);
    
    // Revalidate paths to reflect changes in a real app
    revalidatePath('/profile');
    revalidatePath('/settings');
    
    return { success: true, message: 'Profile updated successfully!' };
   
  } catch (error) {
    console.error('Error updating profile:', error);
    return { success: false, message: 'Failed to update profile.' };
  }
}
