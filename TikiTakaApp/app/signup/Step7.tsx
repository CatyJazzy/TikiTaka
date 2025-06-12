import { YStack, Text, Button, XStack, Stack } from 'tamagui';
import { Image } from 'react-native';
import { SignupStepProps } from './types';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';

export const Step7 = ({ formData, onUpdate, onNext, onPrev, isSubmitting }: SignupStepProps) => {
  const { t } = useTranslation();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      onUpdate({ profileImage: result.assets[0].uri });
    }
  };

  return (
    <YStack space="$4" width="100%" maxWidth={340} alignItems="center" padding="$4">
      <Text fontSize="$6" fontWeight="bold" textAlign="center" marginBottom="$4">
        {t('signup.step7.title')}
      </Text>
      <Text textAlign="center" marginBottom="$4" color="$gray11">
        {t('signup.step7.description')}
      </Text>

      <Stack width={200} height={200} marginVertical="$4">
        {formData.profileImage ? (
          <Image
            source={{ uri: formData.profileImage }}
            style={{ width: '100%', height: '100%', borderRadius: 100 }}
          />
        ) : (
          <Stack
            width="100%"
            height="100%"
            backgroundColor="$gray3"
            borderRadius={100}
            justifyContent="center"
            alignItems="center"
          >
            <Text color="$gray11">{t('signup.step7.noImage')}</Text>
          </Stack>
        )}
      </Stack>

      <Button
        onPress={pickImage}
        backgroundColor="$gray2"
        color="$gray12"
        size="$4"
        width="100%"
      >
        {formData.profileImage ? t('signup.step7.changeImage') : t('signup.step7.selectImage')}
      </Button>

      <XStack space="$4" width="100%" marginTop="$4">
        <Button
          onPress={onPrev}
          backgroundColor="$gray2"
          color="$gray12"
          size="$4"
          flex={1}
        >
          {t('signup.step7.previous')}
        </Button>
        <Button
          onPress={onNext}
          backgroundColor="rgb(255,191,84)"
          color="$gray12"
          size="$4"
          flex={1}
          disabled={isSubmitting}
          opacity={isSubmitting ? 0.5 : 1}
        >
          {isSubmitting ? t('signup.step7.processing') : t('signup.step7.complete')}
        </Button>
      </XStack>
    </YStack>
  );
}; 