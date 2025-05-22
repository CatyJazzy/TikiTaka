import { Stack, Text, Button, ScrollView } from 'tamagui';
import { useRouter } from 'expo-router';

export default function CafeTourIndexScreen() {
  const router = useRouter();

  return (
    <Stack flex={1} backgroundColor="#FFF8E7">
      <ScrollView padding="$4" space="$4">
        <Text fontSize="$6" fontWeight="bold" textAlign="center" marginTop="$8" marginBottom="$2">
          카페 투어 퀘스트
        </Text>

        <Stack marginTop="$2" space="$4">
          {[1, 2, 3, 4, 5].map((num) => (
            <Button
              key={num}
              size="$5"
              backgroundColor="#FFB74D"
              width="100%"
              height={80}
              borderRadius={10}
              onPress={() => {
                router.push(`/cafe-tour/quest${num}`);
              }}
            >
              <Text color="white" fontSize="$5" fontWeight="bold" textAlign="center">
                카페 투어 퀘스트 {num} ☕️
              </Text>
            </Button>
          ))}
        </Stack>
      </ScrollView>
    </Stack>
  );
}
