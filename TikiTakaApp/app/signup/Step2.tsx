import { YStack, Text, Button, XStack, Stack } from 'tamagui';
import { Image, ScrollView, KeyboardAvoidingView, Platform, Linking } from 'react-native';
import { SignupStepProps } from './types';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Step2 = ({ formData, onUpdate, onNext, onPrev }: SignupStepProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { t } = useTranslation();

  const handlePortalLink = () => {
    Linking.openURL('https://portal.korea.ac.kr');
  };

  const pickImage = async () => {
    try {
      setIsUploading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        onUpdate({ portalImage: result.assets[0].uri });
      }
    } catch (error) {
      alert(t('signup.step2.uploadFailed'));
    } finally {
      setIsUploading(false);
    }
  };

  const isFormValid = !!formData.portalImage;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <YStack space="$4" width="100%" maxWidth={480} alignItems="center" paddingVertical="$4">
          <Text fontSize="$6" fontWeight="bold" textAlign="center">
            {t('signup.step2.title')}
          </Text>
          <Text textAlign="center" marginBottom="$4" color="$gray11">
            {t('signup.step2.description')}
          </Text>
          
          <YStack space="$2" width="100%" marginBottom="$4">
            <Text color="$gray11" fontSize="$3">{t('signup.step2.instruction1')}</Text>
            <Text color="$gray11" fontSize="$3">{t('signup.step2.instruction2')}</Text>
            <Text color="$gray11" fontSize="$3">{t('signup.step2.instruction3')}</Text>
          </YStack>

          <Button
            onPress={handlePortalLink}
            backgroundColor="$gray2"
            color="$gray12"
            size="$4"
            width="100%"
            marginBottom="$2"
          >
            {t('signup.step2.portalLink')}
          </Button>

          <Stack width="100%" height={200} marginVertical="$4">
            {formData.portalImage ? (
              <Image
                source={{ uri: formData.portalImage }}
                style={{ width: '100%', height: '100%', borderRadius: 8 }}
                resizeMode="contain"
              />
            ) : (
              <Stack
                width="100%"
                height="100%"
                backgroundColor="$gray3"
                borderRadius={8}
                justifyContent="center"
                alignItems="center"
              >
                <Text color="$gray11">{t('signup.step2.noImage')}</Text>
              </Stack>
            )}
          </Stack>

          <Button
            onPress={pickImage}
            backgroundColor="$gray2"
            color="$gray12"
            size="$4"
            width="100%"
            disabled={isUploading}
          >
            {isUploading ? t('signup.step2.uploading') : (formData.portalImage ? t('signup.step2.changeImage') : t('signup.step2.selectImage'))}
          </Button>

          <XStack space="$4" width="100%" marginTop="$4">
            <Button
              onPress={onPrev}
              backgroundColor="$gray2"
              color="$gray12"
              size="$4"
              flex={1}
            >
              {t('signup.step2.previous')}
            </Button>
            <Button
              onPress={onNext}
              backgroundColor="rgb(255,191,84)"
              color="$gray12"
              size="$4"
              flex={1}
              disabled={!isFormValid}
              opacity={isFormValid ? 1 : 0.5}
            >
              {t('signup.step2.next')}
            </Button>
          </XStack>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}; 