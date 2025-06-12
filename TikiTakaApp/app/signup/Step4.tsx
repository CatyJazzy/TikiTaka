import { YStack, Text, Button, Input, XStack, Stack } from 'tamagui';
import { Select } from '@tamagui/select';
import { Check } from '@tamagui/lucide-icons';
import { SignupStepProps } from './types';
import { Adapt } from '@tamagui/adapt';
import { useTranslation } from 'react-i18next';

export const Step4 = ({ formData, onUpdate, onNext, onPrev }: SignupStepProps) => {
  const { t } = useTranslation();
  const isFormValid = formData.gender && (formData.gender !== t('signup.step4.other') || formData.otherGender);

  const genderOptions = [
    { key: 'male', value: t('signup.step4.male') },
    { key: 'female', value: t('signup.step4.female') },
    { key: 'other', value: t('signup.step4.other') }
  ];

  return (
    <YStack space="$4" width="100%" maxWidth={340} alignItems="center">
      <Text fontSize="$6" fontWeight="bold" textAlign="center" marginBottom="$4">
        {t('signup.step4.title')}
      </Text>
      <Text textAlign="center" marginBottom="$4" color="$gray11">
        {t('signup.step4.description')}
      </Text>

      <Stack width="100%">
        <Select
          id="gender"
          value={formData.gender}
          onValueChange={(value) => onUpdate({ gender: value })}
        >
          <Select.Trigger>
            <Select.Value placeholder={t('signup.step4.selectGender')} />
          </Select.Trigger>

          <Adapt when="sm" platform="touch">
            <Select.Sheet modal dismissOnSnapToBottom snapPoints={[50]}>
              <Select.Sheet.Frame>
                <Select.Sheet.ScrollView>
                  <Adapt.Contents />
                </Select.Sheet.ScrollView>
              </Select.Sheet.Frame>
              <Select.Sheet.Overlay />
            </Select.Sheet>
          </Adapt>

          <Select.Content>
            <Select.ScrollUpButton />
            <Select.Viewport>
              <Select.Group>
                {genderOptions.map((option, index) => (
                  <Select.Item key={option.key} value={option.value} index={index}>
                    <Select.ItemText>{option.value}</Select.ItemText>
                    <Select.ItemIndicator>
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton />
          </Select.Content>
        </Select>
      </Stack>

      {formData.gender === t('signup.step4.other') && (
        <Input
          placeholder={t('signup.step4.enterOtherGender')}
          value={formData.otherGender}
          onChangeText={(value) => onUpdate({ otherGender: value })}
          width="100%"
        />
      )}

      <XStack space="$4" width="100%" marginTop="$4">
        <Button
          onPress={onPrev}
          backgroundColor="$gray2"
          color="$gray12"
          size="$4"
          flex={1}
        >
          {t('signup.step4.previous')}
        </Button>
        <Button
          onPress={onNext}
          backgroundColor="rgb(255,191,84)"
          color="$gray12"
          size="$4"
          flex={1}
          opacity={isFormValid ? 1 : 0.5}
          disabled={!isFormValid}
        >
          {t('signup.step4.next')}
        </Button>
      </XStack>
    </YStack>
  );
}; 