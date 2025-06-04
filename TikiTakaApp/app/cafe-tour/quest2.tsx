import { Stack, Text, Button, XStack, YStack, ScrollView } from 'tamagui';
import { useRouter } from 'expo-router';

export default function Quest2Screen() {
  const router = useRouter();

  return (
    <Stack flex={1} backgroundColor="#FFF8E7">
      <ScrollView padding="$4" space="$4">
        <Text fontSize="$6" fontWeight="bold" textAlign="center" marginTop="$8" marginBottom="$4">
          퀘스트2: 서로의 최애 카페 메뉴 공유하기
        </Text>

        <Stack padding="$4" backgroundColor="white" borderRadius={10} space="$4">
          <Text fontSize="$5" lineHeight={32}>
            - 각자 좋아하는 카페 메뉴를 공유하고, 서로의 취향을 알아보세요.{'\n\n'}
            - 메뉴 이름과 이유를 설명해주세요.
          </Text>
        </Stack>

        <Text fontSize="$6" fontWeight="bold" textAlign="center" marginTop="$4" marginBottom="$4">
          카페 취향 밸런스 게임
        </Text>

        <Stack padding="$4" backgroundColor="white" borderRadius={10} space="$4">
          <Text fontSize="$5" lineHeight={32}>
            - 한옥카페 vs 신식카페{'\n\n'}
            - 조용한 분위기 vs 신나는 음악{'\n\n'}
            - 카페의 새로운 시그니쳐 메뉴 도전 vs 늘 먹던 메뉴{'\n\n'}
            - 아아 vs 뜨아{'\n\n'}
            - 깔끔한 감성 카페 vs 따뜻한 감성 카페{'\n\n'}
            - 프렌차이즈 카페 vs 개인 카페
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