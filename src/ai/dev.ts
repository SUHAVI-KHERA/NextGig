import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-skills.ts';
import '@/ai/flows/match-jobs.ts';
import '@/ai/flows/generate-chat-response.ts';
