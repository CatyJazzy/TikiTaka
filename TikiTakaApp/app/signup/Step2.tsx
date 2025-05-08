import { YStack, Text, Button, Input, XStack } from 'tamagui';
import { Linking } from 'react-native';
import { SignupStepProps } from './types';

export const Step2 = ({ formData, onUpdate, onNext, onPrev }: SignupStepProps) => {
  const handlePortalLink = () => {
    Linking.openURL('https://portal.yonsei.ac.kr');
  };

  return (
    <YStack space="$4" width="100%" maxWidth={340} alignItems="center">
      <Text fontSize="$6" fontWeight="bold" textAlign="center" marginBottom="$4">
        포털 인증
      </Text>
      <Text textAlign="center" marginBottom="$4" color="$gray11">
        포털 사이트에서 해당 화면을 캡처하여 등록해 주세요.
      </Text>
      
      <YStack space="$2" width="100%" marginBottom="$4">
        <Text color="$gray11" fontSize="$3">1. 연세포털 로그인</Text>
        <Text color="$gray11" fontSize="$3">2. 상단 중앙의 이름(아이디) 영역 캡처</Text>
        <Text color="$gray11" fontSize="$3">3. 캡처한 이미지 업로드</Text>
      </YStack>

      <Button
        onPress={handlePortalLink}
        backgroundColor="$gray2"
        color="$gray12"
        size="$4"
        width="100%"
        marginBottom="$4"
      >
        연세포털 바로가기
      </Button>

      <Input
        placeholder="캡처한 이미지 URL을 입력해주세요"
        value={formData.portalImage}
        onChangeText={(value) => onUpdate({ portalImage: value })}
        width="100%"
      />

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
          다음
        </Button>
      </XStack>
    </YStack>
  );
}; 