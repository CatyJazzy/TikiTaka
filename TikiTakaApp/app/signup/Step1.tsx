import { YStack, Text, Button, Input, XStack, Stack } from 'tamagui';
import { Image, ScrollView, Keyboard, KeyboardAvoidingView, Platform, TextInput  } from 'react-native';
import { SignupStepProps } from './types';
import { useState, useRef, useCallback } from 'react';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
console.log(API_URL);

const sendVerificationEmail = async (email: string) => {
  const response = await fetch(`${API_URL}/auth/send-verification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '인증 코드 전송에 실패했습니다.');
  }

  return response.json();
};

const verifyEmailCode = async (email: string, code: string) => {
  const response = await fetch(`${API_URL}/auth/verify-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, code }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '인증 코드가 올바르지 않습니다.');
  }

  return response.json();
};

export const Step1 = ({ formData, onUpdate, onNext, onPrev }: SignupStepProps) => {
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const verificationInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const isFormValid = formData.isEmailVerified && formData.password && formData.password.length >= 1;

  const handleSendVerificationCode = async () => {
    if (!formData.email) {
      alert('이메일을 입력해주세요.');
      return;
    }
    
    setIsSendingCode(true);
    try {
      await sendVerificationEmail(formData.email);
      alert('인증 코드가 이메일로 전송되었습니다.');
    } catch (error) {
      alert(error instanceof Error ? error.message : '인증 코드 전송에 실패했습니다.');
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!formData.verificationCode) {
      alert('인증 코드를 입력해주세요.');
      return;
    }

    setIsVerifying(true);
    try {
      await verifyEmailCode(formData.email, formData.verificationCode);
      onUpdate({ isEmailVerified: true });
      alert('이메일 인증이 완료되었습니다.');
    } catch (error) {
      alert(error instanceof Error ? error.message : '인증 코드가 올바르지 않습니다.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerificationCodeChange = (value: string) => {
    onUpdate({ verificationCode: value });
    if (value.length === 6) {
      verificationInputRef.current?.blur();
      Keyboard.dismiss();
    }
  };

  const scrollToInput = useCallback((ref: React.RefObject<TextInput>) => {
    if (ref.current) {
      ref.current.measure((x, y, width, height, pageX, pageY) => {
        scrollViewRef.current?.scrollTo({
          y: pageY - 100,
          animated: true
        });
      });
    }
  }, []);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <YStack space="$4" width="100%" maxWidth={480} alignItems="center" paddingVertical="$4">
          <Image
            source={require('../../assets/tiger.png')}
            style={{ width: 120, height: 120, marginBottom: 8 }}
            resizeMode="contain"
          />
          <Text fontSize="$8" fontWeight="bold" textAlign="center" marginBottom="$4">
            Tiki-Taka
          </Text>

          <YStack space="$4" width="100%">
            <YStack space="$2">
              <Text fontSize="$5" fontWeight="bold">
                이메일
              </Text>
              <XStack space="$2" width="100%">
                <Input
                  ref={emailInputRef}
                  flex={5}
                  placeholder="이메일 주소"
                  value={formData.email}
                  onChangeText={(value: string) => onUpdate({ email: value })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => scrollToInput(emailInputRef)}
                />
                <Button
                  onPress={handleSendVerificationCode}
                  backgroundColor="rgb(255,191,84)"
                  color="$gray12"
                  size="$4"
                  disabled={isSendingCode || formData.isEmailVerified}
                  flex={1}
                  minWidth={60}
                >
                  {isSendingCode ? '전송 중...' : '인증하기'}
                </Button>
              </XStack>
            </YStack>

            {!formData.isEmailVerified && (
              <YStack space="$2">
                <Text fontSize="$5" fontWeight="bold">
                  인증번호
                </Text>
                <XStack space="$2" width="100%">
                  <Input
                    ref={verificationInputRef}
                    flex={3}
                    placeholder="인증번호 6자리"
                    value={formData.verificationCode}
                    onChangeText={handleVerificationCodeChange}
                    keyboardType="number-pad"
                    maxLength={6}
                    returnKeyType="done"
                    onFocus={() => scrollToInput(verificationInputRef)}
                    onSubmitEditing={() => {
                      verificationInputRef.current?.blur();
                      Keyboard.dismiss();
                    }}
                  />
                  <Button
                    onPress={handleVerifyCode}
                    backgroundColor="rgb(255,191,84)"
                    color="$gray12"
                    size="$4"
                    disabled={isVerifying}
                    flex={1}
                    minWidth={70}
                  >
                    {isVerifying ? '확인 중...' : '확인'}
                  </Button>
                </XStack>
              </YStack>
            )}

            <YStack space="$2">
              <Text fontSize="$5" fontWeight="bold">
                비밀번호
              </Text>
              <Input
                ref={passwordInputRef}
                placeholder="비밀번호"
                value={formData.password}
                onChangeText={(value: string) => onUpdate({ password: value })}
                secureTextEntry
                onFocus={() => scrollToInput(passwordInputRef)}
              />
            </YStack>
          </YStack>

          <Button
            onPress={onNext}
            backgroundColor="rgb(255,191,84)"
            color="$gray12"
            size="$5"
            width="100%"
            disabled={!isFormValid}
            opacity={isFormValid ? 1 : 0.5}
          >
            다음
          </Button>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}; 