import React from 'react';

import { Button, SafeAreaView, Text, View } from '@/components/ui';
import type { ChatMessage } from '@/lib/ai/groq/types';
import { useChat } from '@/lib/hooks/useChat';

interface ChatProps {
  onResponse: (response: string) => void;
}

export const Chat = ({ onResponse }: ChatProps) => {
  const { mutateAsync: chat } = useChat();

  const handleChat = async () => {
    try {
      const messages: ChatMessage[] = [
        {
          role: 'user',
          content: 'Hello, what mobile app development platform do you use?',
        },
      ];

      const response = await chat({
        messages,
        temperature: 0.7,
        maxTokens: 1024,
      });

      onResponse(response.choices[0].message.content);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('Unknown error occurred');
      console.error('Error chatting:', error);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Chat with AI</Text>
        <Button label="Send Message" onPress={handleChat} />
      </View>
    </SafeAreaView>
  );
};
