import { Stack, Text, Button, XStack, YStack, ScrollView, Input } from 'tamagui';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Linking } from 'react-native';

export default function Quest1Screen() {
  const router = useRouter();
  const [cafe1, setCafe1] = useState('');
  const [cafe2, setCafe2] = useState('');

  const handleMapPress = async () => {
    const url = 'https://www.google.com/maps/?authuser=0&entry=ttu&g_ep=EgoyMDI1MDUwNi4wIKXMDSoASAFQAw%3D%3D';
    const supported = await Linking.canOpenURL(url);
    
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("Google Maps를 열 수 없습니다.");
    }
  };

  return (
    <Stack flex={1} backgroundColor="#FFF8E7">
      <ScrollView padding="$4" space="$4">
        <Text fontSize="$6" fontWeight="bold" textAlign="center" marginTop="$8" marginBottom="$4">
          퀘스트1: 서로의 최애 카페 스타일 공유하기
        </Text>

        <Stack padding="$4" backgroundColor="white" borderRadius={10} space="$4">
          <Text fontSize="$5" lineHeight={24}>
            - 각자 좋아하는 카페 스타일을 공유하고, 서로의 취향을 알아보세요.{'\n'}
            - 카페 이름을 입력하고, 서로의 취향을 공유해보세요.
          </Text>
        </Stack>

        <Button
          size="$5"
          backgroundColor="#FFB74D"
          width="100%"
          height={50}
          borderRadius={10}
          onPress={handleMapPress}
        >
          <Text color="white" fontSize="$5" fontWeight="bold">
            지도 바로가기
          </Text>
        </Button>

        <Button
          size="$5"
          backgroundColor="#FFB74D"
          width="100%"
          height={50}
          borderRadius={10}
          onPress={() => {
            router.push('/quest');
          }}
        >
          <Text color="white" fontSize="$5" fontWeight="bold">
            카페 투어 함께 가기
          </Text>
        </Button>

        <Stack space="$4">
          <Stack space="$2">
            <Text fontSize="$5" fontWeight="bold">
              내가 가고 싶은 카페
            </Text>
            <Input
              value={cafe1}
              onChangeText={setCafe1}
              placeholder="카페 이름을 입력하세요"
              fontSize="$5"
              padding="$4"
              backgroundColor="#FFF8E7"
              borderRadius={10}
            />
          </Stack>

          <Stack space="$2">
            <Text fontSize="$5" fontWeight="bold">
              상대방이 가고 싶은 카페
            </Text>
            <Input
              value={cafe2}
              onChangeText={setCafe2}
              placeholder="카페 이름을 입력하세요"
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