import { Stack, Text, Input, Button, YStack, XStack, Image } from 'tamagui';
import { Image as RNImage, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { API_URL } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useTranslation();

  const handleLogin = async () => {
    if (!email || !password) {
      alert(t('auth.enterEmailPassword'));
      return;
    }

    setIsLoading(true);
    try {
      console.log('로그인 시도:', { email, API_URL });
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('서버 응답 상태:', response.status);
      console.log('서버 응답 헤더:', response.headers);

      const data = await response.json();
      console.log('서버 응답 데이터:', data);

      if (!response.ok) {
        console.error('로그인 실패:', {
          status: response.status,
          statusText: response.statusText,
          data: data
        });
        throw new Error(data.message || t('auth.loginFailed'));
      }

      if (!data.token) {
        console.error('토큰 누락:', data);
        throw new Error(t('auth.tokenMissing'));
      }

      console.log('로그인 성공:', { token: data.token.substring(0, 10) + '...' });
      await login(data.token);
      
      router.replace('/(tabs)');
    } catch (error) {
      console.error('로그인 에러 상세:', {
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
        API_URL,
        email
      });
      alert(error instanceof Error ? error.message : t('auth.loginFailed'));
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
              TikiTaka {t('auth.login')}
            </Text>
            
            <Input
              placeholder={t('auth.email')}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              width="100%"
            />
            
            <Input
              placeholder={t('auth.password')}
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
              {isLoading ? t('auth.loggingIn') : t('auth.login')}
            </Button>

            <Button
              onPress={async () => {
                await login('dev-token');
                router.replace('/(tabs)');
              }}
              backgroundColor="#4CAF50"
              color="white"
              size="$5"
              width="100%"
            >
              {t('auth.devLogin')}
            </Button>

            <XStack justifyContent="center" space="$2">
              <Text>{t('auth.noAccount')}</Text>
              <Text
                color="rgb(220, 20, 60)"
                onPress={() => {
                  router.push('/signup');
                }}
              >
                {t('auth.signup')}
              </Text>
            </XStack>
          </YStack>
        </Stack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
} 