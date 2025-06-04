import { Stack, Text, Button, Input, YStack, ScrollView, XStack } from 'tamagui';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Checkbox } from '@tamagui/checkbox';
import { Check } from '@tamagui/lucide-icons';

export default function StudyQuest3Screen() {
  const router = useRouter();
  const [studyPlace, setStudyPlace] = useState('');
  const [todos, setTodos] = useState(['', '', '', '', '', '']);
  const [checkedItems, setCheckedItems] = useState([false, false, false, false, false, false]);

  const handleTodoChange = (index: number, value: string) => {
    const newTodos = [...todos];
    newTodos[index] = value;
    setTodos(newTodos);
  };

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = checked;
    setCheckedItems(newCheckedItems);
  };

  return (
    <Stack flex={1} backgroundColor="#FFF8E7">
      <ScrollView padding="$4" space="$4">
        <Text fontSize="$6" fontWeight="bold" textAlign="center" marginTop="$8" marginBottom="$4">
          밖에서 만나 같이 공부하기
        </Text>

        <Stack padding="$4" backgroundColor="white" borderRadius={10} space="$4">
          <Text fontSize="$5" lineHeight={24}>
            - 학교 밖에서 만나서 함께 공부해보세요{'\n'}
            - 서로의 공부 목록을 만들어 공유해보세요{'\n'}
            - 1시간 공부 후 10분 쉬는 시간을 갖는 뽀모도로 공부법을 추천합니다.
          </Text>
        </Stack>

        <Stack space="$4">
          <Stack space="$2">
            <Text fontSize="$5" fontWeight="bold">
              오늘 만나서 공부한 장소
            </Text>
            <Input
              value={studyPlace}
              onChangeText={setStudyPlace}
              placeholder="공부한 장소를 입력하세요"
              fontSize="$5"
              padding="$4"
              backgroundColor="#FFF8E7"
              borderRadius={10}
            />
          </Stack>

          <Stack space="$2">
            <Text fontSize="$5" fontWeight="bold">
              나의 Todo list
            </Text>
            {todos.map((todo, index) => (
              <XStack key={index} space="$2" alignItems="center">
                <Input
                  value={todo}
                  onChangeText={(value) => handleTodoChange(index, value)}
                  placeholder={`할 일 ${index + 1}`}
                  fontSize="$5"
                  padding="$4"
                  backgroundColor="#FFF8E7"
                  borderRadius={10}
                  flex={1}
                />
                <Checkbox
                  checked={checkedItems[index]}
                  onCheckedChange={(checked) => handleCheckboxChange(index, checked as boolean)}
                  size="$4"
                  backgroundColor={checkedItems[index] ? "#FFB74D" : "white"}
                  borderColor="#FFB74D"
                >
                  {checkedItems[index] && <Check size="$2" color="white" />}
                </Checkbox>
              </XStack>
            ))}
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