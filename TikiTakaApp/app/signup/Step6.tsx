import { YStack, Text, Button, XStack, Stack, Input } from 'tamagui';
import { Checkbox } from '@tamagui/checkbox';
import { Check } from '@tamagui/lucide-icons';
import { SignupStepProps } from './types';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

const ACTIVITIES = [
  'domesticTravel',
  'shopping',
  'attractions',
  'hanRiver',
  'market',
  'convenienceStore',
  'cafe',
  'karaoke',
  'amusementPark',
  'hanokVillage',
  'trending',
  'conversation',
  'study',
  'campusTour',
  'foodTour',
  'drinking',
  'other'
];

export const Step6 = ({ formData, onUpdate, onNext, onPrev }: SignupStepProps) => {
  const { t } = useTranslation();

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
    (!formData.activities.includes('other') || formData.otherActivity);

  return (
    <YStack space="$4" width="100%" maxWidth={340} alignItems="center">
      <Text fontSize="$6" fontWeight="bold" textAlign="center" marginBottom="$4">
        {t('signup.step6.title')}
      </Text>
      <Text textAlign="center" marginBottom="$4" color="$gray11">
        {t('signup.step6.description')}
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
              <Text fontSize="$5" fontWeight="500">{t(`signup.step6.activities.${activity}`)}</Text>
            </XStack>
          ))}
        </YStack>

        {formData.activities?.includes('other') && (
          <Input
            placeholder={t('signup.step6.enterOtherActivity')}
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
          {t('signup.step6.previous')}
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
          {t('signup.step6.next')}
        </Button>
      </XStack>
    </YStack>
  );
}; 