import { Stack, Text, Button, YStack, ScrollView } from 'tamagui';
import { useRouter } from 'expo-router';

export default function StudyQuest6Screen() {
  const router = useRouter();

  return (
    <Stack flex={1} backgroundColor="#FFF8E7">
      <ScrollView padding="$4" space="$4">
        <Text fontSize="$6" fontWeight="bold" textAlign="center" marginTop="$8" marginBottom="$4">
          Best 공부 장소 선정
        </Text>

        <Stack padding="$4" backgroundColor="white" borderRadius={10} space="$4">
          <Text fontSize="$5" lineHeight={24}>
            - 지금까지 공부했던 장소들 중 가장 좋았던 곳을 선정해보세요.{'\n'}
            - 선정한 장소의 장점과 단점을 정리해보세요.{'\n'}
            - 다른 친구들과 공부 장소를 공유하고 추천해보세요.
          </Text>
        </Stack>

        <Button
          size="$5"
          backgroundColor="#FFB74D"
          width="100%"
          height={50}
          borderRadius={10}
          onPress={() => {
            router.back();
          }}
        >
          <Text color="white" fontSize="$5" fontWeight="bold">
            뒤로가기
          </Text>
        </Button>
      </ScrollView>
    </Stack>
  );
} 