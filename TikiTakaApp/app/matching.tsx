import { YStack, Text, Button, XStack, ScrollView } from 'tamagui';
import { useState } from 'react';

interface MatchedUser {
  id: string;
  name: string;
  // ... other user properties
}

export default function MatchingScreen() {
  const [matchedUsers, setMatchedUsers] = useState<MatchedUser[]>([]);

  // ... existing code for fetching matched users ...

  return (
    <YStack flex={1} backgroundColor="rgba(255, 255, 240, 0.3)">
      <XStack 
        width="100%" 
        padding="$4" 
        justifyContent="space-between" 
        alignItems="center"
        backgroundColor="white"
        borderBottomWidth={1}
        borderBottomColor="$gray4"
      >
        <Text fontSize="$6" fontWeight="bold">
          매칭된 친구
        </Text>
      </XStack>

      <ScrollView>
        {matchedUsers.map((user) => (
          <XStack
            key={user.id}
            padding="$4"
            backgroundColor="white"
            marginVertical="$2"
            borderRadius="$4"
            space="$4"
            alignItems="center"
          >
            {/* ... existing user info ... */}
          </XStack>
        ))}
      </ScrollView>
    </YStack>
  );
} 