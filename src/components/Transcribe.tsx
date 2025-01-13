import { useAssets } from 'expo-asset';
import React from 'react';

import { Button, Text, View } from '@/components/ui';
import { useTranscription } from '@/lib/hooks/useTranscription';

interface RecordProps {
  onTranscribe: (transcription: string) => void;
}

export const Transcribe = ({ onTranscribe }: RecordProps) => {
  const { mutateAsync: transcribe } = useTranscription();
  const [assets] = useAssets([
    require('../../assets/audioSamples/sample-2.mp3'),
  ]);

  const handleTranscribe = async () => {
    try {
      const fileUri = assets?.[0]?.localUri;
      if (!fileUri) {
        throw new Error('No audio file found');
      }

      const transcription = await transcribe({
        audioFile: {
          uri: fileUri,
          type: 'audio/mpeg',
        },
      });

      onTranscribe(transcription.text);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('Unknown error occurred');
      console.error('Error transcribing:', error);
    }
  };

  return (
    <View>
      <Text>Get transciption</Text>
      <Button label="Transcribe" onPress={handleTranscribe} />
    </View>
  );
};
