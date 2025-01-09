// Helpful reference: https://github.dev/software-mansion/react-native-executorch/blob/main/examples/llama/components/Messages.tsx
import React, { useEffect, useState } from 'react';
import { LLAMA3_2_1B_QLORA, useLLM } from 'react-native-executorch';

import {
  ActivityIndicator,
  Button,
  Input,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';

export default function Onboarding() {
  const [message, setMessage] = useState('');

  const {
    generate,
    isGenerating,
    isReady,
    isModelReady,
    downloadProgress,
    response,
    isModelGenerating,
  } = useLLM({
    modelSource: LLAMA3_2_1B_QLORA,
    tokenizerSource: require('../../assets/tokenizer.bin'),
    contextWindowLength: 6,
  });

  const askLLM = async () => {
    try {
      await generate(message);
    } catch (error) {
      alert(error);
    }
  };

  // INFO: for debugging purposes only
  useEffect(() => {
    if (response && !isModelGenerating) {
      console.log('Message: ', response, 'end');
    }

    const interval = setInterval(() => {
      console.log('Debug - Response:', response);
      console.log('Debug - isModelGenerating:', isModelGenerating);
    }, 1000);

    return () => clearInterval(interval);
  }, [response, isModelGenerating]);

  return (
    <SafeAreaView>
      <View className="flex h-full p-2">
        <View>
          <Text>Statuses:</Text>
          <Text>Download Progress: {downloadProgress.toString()}</Text>
          <Text>isReady: {isReady.toString()}</Text>
          <Text>isModelReady: {isModelReady.toString()}</Text>
          <Text>isGenerating: {isGenerating.toString()}</Text>
        </View>
        <View className="flex-1 bg-gray-100">
          <Text>Response: {response}</Text>
        </View>
        <View className="relative">
          {isGenerating && (
            <View className="absolute inset-0 bg-gray-100">
              <ActivityIndicator />
            </View>
          )}
          <Input
            placeholder="Enter your message"
            value={message}
            onChangeText={setMessage}
          />
          <Button
            onPress={askLLM}
            label="Ask"
            disabled={
              isGenerating ||
              !isModelReady ||
              !isReady ||
              !message ||
              message === ''
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
