import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { groqClient } from '@/lib/ai/groq/client';
import type { ChatMessage, ChatResponse, GroqError } from '@/lib/ai/groq/types';

const DEFAULT_MODEL = 'llama-3.2-1b-preview';

interface ChatVariables {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export const useChat = createMutation<
  ChatResponse,
  ChatVariables,
  AxiosError<GroqError>
>({
  mutationFn: async (variables) => {
    const response = await groqClient.post('/chat/completions', {
      model: variables.model || DEFAULT_MODEL,
      messages: variables.messages,
      temperature: variables.temperature || 0.7,
      max_tokens: variables.maxTokens || 1024,
    });
    return response.data;
  },
});
