import { Stack, Text, Button, YStack, XStack } from 'tamagui';
import { useState } from 'react';

export default function LanguageScreen() {
  const [selected, setSelected] = useState('ko');

  return (
    <Stack flex={1} alignItems="center" justifyContent="center" backgroundColor="rgba(255,255,240,0.3)">
      <YStack space="$4" alignItems="center" maxWidth={340} width="100%">
        <Text fontSize="$6" fontWeight="bold" marginBottom={8}>
          언어 설정
        </Text>
        <Text fontSize="$4" color="$gray10" marginBottom={12}>
          사용할 언어를 선택해주세요
        </Text>
        <XStack space="$4">
          <Button
            backgroundColor={selected === 'ko' ? 'rgb(255,191,84)' : '$gray2'}
            color="$gray12"
            borderWidth={1}
            borderColor={selected === 'ko' ? '$yellow8' : '$gray6'}
            onPress={() => setSelected('ko')}
          >
            한국어
          </Button>
          <Button
            backgroundColor={selected === 'en' ? 'rgb(255,191,84)' : '$gray2'}
            color="$gray12"
            borderWidth={1}
            borderColor={selected === 'en' ? '$yellow8' : '$gray6'}
            onPress={() => setSelected('en')}
          >
            English
          </Button>
        </XStack>
      </YStack>
    </Stack>
  );
} 