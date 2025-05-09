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
              router.push('/quest1');
            }}
          >
            <Text color="white" fontSize="$5" fontWeight="bold" textAlign="center">
              퀘스트1{'\n'}서로의 최애 카페 스타일 공유하기
            </Text>
          </Button>

          <Button
            size="$5"
            backgroundColor="#FFB74D"
            width="100%"
            height={80}
            borderRadius={10}
            onPress={() => {
              router.push('/quest2');
            }}
          >
            <Text color="white" fontSize="$5" fontWeight="bold" textAlign="center">
              퀘스트2{'\n'}카페 취향 밸런스 게임
            </Text>
          </Button>

          <Button
            size="$5"
            backgroundColor="#FFB74D"
            width="100%"
            height={80}
            borderRadius={10}
            onPress={() => {
              router.push('/quest3');
            }}
          >
            <Text color="white" fontSize="$5" fontWeight="bold" textAlign="center">
              퀘스트3{'\n'}카페 고수 대결
            </Text>
          </Button>

          <Button
            size="$5"
            backgroundColor="#FFB74D"
            width="100%"
            height={80}
            borderRadius={10}
            onPress={() => {
              router.push('/quest4');
            }}
          >
            <Text color="white" fontSize="$5" fontWeight="bold" textAlign="center">
              퀘스트4{'\n'}카페 포토 미션
            </Text>
          </Button>

          <Button
            size="$5"
            backgroundColor="#FFB74D"
            width="100%"
            height={80}
            borderRadius={10}
            onPress={() => {
              router.push('/quest5');
            }}
          >
            <Text color="white" fontSize="$5" fontWeight="bold" textAlign="center">
              퀘스트5{'\n'}BEST 카페 선정
            </Text>
          </Button>
        </Stack>
      </ScrollView>
    </Stack>
  );
} 