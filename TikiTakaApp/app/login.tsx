import { Stack, Text, Input, Button, YStack, XStack, Image } from 'tamagui';
import { useState } from 'react';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: 로그인 로직 구현
    console.log('로그인 시도:', email, password);
  };

  return (
    <Stack 
      flex={1} 
      alignItems="center" 
      justifyContent="center" 
      padding="$4"
      backgroundColor="rgba(255, 255, 240, 0.3)"
    >
      <YStack space="$4" width="100%" maxWidth={340} alignItems="center">
        <Image
          source={require('../assets/tiger.png')}
          width={60}
          height={60}
          resizeMode="contain"
          marginBottom={8}
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
        >
          로그인
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
  );
} 