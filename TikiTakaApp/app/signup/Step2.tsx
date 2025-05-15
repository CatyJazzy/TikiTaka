import { YStack, Text, Button, XStack, Stack } from 'tamagui';
import { Image, ScrollView, KeyboardAvoidingView, Platform, Linking } from 'react-native';
import { SignupStepProps } from './types';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export const Step2 = ({ formData, onUpdate, onNext, onPrev }: SignupStepProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handlePortalLink = () => {
    Linking.openURL('https://portal.korea.ac.kr');
  };

  const pickImage = async () => {
    try {
      setIsUploading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        onUpdate({ portalImage: result.assets[0].uri });
      }
    } catch (error) {
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const isFormValid = !!formData.portalImage;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <YStack space="$4" width="100%" maxWidth={480} alignItems="center" paddingVertical="$4">
          <Text fontSize="$6" fontWeight="bold" textAlign="center">
            포털 인증
          </Text>
          <Text textAlign="center" marginBottom="$4" color="$gray11">
            포털 사이트에서 해당 화면을 캡처하여 등록해 주세요.
          </Text>
          
          <YStack space="$2" width="100%" marginBottom="$4">
            <Text color="$gray11" fontSize="$3">1. 포털로 이동하기</Text>
            <Text color="$gray11" fontSize="$3">2. 상단 중앙의 이름(아이디) 영역 캡처</Text>
            <Text color="$gray11" fontSize="$3">3. 캡처한 이미지 업로드</Text>
          </YStack>

          <Button
            onPress={handlePortalLink}
            backgroundColor="$gray2"
            color="$gray12"
            size="$4"
            width="100%"
            marginBottom="$2"
          >
            고려대학교 포털 바로가기
          </Button>

          <Stack width="100%" height={200} marginVertical="$4">
            {formData.portalImage ? (
              <Image
                source={{ uri: formData.portalImage }}
                style={{ width: '100%', height: '100%', borderRadius: 8 }}
                resizeMode="contain"
              />
            ) : (
              <Stack
                width="100%"
                height="100%"
                backgroundColor="$gray3"
                borderRadius={8}
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
            disabled={isUploading}
          >
            {isUploading ? '업로드 중...' : (formData.portalImage ? '이미지 변경하기' : '이미지 선택하기')}
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
              disabled={!isFormValid}
              opacity={isFormValid ? 1 : 0.5}
            >
              다음
            </Button>
          </XStack>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}; 