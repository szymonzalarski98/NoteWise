import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { groqClient } from '@/lib/ai/groq/client';
import type {
  AudioTranscriptionResponse,
  GroqError,
} from '@/lib/ai/groq/types';

const DEFAULT_MODEL = 'distil-whisper-large-v3-en';

interface TranscriptionVariables {
  audioFile: {
    uri: string;
    type: string;
  };
  model?: string;
}

export const useTranscription = createMutation<
  AudioTranscriptionResponse,
  TranscriptionVariables,
  AxiosError<GroqError>
>({
  mutationFn: async (variables) => {
    try {
      const formData = new FormData();

      formData.append('file', {
        uri: variables.audioFile.uri,
        type: variables.audioFile.type,
        name: 'audio.mp3',
      } as any);

      formData.append('model', variables.model || DEFAULT_MODEL);
      formData.append('language', 'en');
      formData.append('response_format', 'json');
      formData.append('temperature', '0');

      const response = await groqClient.post(
        '/audio/transcriptions',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        'Error transcribing details:',
        (error as AxiosError<GroqError>).response?.data || error
      );
      throw error;
    }
  },
});
