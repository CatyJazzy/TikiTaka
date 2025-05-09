import { Stack, Text, Button, TextArea, Input } from 'tamagui';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function DiaryScreen() {
  const router = useRouter();
  const [diaryText, setDiaryText] = useState('');
  const [date, setDate] = useState('');

  return (
    <Stack flex={1} padding="$4" space="$4" backgroundColor="#FFF8E7">
      <Text fontSize="$6" fontWeight="bold" textAlign="center" marginBottom="$4">
        다이어리
      </Text>

      <Stack padding="$4" backgroundColor="white" borderRadius={10} space="$4" flex={1}>
        <Stack space="$2">
          <Text fontSize="$5" fontWeight="bold" color="#666">
            날짜
          </Text>
          <Input
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
            fontSize="$5"
            padding="$4"
            backgroundColor="#FFF8E7"
            borderRadius={10}
          />
        </Stack>

        <Stack space="$2">
          <Text fontSize="$5" fontWeight="bold" color="#666">
            내용
          </Text>
          <TextArea
            value={diaryText}
            onChangeText={setDiaryText}
            placeholder="오늘의 카페 경험을 기록해보세요..."
            minHeight={200}
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
          // 여기에 다이어리 저장 로직 추가
          console.log('날짜:', date);
          console.log('다이어리 내용:', diaryText);
          router.back();
        }}
      >
        <Text color="white" fontSize="$5" fontWeight="bold">
          저장하기
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