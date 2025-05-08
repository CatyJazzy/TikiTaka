import { YStack, Text, Input, Button, XStack, Stack, Adapt, Sheet } from 'tamagui';
import { Select } from '@tamagui/select';
import { Check } from '@tamagui/lucide-icons';
import { SignupStepProps } from './types';
import { useRef, useEffect } from 'react';
import { Keyboard, TextInput } from 'react-native';

export const Step3 = ({ formData, onUpdate, onNext, onPrev }: SignupStepProps) => {
  const nameInputRef = useRef<TextInput>(null);
  const isSelectInteraction = useRef(false);

  const handleSelectOpen = () => {
    isSelectInteraction.current = true;
    Keyboard.dismiss();
  };

  const handleValueChange = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    isSelectInteraction.current = true;
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isSelectInteraction.current) {
        isSelectInteraction.current = false;
      }
    }, 100);
    
    return () => clearTimeout(timeoutId);
  });

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
        onFocus={() => {
          if (isSelectInteraction.current) {
            nameInputRef.current?.blur();
          }
        }}
      />

      <XStack space="$2" width="100%">
        <Stack flex={1}>
          <Select
            id="year"
            value={formData.birthYear}
            onValueChange={handleValueChange((value) => onUpdate({ birthYear: value }))}
            onOpenChange={(open) => {
              if (open) handleSelectOpen();
            }}
            disablePreventBodyScroll
          >
            <Select.Trigger>
              <Select.Value placeholder="년도" />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
              <Sheet modal dismissOnSnapToBottom snapPoints={[50]}>
                <Sheet.Frame>
                  <Sheet.ScrollView>
                    <Adapt.Contents />
                  </Sheet.ScrollView>
                </Sheet.Frame>
                <Sheet.Overlay />
              </Sheet>
            </Adapt>

            <Select.Content>
              <Select.ScrollUpButton />
              <Select.Viewport>
                <Select.Group>
                  {years.map((year, index) => (
                    <Select.Item key={year} value={year} index={index}>
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

        <Stack flex={1}>
          <Select
            id="month"
            value={formData.birthMonth}
            onValueChange={handleValueChange((value) => onUpdate({ birthMonth: value }))}
            onOpenChange={(open) => {
              if (open) handleSelectOpen();
            }}
            disablePreventBodyScroll
          >
            <Select.Trigger>
              <Select.Value placeholder="월" />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
              <Sheet modal dismissOnSnapToBottom snapPoints={[50]}>
                <Sheet.Frame>
                  <Sheet.ScrollView>
                    <Adapt.Contents />
                  </Sheet.ScrollView>
                </Sheet.Frame>
                <Sheet.Overlay />
              </Sheet>
            </Adapt>

            <Select.Content>
              <Select.ScrollUpButton />
              <Select.Viewport>
                <Select.Group>
                  {months.map((month, index) => (
                    <Select.Item key={month} value={month} index={index}>
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

        <Stack flex={1}>
          <Select
            id="day"
            value={formData.birthDay}
            onValueChange={handleValueChange((value) => onUpdate({ birthDay: value }))}
            onOpenChange={(open) => {
              if (open) handleSelectOpen();
            }}
            disablePreventBodyScroll
          >
            <Select.Trigger>
              <Select.Value placeholder="일" />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
              <Sheet modal dismissOnSnapToBottom snapPoints={[50]}>
                <Sheet.Frame>
                  <Sheet.ScrollView>
                    <Adapt.Contents />
                  </Sheet.ScrollView>
                </Sheet.Frame>
                <Sheet.Overlay />
              </Sheet>
            </Adapt>

            <Select.Content>
              <Select.ScrollUpButton />
              <Select.Viewport>
                <Select.Group>
                  {days.map((day, index) => (
                    <Select.Item key={day} value={day} index={index}>
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