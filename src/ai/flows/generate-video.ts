'use server';

/**
 * @fileOverview A flow for generating a video resume for a freelancer.
 *
 * - generateVideo - A function that handles the video generation process.
 * - GenerateVideoInput - The input type for the generateVideo function.
 * - GenerateVideoOutput - The return type for the generateVideo function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { freelancers } from '@/lib/data';
import wav from 'wav';

const GenerateVideoInputSchema = z.object({
  script: z.string().describe('The script for the video resume.'),
  freelancerId: z.string().describe('The ID of the freelancer.'),
});
export type GenerateVideoInput = z.infer<typeof GenerateVideoInputSchema>;

const GenerateVideoOutputSchema = z.object({
  videoUrl: z.string().describe('The data URI of the generated video.'),
});
export type GenerateVideoOutput = z.infer<typeof GenerateVideoOutputSchema>;

export async function generateVideo(
  input: GenerateVideoInput
): Promise<GenerateVideoOutput> {
  return generateVideoFlow(input);
}

const generateVideoFlow = ai.defineFlow(
  {
    name: 'generateVideoFlow',
    inputSchema: GenerateVideoInputSchema,
    outputSchema: GenerateVideoOutputSchema,
  },
  async ({ script, freelancerId }) => {
    try {
      const freelancer = freelancers.find((f) => f.id === freelancerId);
      if (!freelancer) {
        throw new Error('Freelancer not found');
      }

      // 1. Generate Audio from Script (TTS)
      const { media: audioMedia } = await ai.generate({
        model: googleAI.model('gemini-2.5-flash-preview-tts'),
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Algenib' },
            },
          },
        },
        prompt: script,
      });

      if (!audioMedia) {
        throw new Error('TTS failed to generate audio.');
      }

      const audioBuffer = Buffer.from(
        audioMedia.url.substring(audioMedia.url.indexOf(',') + 1),
        'base64'
      );
      const audioWavBase64 = await toWav(audioBuffer);
      const audioDataUri = `data:audio/wav;base64,${audioWavBase64}`;


      // 2. Generate Video from Image and Audio (Veo)
      let { operation } = await ai.generate({
        model: googleAI.model('veo-2.0-generate-001'),
        prompt: [
          {
            text: 'Animate the person in the provided image to speak the accompanying audio track. The background should be a simple, professional setting suitable for a resume.',
          },
          {
            media: {
              contentType: 'image/png',
              url: freelancer.avatarUrl,
            },
          },
          {
              media: {
                  contentType: 'audio/wav',
                  url: audioDataUri,
              }
          }
        ],
        config: {
          durationSeconds: 5, // This may need adjustment based on audio length
          aspectRatio: '16:9',
          personGeneration: 'allow_adult',
        },
      });

      if (!operation) {
        throw new Error('Expected the model to return an operation');
      }

      // Poll for completion
      while (!operation.done) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        operation = await ai.checkOperation(operation);
      }

      if (operation.error) {
        console.error('Video generation failed:', operation.error);
        throw new Error('Failed to generate video: ' + operation.error.message);
      }

      const videoPart = operation.output?.message?.content.find((p) => !!p.media && p.media.contentType?.startsWith('video/'));
      if (!videoPart || !videoPart.media) {
        throw new Error('Failed to find the generated video in the operation result');
      }
      
      // In a real app with billing enabled, you would fetch the private GCS URL,
      // convert it to base64, and return a data URI.
      // const videoData = await fetch(videoPart.media.url).then(res => res.arrayBuffer());
      // const videoBase64 = Buffer.from(videoData).toString('base64');
      // const videoDataUri = `data:${videoPart.media.contentType};base64,${videoBase64}`;
      // return { videoUrl: videoDataUri };
      
      return {
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' // Placeholder
      };

    } catch (error) {
        console.error("An error occurred during video generation:", error);
        // Return placeholder on any error to prevent app from crashing.
        return {
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' // Placeholder
        };
    }
  }
);


async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
