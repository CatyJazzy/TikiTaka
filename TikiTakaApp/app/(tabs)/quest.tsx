import { Stack, Text, Button, XStack, YStack, ScrollView } from 'tamagui';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

export default function QuestScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Stack flex={1} padding="$4" space="$4">
          <Text fontSize="$8" fontWeight="bold">{t('quest.title')}</Text>

          <Stack marginTop="$2" space="$4">
            <Button
              size="$5"
              backgroundColor="#FFB74D"
              width="100%"
              height={80}
              borderRadius={10}
              onPress={() => {
                router.push('/cafe-tour');
              }}
            >
              <Text color="white" fontSize="$5" fontWeight="bold" textAlign="center">
                카페 투어하기 ☕️
              </Text>
            </Button>

            <Button
              size="$5"
              backgroundColor="#FFB74D"
              width="100%"
              height={80}
              borderRadius={10}
              onPress={() => {
                router.push('/study');
              }}
            >
              <Text color="white" fontSize="$5" fontWeight="bold" textAlign="center">
                같이 공부하기 ✏️
              </Text>
            </Button>
          </Stack>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
} 