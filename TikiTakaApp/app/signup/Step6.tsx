import { YStack, Text, Button, XStack, Stack, Input } from 'tamagui';
import { Checkbox } from '@tamagui/checkbox';
import { Check } from '@tamagui/lucide-icons';
import { SignupStepProps } from './types';
import { ScrollView } from 'react-native';

const ACTIVITIES = [
  '국내여행',
  '쇼핑',
  '명소',
  '한강',
  '시장',
  '편의점 털기',
  '카페',
  '노래방',
  '놀이공원(롯데월드, 에버랜드)',
  '한옥마을',
  '유행하는 것',
  '대화',
  '공부',
  '교내 투어',
  '맛집 투어',
  '음주',
  '기타'
];

export const Step6 = ({ formData, onUpdate, onNext, onPrev }: SignupStepProps) => {
  const handleActivityChange = (activity: string, checked: boolean) => {
    const currentActivities = formData.activities || [];
    let newActivities: string[];

    if (checked) {
      newActivities = [...currentActivities, activity];
    } else {
      newActivities = currentActivities.filter(a => a !== activity);
    }

    onUpdate({ activities: newActivities });
  };

  const isFormValid = formData.activities && formData.activities.length > 0 && 
    (!formData.activities.includes('기타') || formData.otherActivity);

  return (
    <YStack space="$4" width="100%" maxWidth={340} alignItems="center">
      <Text fontSize="$6" fontWeight="bold" textAlign="center" marginBottom="$4">
        활동 선택
      </Text>
      <Text textAlign="center" marginBottom="$4" color="$gray11">
        함께하고 싶은 활동을 선택해 주세요.(복수선택 가능)
      </Text>

      <ScrollView style={{ width: '100%', maxHeight: 400 }}>
        <YStack space="$3" width="100%">
          {ACTIVITIES.map((activity) => (
            <XStack key={activity} space="$2" alignItems="center" paddingVertical="$2">
              <Checkbox
                id={activity}
                checked={formData.activities?.includes(activity)}
                onCheckedChange={(checked: boolean) => handleActivityChange(activity, checked)}
                size="$6"
                padding="$3"
                borderRadius={100}
                backgroundColor={formData.activities?.includes(activity) ? "rgb(255,191,84)" : "$gray3"}
              >
                <Checkbox.Indicator>
                  <Check size={28} color="white" />
                </Checkbox.Indicator>
              </Checkbox>
              <Text fontSize="$5" fontWeight="500">{activity}</Text>
            </XStack>
          ))}
        </YStack>

        {formData.activities?.includes('기타') && (
          <Input
            placeholder="기타 활동을 입력해주세요"
            value={formData.otherActivity}
            onChangeText={(value: string) => onUpdate({ otherActivity: value })}
            width="100%"
            marginTop="$2"
          />
        )}
      </ScrollView>

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