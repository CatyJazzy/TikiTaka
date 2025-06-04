import { Stack, Text, Button, Input, YStack, ScrollView } from 'tamagui';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function StudyQuest2Screen() {
  const router = useRouter();
  const [firstPlace, setFirstPlace] = useState('');
  const [secondPlace, setSecondPlace] = useState('');
  const [thirdPlace, setThirdPlace] = useState('');

  return (
    <Stack flex={1} backgroundColor="#FFF8E7">
      <ScrollView padding="$4" space="$4">
        <Text fontSize="$6" fontWeight="bold" textAlign="center" marginTop="$8" marginBottom="$4">
          공부 장소 선정하기
        </Text>

        <Stack padding="$4" backgroundColor="white" borderRadius={10} space="$4">
          <Text fontSize="$5" lineHeight={24}>
            - 함께 공부하고 싶은 장소를 선정해보세요{'\n'}
            - 리스트에 없는 장소도 괜찮습니다
          </Text>
        </Stack>

        <Stack padding="$4" backgroundColor="white" borderRadius={10} space="$4">
          <Text fontSize="$5" fontWeight="bold" marginBottom="$2">
            티키타카가 추천하는 장소
          </Text>
          <YStack space="$2">
            <Text fontSize="$4" fontWeight="bold">교내:</Text>
            <Text fontSize="$4">• SK 미래관 전층</Text>
            <Text fontSize="$4">• 교육관 4층</Text>
            <Text fontSize="$4">• 교육관 1층</Text>
            <Text fontSize="$4">• 이명박 라운지</Text>
            <Text fontSize="$4">• 중지 CCL</Text>
            <Text fontSize="$4" fontWeight="bold" marginTop="$2">안암 카공 스팟:</Text>
            <Text fontSize="$4">• 법학관 투썸</Text>
            <Text fontSize="$4">• 스타벅스 종암DT점</Text>
            <Text fontSize="$4">• 나이스카페인클럽</Text>
            <Text fontSize="$4">• 카페파인</Text>
            <Text fontSize="$4">• 와플앨리</Text>
            <Text fontSize="$4">• 밀크 브라운</Text>
          </YStack>
        </Stack>

        <Stack space="$4">
          <Stack space="$2">
            <Text fontSize="$5" fontWeight="bold">
              함께 공부하고 싶은 장소 순위
            </Text>
            <Input
              value={firstPlace}
              onChangeText={setFirstPlace}
              placeholder="1순위 장소를 입력하세요"
              fontSize="$5"
              padding="$4"
              backgroundColor="#FFF8E7"
              borderRadius={10}
            />
            <Input
              value={secondPlace}
              onChangeText={setSecondPlace}
              placeholder="2순위 장소를 입력하세요"
              fontSize="$5"
              padding="$4"
              backgroundColor="#FFF8E7"
              borderRadius={10}
            />
            <Input
              value={thirdPlace}
              onChangeText={setThirdPlace}
              placeholder="3순위 장소를 입력하세요"
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