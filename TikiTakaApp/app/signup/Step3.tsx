import { YStack, Text, Input, Button, XStack, Stack } from 'tamagui';
import { Adapt } from '@tamagui/adapt';
import { Select } from '@tamagui/select';
import { Check } from '@tamagui/lucide-icons';
import { SignupStepProps } from './types';
import { useRef } from 'react';
import { TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';

export const Step3 = ({ formData, onUpdate, onNext, onPrev }: SignupStepProps) => {
  const nameInputRef = useRef<TextInput>(null);
  const { t } = useTranslation();

  const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - 30 + i).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  const isFormValid = formData.name && formData.birthYear && formData.birthMonth && formData.birthDay;

  return (
    <YStack space="$4" width="100%" maxWidth={340} alignItems="center">
      <Text fontSize="$6" fontWeight="bold" textAlign="center" marginBottom="$4">
        {t('signup.step3.title')}
      </Text>
      <Text textAlign="center" marginBottom="$4" color="$gray11">
        {t('signup.step3.description')}
      </Text>

      <Input
        ref={nameInputRef}
        placeholder={t('signup.step3.name')}
        value={formData.name}
        onChangeText={(value) => onUpdate({ name: value })}
        width="100%"
        marginBottom="$4"
      />

      <XStack space="$2" width="100%">
        {/* 년도 */}
        <Stack flex={1}>
          <Select
            value={formData.birthYear}
            onValueChange={(value) => onUpdate({ birthYear: value })}
          >
            <Select.Trigger>
              <Select.Value placeholder={t('signup.step3.year')} />
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
                  {years.map((year) => (
                    <Select.Item key={year} value={year}>
                      <Select.ItemText>{year}{t('signup.step3.yearUnit')}</Select.ItemText>
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
        {/* 월 */}
        <Stack flex={1}>
          <Select
            value={formData.birthMonth}
            onValueChange={(value) => onUpdate({ birthMonth: value })}
          >
            <Select.Trigger>
              <Select.Value placeholder={t('signup.step3.month')} />
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
                  {months.map((month) => (
                    <Select.Item key={month} value={month}>
                      <Select.ItemText>{month}{t('signup.step3.monthUnit')}</Select.ItemText>
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
        {/* 일 */}
        <Stack flex={1}>
          <Select
            value={formData.birthDay}
            onValueChange={(value) => onUpdate({ birthDay: value })}
          >
            <Select.Trigger>
              <Select.Value placeholder={t('signup.step3.day')} />
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
                  {days.map((day) => (
                    <Select.Item key={day} value={day}>
                      <Select.ItemText>{day}{t('signup.step3.dayUnit')}</Select.ItemText>
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
      </XStack>

      <XStack space="$4" width="100%" marginTop="$4">
        <Button
          onPress={onPrev}
          backgroundColor="$gray2"
          color="$gray12"
          size="$4"
          flex={1}
        >
          {t('signup.step3.previous')}
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
          {t('signup.step3.next')}
        </Button>
      </XStack>
    </YStack>
  );
}; 