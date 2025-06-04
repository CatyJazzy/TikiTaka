import { YStack, Text, Button, XStack, ScrollView } from 'tamagui';
import { SignupStepProps } from './types';
import { Checkbox } from '@tamagui/checkbox';
import { Check } from '@tamagui/lucide-icons';
import { useState } from 'react';

export const Step0 = ({ onNext }: SignupStepProps) => {
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <YStack space="$4" width="100%" maxWidth={340} alignItems="center" padding="$4">
      <Text fontSize="$5" fontWeight="bold" textAlign="center" marginBottom="$4">
        개인정보 수집 및 이용 동의
      </Text>

      <ScrollView style={{ width: '100%', maxHeight: 400 }}>
        <Text textAlign="justify" marginBottom="$4" color="$gray11">
          저희 서비스는 좋은 친구를 추천해 드리고 만날 수 있게 하기 위해 아래와 같이 개인정보를 수집 및 이용합니다. 내용을 충분히 읽고 동의해 주세요!
        </Text>

        <YStack space="$2" padding="$2" backgroundColor="$gray2" borderRadius="$4">
          <Text fontWeight="bold">1. 수집하는 개인정보 항목</Text>
          <Text>- 필수항목: 이메일, 이름, 생년월일, 성별, 주 사용 언어, 목표 언어, 영어 가능 여부, 관심 활동</Text>
          <Text>- 선택항목: 기타 성별, 기타 활동</Text>

          <Text fontWeight="bold" marginTop="$2">2. 개인정보의 수집 및 이용목적</Text>
          <Text>- 회원 관리 및 서비스 제공</Text>
          <Text>- 맞춤형 친구 추천 서비스 제공</Text>
          <Text>- 서비스 이용에 따른 본인확인 및 연령확인</Text>

          <Text fontWeight="bold" marginTop="$2">3. 개인정보의 보유 및 이용기간</Text>
          <Text>- 회원 탈퇴 시까지 또는 법정 보유기간</Text>

          <Text fontWeight="bold" marginTop="$2">4. 동의를 거부할 권리 및 동의 거부에 따른 불이익</Text>
          <Text>- 개인정보 수집 및 이용에 대한 동의를 거부할 수 있으며, 동의 거부 시 회원가입이 제한됩니다.</Text>
        </YStack>
      </ScrollView>

      <XStack space="$2" alignItems="center" width="100%" marginTop="$4">
        <Checkbox
          id="privacy-agreement"
          checked={isAgreed}
          onCheckedChange={(checked: boolean) => setIsAgreed(checked)}
          size="$5"
          padding="$2"
        >
          <Checkbox.Indicator>
            <Check size={24} />
          </Checkbox.Indicator>
        </Checkbox>
        <Text fontSize="$4" flex={1}>
          위 내용을 읽었으며, 내용에 동의합니다
        </Text>
      </XStack>

      <Button
        onPress={onNext}
        backgroundColor="rgb(255,191,84)"
        color="$gray12"
        size="$4"
        width="100%"
        marginTop="$4"
        disabled={!isAgreed}
        opacity={isAgreed ? 1 : 0.5}
      >
        동의하고 계속하기
      </Button>
    </YStack>
  );
}; 