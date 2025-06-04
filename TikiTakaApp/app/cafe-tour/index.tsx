import { Stack, Text, Button, ScrollView } from 'tamagui';
import { useRouter } from 'expo-router';

export default function CafeTourIndexScreen() {
  const router = useRouter();

  const quests = [
    {
      title: "퀘스트1\n서로의 최애 카페 공유하기",
      route: "/cafe-tour/quest1"
    },
    {
      title: "퀘스트2\n서로의 최애 카페 스타일 공유하기",
      route: "/cafe-tour/quest2"
    },
    {
      title: "퀘스트3\n카페 고수 대결",
      route: "/cafe-tour/quest3"
    },
    {
      title: "퀘스트4\n카페 포토 미션",
      route: "/cafe-tour/quest4"
    },
    {
      title: "퀘스트5\nBEST 카페 선정",
      route: "/cafe-tour/quest5"
    }
  ];

  return (
    <Stack flex={1} backgroundColor="#FFF8E7">
      <ScrollView padding="$4" space="$4">
        <Text fontSize="$6" fontWeight="bold" textAlign="center" marginTop="$8" marginBottom="$2">
          카페 투어 퀘스트
        </Text>

        <Stack marginTop="$2" space="$4">
          {quests.map((quest, index) => (
            <Button
              key={index}
              size="$5"
              backgroundColor="#FFB74D"
              width="100%"
              height={80}
              borderRadius={10}
              onPress={() => {
                router.push(quest.route);
              }}
            >
              <Text color="white" fontSize="$5" fontWeight="bold" textAlign="center">
                {quest.title} ☕️
              </Text>
            </Button>
          ))}
        </Stack>
      </ScrollView>
    </Stack>
  );
}
