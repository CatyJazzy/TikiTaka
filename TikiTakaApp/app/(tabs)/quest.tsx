import { Stack, Text, Button } from 'tamagui';
import { useRouter } from 'expo-router';

export default function QuestScreen() {
  const router = useRouter();
  
  return (
    <Stack flex={1} alignItems="center" justifyContent="center" space="$4">
      <Text fontSize="$6" fontWeight="bold">퀘스트</Text>
      <Button onPress={() => router.push('/login')} width={180}>
        로그인 페이지로 이동
      </Button>
      <Button onPress={() => router.push('/loading')} width={180}>
        로딩 페이지로 이동
      </Button>
      <Button onPress={() => router.push('/signup')} width={180}>
        가입 페이지로 이동
      </Button>
    </Stack>
  );
} 