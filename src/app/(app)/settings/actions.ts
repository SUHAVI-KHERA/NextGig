'use server';

import { z } from 'zod';

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
    // In a real application, you would save this data to your database.
    // For this demo, we'll just log it to the server console.
    console.log('Updating user profile with:', data);

    // We'll simulate a successful update.
    return { success: true, message: 'Profile updated successfully!' };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { success: false, message: 'Failed to update profile.' };
  }
}
