import { Stack, Text, Button, XStack, YStack, ScrollView } from 'tamagui';
import { useRouter } from 'expo-router';

export default function Quest5Screen() {
  const router = useRouter();

  return (
    <Stack flex={1} backgroundColor="#FFF8E7">
      <ScrollView padding="$4" space="$4">
        <Text fontSize="$6" fontWeight="bold" textAlign="center" marginTop="$8" marginBottom="$4">
          퀘스트5: 서로의 최애 카페 분위기 공유하기
        </Text>

        <Stack padding="$4" backgroundColor="white" borderRadius={10} space="$4">
          <Text fontSize="$5" lineHeight={24}>
            - 각자 좋아하는 카페 분위기를 공유하고, 서로의 취향을 알아보세요.{'\n'}
            - 분위기와 이유를 설명해주세요.
          </Text>
        </Stack>

        <Button
          size="$5"
          backgroundColor="#FFB74D"
          width="100%"
          height={50}
          borderRadius={10}
          onPress={() => {
            router.push('/diary');
          }}
        >
          <Text color="white" fontSize="$5" fontWeight="bold">
            다이어리 작성하기
          </Text>
        </Button>

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