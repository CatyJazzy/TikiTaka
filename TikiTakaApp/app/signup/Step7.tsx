import { YStack, Text, Button, XStack, Stack } from 'tamagui';
import { Image } from 'react-native';
import { SignupStepProps } from './types';
import * as ImagePicker from 'expo-image-picker';

export const Step7 = ({ formData, onUpdate, onNext, onPrev }: SignupStepProps) => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      onUpdate({ profileImage: result.assets[0].uri });
    }
  };

  return (
    <YStack space="$4" width="100%" maxWidth={340} alignItems="center">
      <Text fontSize="$6" fontWeight="bold" textAlign="center" marginBottom="$4">
        프로필 이미지
      </Text>
      <Text textAlign="center" marginBottom="$4" color="$gray11">
        나를 표현할 수 있는 사진을 업로드 해 주세요.(선택 사항)
      </Text>

      <Stack width={200} height={200} marginVertical="$4">
        {formData.profileImage ? (
          <Image
            source={{ uri: formData.profileImage }}
            style={{ width: '100%', height: '100%', borderRadius: 100 }}
          />
        ) : (
          <Stack
            width="100%"
            height="100%"
            backgroundColor="$gray3"
            borderRadius={100}
            justifyContent="center"
            alignItems="center"
          >
            <Text color="$gray11">이미지 없음</Text>
          </Stack>
        )}
      </Stack>

      <Button
        onPress={pickImage}
        backgroundColor="$gray2"
        color="$gray12"
        size="$4"
        width="100%"
      >
        {formData.profileImage ? '이미지 변경하기' : '이미지 선택하기'}
      </Button>

      <XStack space="$4" width="100%" marginTop="$4">
        <Button
          onPress={onPrev}
          backgroundColor="$gray2"
          color="$gray12"
          size="$4"
          flex={1}
        >
          이전
        </Button>
        <Button
          onPress={onNext}
          backgroundColor="rgb(255,191,84)"
          color="$gray12"
          size="$4"
          flex={1}
        >
          회원가입 완료
        </Button>
      </XStack>
    </YStack>
  );
}; 