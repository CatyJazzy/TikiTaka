import { Stack, Text, Button, YStack, ScrollView } from 'tamagui';
import { useRouter } from 'expo-router';

export default function StudyScreen() {
  const router = useRouter();

  const quests = [
    {
      title: "공부 취향 공유하기",
      route: "/study/quest1"
    },
    {
      title: "공부 장소 선정하기",
      route: "/study/quest2"
    },
    {
      title: "밖에서 만나 같이 공부하기",
      route: "/study/quest3"
    },
    {
      title: "학교에서 만나 같이 공부하기",
      route: "/study/quest4"
    },
    {
      title: "공부 기록 업로드",
      route: "/study/quest5"
    },
    {
      title: "Best 공부 장소 선정",
      route: "/study/quest6"
    }
  ];

  return (
    <Stack flex={1} backgroundColor="#FFF8E7">
      <ScrollView padding="$4" space="$4">
        <Text fontSize="$6" fontWeight="bold" textAlign="center" marginTop="$8" marginBottom="$4">
          공부 퀘스트
        </Text>

        <YStack space="$4">
          {quests.map((quest, index) => (
            <Button
              key={index}
              size="$5"
              backgroundColor="#FFB74D"
              width="100%"
              height={60}
              borderRadius={10}
              onPress={() => {
                router.push(quest.route);
              }}
            >
              <Text color="white" fontSize="$5" fontWeight="bold">
                {quest.title}
              </Text>
            </Button>
          ))}
        </YStack>
      </ScrollView>
    </Stack>
  );
}
