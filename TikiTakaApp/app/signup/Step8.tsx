import { YStack, Text, Button, XStack, ScrollView } from 'tamagui';
import { SignupStepProps } from './types';
import { Checkbox } from '@tamagui/checkbox';
import { Check } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Step8 = ({ onNext }: SignupStepProps) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const { t } = useTranslation();

  return (
    <YStack space="$4" width="100%" maxWidth={340} alignItems="center" padding="$4">
      <Text fontSize="$5" fontWeight="bold" textAlign="center" marginBottom="$4">
        {t('signup.step8.title')}
      </Text>

      <ScrollView style={{ width: '100%', maxHeight: 400 }}>
        <Text textAlign="justify" marginBottom="$4" color="$gray11">
          {t('signup.step8.description')}
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
          {t('signup.step8.agreement')}
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
        {t('signup.step8.continueButton')}
      </Button>
    </YStack>
  );
}; 