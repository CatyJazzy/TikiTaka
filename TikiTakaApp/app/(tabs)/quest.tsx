import { Stack, Text, Button, XStack, YStack, ScrollView } from 'tamagui';
import { useRouter } from 'expo-router';

export default function QuestScreen() {
  const router = useRouter();

  return (
    <Stack flex={1} backgroundColor="#FFF8E7">
      <ScrollView padding="$4" space="$4">
        <Text fontSize="$6" fontWeight="bold" textAlign="center" marginTop="$8" marginBottom="$2">
          퀘스트
        </Text>

        <Stack marginTop="$2" space="$4">
          <Button
            size="$5"
            backgroundColor="#FFB74D"
            width="100%"
            height={80}
            borderRadius={10}
            onPress={() => {
              router.push('/cafe-tour');
            }}
          >
            <Text color="white" fontSize="$5" fontWeight="bold" textAlign="center">
              카페 투어하기 ☕️
            </Text>
          </Button>

          <Button
            size="$5"
            backgroundColor="#FFB74D"
            width="100%"
            height={80}
            borderRadius={10}
            onPress={() => {
              router.push('/study');
            }}
          >
            <Text color="white" fontSize="$5" fontWeight="bold" textAlign="center">
              같이 공부하기 ✏️
            </Text>
          </Button>
        </Stack>
      </ScrollView>
    </Stack>
  );
} 