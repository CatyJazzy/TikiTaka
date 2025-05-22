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
          <Text fontSize="$5" lineHeight={24}>
            - 각자 좋아하는 카페 메뉴를 공유하고, 서로의 취향을 알아보세요.{'\n'}
            - 메뉴 이름과 이유를 설명해주세요.
          </Text>
        </Stack>

        <Button
          size="$5"
          backgroundColor="#FFB74D"
          width="100%"
          height={50}
          borderRadius={10}
          onPress={() => {
            router.push('/quest');
          }}
        >
          <Text color="white" fontSize="$5" fontWeight="bold">
            카페 투어 함께 가기
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