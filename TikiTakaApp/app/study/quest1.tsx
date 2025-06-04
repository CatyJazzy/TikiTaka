import { Stack, Text, Button, Input, YStack, ScrollView } from 'tamagui';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function StudyQuest1Screen() {
  const router = useRouter();
  const [studyStyle, setStudyStyle] = useState('');

  return (
    <Stack flex={1} backgroundColor="#FFF8E7">
      <ScrollView padding="$4" space="$4">
        <Text fontSize="$6" fontWeight="bold" textAlign="center" marginTop="$8" marginBottom="$4">
          공부 취향 공유하기
        </Text>

        <Stack padding="$4" backgroundColor="white" borderRadius={10} space="$4">
          <Text fontSize="$5" lineHeight={24}>
            - 밸런스 게임을 통해 서로 좋아하는 공부 스타일을 공유해보세요{'\n'}
            - 공부하기 좋은 장소를 서로 추천해보세요
          </Text>
        </Stack>

        <Stack padding="$4" backgroundColor="white" borderRadius={10} space="$4">
          <Text fontSize="$5" fontWeight="bold" marginBottom="$2">
            밸런스 게임: 좋아하는 공부 스타일 고르기
          </Text>
          <YStack space="$2">
            <Text fontSize="$4">• 조용한 곳 vs 생활소음</Text>
            <Text fontSize="$4">• 음악을 들으면서 공부 vs 음악을 듣지 않으면서 공부</Text>
            <Text fontSize="$4">• 손필기 VS 타이핑</Text>
            <Text fontSize="$4">• 집에서 공부 vs 공부</Text>
            <Text fontSize="$4">• 달콤한 것과 함께 공부 vs 공부할 땐 공부만</Text>
            <Text fontSize="$4">• 다양한 필기구 필수 VS 나는 검정 펜 하나면 끝</Text>
          </YStack>
        </Stack>

        <Stack space="$4">
          <Stack space="$2">
            <Text fontSize="$5" fontWeight="bold">
              내가 추천받은 공부 장소
            </Text>
            <Input
              value={studyStyle}
              onChangeText={setStudyStyle}
              placeholder="추천받은 공부 장소를 입력하세요"
              fontSize="$5"
              padding="$4"
              backgroundColor="#FFF8E7"
              borderRadius={10}
            />
          </Stack>
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