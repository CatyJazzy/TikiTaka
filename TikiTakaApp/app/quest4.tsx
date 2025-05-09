import { Stack, Text, Button } from 'tamagui';
import { useRouter } from 'expo-router';

export default function Quest4Screen() {
  const router = useRouter();

  return (
    <Stack flex={1} padding="$4" space="$4" backgroundColor="#FFF8E7">
      <Text fontSize="$6" fontWeight="bold" textAlign="center" marginBottom="$4">
        퀘스트4: 카페 포토 미션
      </Text>

      <Stack padding="$4" backgroundColor="white" borderRadius={10} space="$4">
        <Text fontSize="$5" lineHeight={24}>
          -친구와 함께 있는 순간을 사진으로 남겨주세요.{'\n\n'}
          - 한 사람은 사진을 찍고, 다른 한 사람은 찍히는 역할을 번갈아 가며 수행해주세요.{'\n\n'}
          조건: 단순 셀카가 아닌, 음료나 디저트와 함께 자연스럽게 찍기.
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
    </Stack>
  );
} 