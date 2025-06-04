import { Stack, Text, Button, YStack, ScrollView } from 'tamagui';
import { useRouter } from 'expo-router';

export default function StudyQuest5Screen() {
  const router = useRouter();

  return (
    <Stack flex={1} backgroundColor="#FFF8E7">
      <ScrollView padding="$4" space="$4">
        <Text fontSize="$6" fontWeight="bold" textAlign="center" marginTop="$8" marginBottom="$4">
          공부 기록 업로드
        </Text>

        <Stack padding="$4" backgroundColor="white" borderRadius={10} space="$4">
          <Text fontSize="$5" lineHeight={24}>
            - 함께 공부할 날짜와 시간을 정해보세요.{'\n'}
            - 공부할 장소를 선택하고, 어떤 공부를 할지 계획해보세요.{'\n'}
            - 서로의 공부 계획을 공유하고 함께 실천해보세요.
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
            다이어리
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