import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Stack, Text, Button, Input, YStack, Select, Image } from 'tamagui';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [language, setLanguage] = useState('');
  const [activity, setActivity] = useState('');

  const handleLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '확인', onPress: () => {/* 로그아웃 로직 */} }
    ]);
  };

  return (
    <YStack flex={1} padding="$4" space="$4" paddingTop="$8" backgroundColor="rgba(255, 255, 240, 0.3)">
      <Stack space="$4">
        <Text fontSize="$6" fontWeight="bold" textAlign="center">프로필</Text>
        
        <Stack alignItems="center" space="$2">
          <Image
            source={require('../../assets/tiger2.png')}
            width={120}
            height={120}
            borderRadius={60}
          />
        </Stack>

        <YStack space="$2">
          <Text>이름</Text>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="이름을 입력하세요"
          />
        </YStack>

        <YStack space="$2">
          <Text>생년월일</Text>
          <Input
            value={birthDate}
            onChangeText={setBirthDate}
            placeholder="YYYY-MM-DD"
          />
        </YStack>

        <YStack space="$2">
          <Text>성별</Text>
          <Select value={gender} onValueChange={setGender}>
            <Select.Trigger>
              <Select.Value placeholder="성별을 선택하세요" />
            </Select.Trigger>
            <Select.Content>
              <Select.ScrollUpButton />
              <Select.Viewport>
                <Select.Group>
                  <Select.Item index={0} value="male">
                    <Select.ItemText>남성</Select.ItemText>
                  </Select.Item>
                  <Select.Item index={1} value="female">
                    <Select.ItemText>여성</Select.ItemText>
                  </Select.Item>
                  <Select.Item index={2} value="other">
                    <Select.ItemText>기타</Select.ItemText>
                  </Select.Item>
                </Select.Group>
              </Select.Viewport>
              <Select.ScrollDownButton />
            </Select.Content>
          </Select>
        </YStack>

        <YStack space="$2">
          <Text>사용 언어</Text>
          <Input
            value={language}
            onChangeText={setLanguage}
            placeholder="사용 가능한 언어를 입력하세요"
          />
        </YStack>

        <YStack space="$2">
          <Text>함께 하고 싶은 활동</Text>
          <Input
            value={activity}
            onChangeText={setActivity}
            placeholder="함께 하고 싶은 활동을 입력하세요"
          />
        </YStack>

        <Button 
          marginTop="$6" 
          theme="red" 
          onPress={handleLogout}
        >
          로그아웃
        </Button>
      </Stack>
    </YStack>
  );
}
