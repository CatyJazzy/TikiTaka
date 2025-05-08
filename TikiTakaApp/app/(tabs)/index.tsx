import { Stack, Text } from 'tamagui';
import { useRouter } from 'expo-router';

export default function TabOneScreen() {
  const router = useRouter();
  return (
    <Stack flex={1} alignItems="center" justifyContent="center" space="$4">
      <Text fontSize="$6" fontWeight="bold">
        홈 화면
      </Text>
      <Text fontSize="$4" color="$gray11">
        환영합니다!
      </Text>
    </Stack>
  );
}
