import { useState } from 'react';
import { Stack, Text, XStack, YStack, Button, Card, Image } from 'tamagui';
import { RefreshCw, Settings } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface User {
  id: string;
  name: string;
  image: string;
  age: number;
  location: string;
  interests: string[];
  matchScore: number;
}

export default function MatchingScreen() {
  const router = useRouter();
  const [matchedUsers, setMatchedUsers] = useState<User[]>([]);

  const handleRefresh = () => {
    // TODO: API 호출하여 매칭 결과 갱신
    console.log('매칭 결과 갱신');
  };

  const handlePreferencesPress = () => {
    router.push('/matching-preferences');
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Stack flex={1} padding="$4" space="$4">
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontSize="$8" fontWeight="bold">Buddies</Text>
              <XStack space="$2">
                <Button
                  icon={Settings}
                  circular
                  onPress={handlePreferencesPress}
                  theme="active"
                />
                <Button
                  icon={RefreshCw}
                  circular
                  onPress={handleRefresh}
                  theme="active"
                />
              </XStack>
            </XStack>

            {/* 매칭 결과 */}
            <YStack space="$4">
              {matchedUsers.map((user) => (
                <Card key={user.id} elevate size="$4" bordered>
                  <Card.Header padded>
                    <Image
                      source={{ uri: user.image }}
                      width={300}
                      height={200}
                      borderRadius="$4"
                    />
                  </Card.Header>
                  <Card.Footer padded>
                    <YStack space="$2">
                      <XStack justifyContent="space-between" alignItems="center">
                        <Text fontSize="$6" fontWeight="bold">{user.name}</Text>
                        <Text fontSize="$4" color="$gray11">{user.age}세</Text>
                      </XStack>
                      <Text fontSize="$4" color="$gray11">{user.location}</Text>
                      <XStack flexWrap="wrap" space="$2">
                        {user.interests.map((interest, index) => (
                          <Text
                            key={index}
                            backgroundColor="$gray5"
                            paddingHorizontal="$2"
                            paddingVertical="$1"
                            borderRadius="$2"
                            fontSize="$3"
                          >
                            {interest}
                          </Text>
                        ))}
                      </XStack>
                      <Text fontSize="$4" color="$blue10">
                        매칭 점수: {user.matchScore}%
                      </Text>
                    </YStack>
                  </Card.Footer>
                </Card>
              ))}
            </YStack>
          </Stack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 