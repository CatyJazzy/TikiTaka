import React from 'react';
import { Stack, Text, Button, YStack } from 'tamagui';
import { useRouter } from 'expo-router';

export default function ChatScreen() {
  const router = useRouter();

  return (
    <YStack flex={1} padding="$4" space="$4" paddingTop="$8" backgroundColor="rgba(255, 255, 240, 0.3)">
      <Stack space="$4">
        <Text fontSize="$6" fontWeight="bold" textAlign="center">채팅</Text>
        
        <YStack space="$4" marginTop="$4">
          <Button
            onPress={() => router.push('/loading')}
            backgroundColor="$blue10"
            color="white"
          >
            로딩 페이지로 이동
          </Button>

          <Button
            onPress={() => router.push('/login')}
            backgroundColor="$green10"
            color="white"
          >
            로그인 페이지로 이동
          </Button>
        </YStack>
      </Stack>
    </YStack>
  );
} 