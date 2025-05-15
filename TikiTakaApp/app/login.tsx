import { Stack, Text, Input, Button, YStack, XStack, Image } from 'tamagui';
import { Image as RNImage, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { API_URL } from '../constants';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '로그인에 실패했습니다.');
      }

      if (!data.token) {
        throw new Error('서버에서 토큰을 받지 못했습니다.');
      }

      console.log('로그인 응답:', data);
      await login(data.token);
      
      // 로그인 성공 후 홈 화면으로 이동
      router.replace('/(tabs)');
    } catch (error) {
      console.error('로그인 에러:', error);
      alert(error instanceof Error ? error.message : '로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Stack 
          flex={1} 
          alignItems="center" 
          justifyContent="center" 
          padding="$4"
          backgroundColor="rgba(255, 255, 240, 0.3)"
        >
          <YStack space="$4" width="100%" maxWidth={340} alignItems="center">
            <RNImage
              source={require('../assets/Tiger3.png')}
              style={{ width: 120, height: 120, marginBottom: 8 }}
              resizeMode="contain"
            />
            <Text fontSize="$6" fontWeight="bold" textAlign="center" marginBottom="$4">
              TikiTaka 로그인(Login)
            </Text>
            
            <Input
              placeholder="이메일"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              width="100%"
            />
            
            <Input
              placeholder="비밀번호"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              width="100%"
            />
            
            <Button
              onPress={handleLogin}
              backgroundColor="rgb(255,191,84)"
              color="$gray12"
              size="$5"
              width="100%"
              disabled={isLoading}
              opacity={isLoading ? 0.5 : 1}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>

            <XStack justifyContent="center" space="$2">
              <Text>계정이 없으신가요?</Text>
              <Text
                color="rgb(220, 20, 60)"
                onPress={() => {
                  // TODO: 회원가입 화면으로 이동
                  console.log('회원가입 화면으로 이동');
                }}
              >
                회원가입
              </Text>
            </XStack>
            <Text textAlign="center" marginTop={12} marginBottom={4} color="$gray10">
              언어를 선택해주세요
            </Text>
            <XStack justifyContent="center" space="$4">
              <Button
                size="$3"
                backgroundColor="$yellow4"
                color="$gray12"
                borderWidth={1}
                borderColor="$yellow8"
                >
                한국어
              </Button>
              <Button
                size="$3"
                backgroundColor="$gray2"
                color="$gray12"
                borderWidth={1}
                borderColor="$gray6"
                >
                English
              </Button>
            </XStack>
          </YStack>
        </Stack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
} 