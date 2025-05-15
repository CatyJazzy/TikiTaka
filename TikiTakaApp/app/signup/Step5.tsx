import { YStack, Text, Button, XStack, Stack } from 'tamagui';
import { Select } from '@tamagui/select';
import { Checkbox } from '@tamagui/checkbox';
import { Check } from '@tamagui/lucide-icons';
import { SignupStepProps } from './types';
import { Adapt } from '@tamagui/adapt';

const LANGUAGES = [
  '한국어',
  '영어',
  '일본어',
  '중국어',
  '프랑스어',
  '독일어',
  '스페인어',
  '러시아어',
  '베트남어',
  '태국어'
];

export const Step5 = ({ formData, onUpdate, onNext, onPrev }: SignupStepProps) => {
  const isFormValid = formData.primaryLanguage && formData.targetLanguage;

  return (
    <YStack space="$4" width="100%" maxWidth={340} alignItems="center">
      <Text fontSize="$6" fontWeight="bold" textAlign="center" marginBottom="$4">
        언어 선택
      </Text>

      <YStack space="$6" width="100%">
        <YStack space="$2">
          <Text fontSize="$5" fontWeight="bold">
            주로 사용하는 언어
          </Text>
          <Text color="$gray11" fontSize="$3">
            평소에 주로 사용하는 언어를 선택해 주세요.
          </Text>
          <Stack width="100%">
            <Select
              id="primaryLanguage"
              value={formData.primaryLanguage}
              onValueChange={(value) => onUpdate({ primaryLanguage: value })}
            >
              <Select.Trigger>
                <Select.Value placeholder="주로 사용하는 언어 선택" />
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
                    {LANGUAGES.map((language, index) => (
                      <Select.Item key={language} value={language} index={index}>
                        <Select.ItemText>{language}</Select.ItemText>
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
        </YStack>

        <YStack space="$2">
          <Text fontSize="$5" fontWeight="bold">
            교류하고 싶은 언어
          </Text>
          <Text color="$gray11" fontSize="$3">
            친구와 교류하고 싶은 언어를 선택해 주세요.
          </Text>
          <Stack width="100%">
            <Select
              id="targetLanguage"
              value={formData.targetLanguage}
              onValueChange={(value) => onUpdate({ targetLanguage: value })}
            >
              <Select.Trigger>
                <Select.Value placeholder="교류하고 싶은 언어 선택" />
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
                    {LANGUAGES.map((language, index) => (
                      <Select.Item key={language} value={language} index={index}>
                        <Select.ItemText>{language}</Select.ItemText>
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
        </YStack>

        <YStack space="$2">
          <Text fontSize="$5" fontWeight="bold">
            영어 사용 가능 여부
          </Text>
          <XStack space="$2" alignItems="center">
            <Checkbox
              id="english"
              checked={formData.canSpeakEnglish}
              onCheckedChange={(checked: boolean) => onUpdate({ canSpeakEnglish: checked })}
              size="$5"
              padding="$2"
            >
              <Checkbox.Indicator>
                <Check size={24} />
              </Checkbox.Indicator>
            </Checkbox>
            <Text fontSize="$4">가능해요</Text>
          </XStack>
        </YStack>
      </YStack>

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