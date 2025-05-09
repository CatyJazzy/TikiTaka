import { YStack, Text, Button, Input, XStack, Stack } from 'tamagui';
import { Select } from '@tamagui/select';
import { Check } from '@tamagui/lucide-icons';
import { SignupStepProps } from './types';
import { Adapt } from '@tamagui/adapt';

export const Step4 = ({ formData, onUpdate, onNext, onPrev }: SignupStepProps) => {
  const isFormValid = formData.gender && (formData.gender !== '그 외' || formData.otherGender);

  return (
    <YStack space="$4" width="100%" maxWidth={340} alignItems="center">
      <Text fontSize="$6" fontWeight="bold" textAlign="center" marginBottom="$4">
        성별 선택
      </Text>
      <Text textAlign="center" marginBottom="$4" color="$gray11">
        성별을 선택해 주세요.
      </Text>

      <Stack width="100%">
        <Select
          id="gender"
          value={formData.gender}
          onValueChange={(value) => onUpdate({ gender: value })}
        >
          <Select.Trigger>
            <Select.Value placeholder="성별 선택" />
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
                {['남자', '여자', '그 외'].map((option, index) => (
                  <Select.Item key={option} value={option} index={index}>
                    <Select.ItemText>{option}</Select.ItemText>
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

      {formData.gender === '그 외' && (
        <Input
          placeholder="성별을 입력해주세요"
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
          이전
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
          다음
        </Button>
      </XStack>
    </YStack>
  );
}; 