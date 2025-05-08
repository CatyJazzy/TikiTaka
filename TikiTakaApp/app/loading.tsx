import { Stack, Text } from 'tamagui';

export default function LoadingScreen() {
  return (
    <Stack flex={1} alignItems="center" justifyContent="center">
      <Text fontSize="$6" fontWeight="bold">로딩 중...</Text>
    </Stack>
  );
} 