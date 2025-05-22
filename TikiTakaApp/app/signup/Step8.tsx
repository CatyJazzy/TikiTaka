import { YStack, Text, Button, XStack, ScrollView } from 'tamagui';
import { SignupStepProps } from './types';
import { Checkbox } from '@tamagui/checkbox';
import { Check } from '@tamagui/lucide-icons';
import { useState } from 'react';

export const Step8 = ({ onNext }: SignupStepProps) => {
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <YStack space="$4" width="100%" maxWidth={340} alignItems="center" padding="$4">
      <Text fontSize="$5" fontWeight="bold" textAlign="center" marginBottom="$4">
        매칭 정보 활용 동의
      </Text>

      <ScrollView style={{ width: '100%', maxHeight: 400 }}>
        <Text textAlign="justify" marginBottom="$4" color="$gray11">
          저희는 더 잘 맞는 친구를 추천하기 위해 회원님이 입력한 관심 활동, 나이, 성별, 언어 정보를 바탕으로 매칭 우선순위를 정합니다. 해당 정보는 오직 친구 매칭을 위한 용도로만 사용되며, 회원님의 동의 없이 외부에 공개되거나 다른 목적으로 활용되지 않습니다.
        </Text>
      </ScrollView>

      <XStack space="$2" alignItems="center" width="100%" marginTop="$4">
        <Checkbox
          id="matching-agreement"
          checked={isAgreed}
          onCheckedChange={(checked: boolean) => setIsAgreed(checked)}
          size="$5"
          padding="$2"
        >
          <Checkbox.Indicator>
            <Check size={24} />
          </Checkbox.Indicator>
        </Checkbox>
        <Text fontSize={14.5} flex={1}>
          위 정보를 매칭 알고리즘에 사용하는 데 동의합니다
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