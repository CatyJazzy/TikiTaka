import { YStack, Text, Input, Button, XStack, Stack } from 'tamagui';
import { Adapt } from '@tamagui/adapt';
import { Select } from '@tamagui/select';
import { Check } from '@tamagui/lucide-icons';
import { SignupStepProps } from './types';
import { useRef } from 'react';
import { TextInput } from 'react-native';

export const Step3 = ({ formData, onUpdate, onNext, onPrev }: SignupStepProps) => {
  const nameInputRef = useRef<TextInput>(null);

  const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - 30 + i).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  return (
    <YStack space="$4" width="100%" maxWidth={340} alignItems="center">
      <Text fontSize="$6" fontWeight="bold" textAlign="center" marginBottom="$4">
        기본 정보 입력
      </Text>
      <Text textAlign="center" marginBottom="$4" color="$gray11">
        이름과 생년월일을 기입해 주세요.
      </Text>

      <Input
        ref={nameInputRef}
        placeholder="이름"
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
              <Select.Value placeholder="년도" />
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
                      <Select.ItemText>{year}년</Select.ItemText>
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
              <Select.Value placeholder="월" />
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
                      <Select.ItemText>{month}월</Select.ItemText>
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
              <Select.Value placeholder="일" />
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
                      <Select.ItemText>{day}일</Select.ItemText>
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