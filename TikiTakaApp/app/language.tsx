import { Stack, Text, YStack, XStack, Button } from 'tamagui';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function LanguageScreen() {
  const [selected, setSelected] = useState('ko');
  const router = useRouter();
  const { t } = useTranslation();

  const handleSelect = (lang: string) => {
    setSelected(lang);
    router.replace('/login');
  };

  return (
    <Stack flex={1} alignItems="center" justifyContent="center" backgroundColor="rgba(255,255,240,0.3)">
      <YStack space="$4" alignItems="center" maxWidth={340} width="100%">
        <Text fontSize="$6" fontWeight="bold" marginBottom={8}>
          {t('language.title')}
        </Text>
        <Text fontSize="$4" color="$gray10" marginBottom={12}>
          {t('language.selectMessage')}
        </Text>
        <XStack space="$4">
          <Button
            backgroundColor={selected === 'ko' ? 'rgb(255,191,84)' : '$gray2'}
            color="$gray12"
            borderWidth={1}
            borderColor={selected === 'ko' ? '$yellow8' : '$gray6'}
            onPress={() => handleSelect('ko')}
          >
            한국어
          </Button>
          <Button
            backgroundColor={selected === 'en' ? 'rgb(255,191,84)' : '$gray2'}
            color="$gray12"
            borderWidth={1}
            borderColor={selected === 'en' ? '$yellow8' : '$gray6'}
            onPress={() => handleSelect('en')}
          >
            English
          </Button>
        </XStack>
      </YStack>
    </Stack>
  );
} 