import { YStack, Text, Button } from 'tamagui';
import { Image } from 'react-native';
import { SignupStepProps } from './types';

export const Step1 = ({ onNext }: SignupStepProps) => {
  return (
    <YStack space="$4" width="100%" maxWidth={340} alignItems="center">
      <Image
        source={require('../../assets/tiger.png')}
        style={{ width: 120, height: 120, marginBottom: 8 }}
        resizeMode="contain"
      />
      <Text fontSize="$8" fontWeight="bold" textAlign="center" marginBottom="$4">
        Tiki-Taka
      </Text>
      <Button
        onPress={onNext}
        backgroundColor="rgb(255,191,84)"
        color="$gray12"
        size="$5"
        width="100%"
      >
        시작하기
      </Button>
    </YStack>
  );
}; 