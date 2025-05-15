import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Stack, Text, Button, Input, YStack, Select, Image, XStack } from 'tamagui';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../constants';

interface UserData {
  email: string;
  name: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  gender: string;
  otherGender?: string;
  primaryLanguage: string;
  targetLanguage: string;
  canSpeakEnglish: boolean;
  activities: string[];
  otherActivity?: string;
  profileImage?: string;
}

export default function ProfileScreen() {
  const { isAuthenticated, logout, token } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated || !token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('사용자 정보 조회 실패:', response.status);
        }
      } catch (error) {
        console.error('사용자 정보를 불러오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, token]);

  const handleLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { 
        text: '확인', 
        onPress: () => {
          logout();
          router.replace('/');
        }
      }
    ]);
  };

  if (isLoading) {
    return (
      <YStack flex={1} padding="$4" justifyContent="center" alignItems="center">
        <Text>로딩 중...</Text>
      </YStack>
    );
  }

  if (!isAuthenticated) {
    return (
      <YStack flex={1} padding="$4" space="$4" justifyContent="center" alignItems="center">
        <Text fontSize="$6" fontWeight="bold" textAlign="center">로그인이 필요합니다</Text>
        <Text textAlign="center" marginBottom="$4">프로필을 보시려면 로그인해주세요.</Text>
        <Button 
          theme="red" 
          onPress={() => router.push('/login')}
        >
          로그인하기
        </Button>
      </YStack>
    );
  }

  if (!userData) {
    return (
      <YStack flex={1} padding="$4" justifyContent="center" alignItems="center">
        <Text>사용자 정보를 불러올 수 없습니다.</Text>
        <Button 
          marginTop="$4"
          theme="red" 
          onPress={() => router.push('/login')}
        >
          다시 로그인하기
        </Button>
      </YStack>
    );
  }

  return (
    <YStack flex={1} padding="$4" space="$4" paddingTop="$8" backgroundColor="rgba(255, 255, 240, 0.3)">
      <Stack space="$4">
        <Text fontSize="$6" fontWeight="bold" textAlign="center">프로필</Text>
        
        <Stack alignItems="center" space="$2">
          <Image
            source={userData.profileImage ? { uri: userData.profileImage } : require('../../assets/tiger2.png')}
            width={120}
            height={120}
            borderRadius={60}
          />
        </Stack>

        <YStack space="$2">
          <Text>이름</Text>
          <Input
            value={userData.name}
            disabled
            placeholder="이름"
          />
        </YStack>

        <YStack space="$2">
          <Text>이메일</Text>
          <Input
            value={userData.email}
            disabled
            placeholder="이메일"
          />
        </YStack>

        <YStack space="$2">
          <Text>생년월일</Text>
          <Input
            value={`${userData.birthYear}년 ${userData.birthMonth}월 ${userData.birthDay}일`}
            disabled
            placeholder="생년월일"
          />
        </YStack>

        <YStack space="$2">
          <Text>성별</Text>
          <Input
            value={userData.gender === 'other' ? userData.otherGender : userData.gender}
            disabled
            placeholder="성별"
          />
        </YStack>

        <YStack space="$2">
          <Text>주 사용 언어</Text>
          <Input
            value={userData.primaryLanguage}
            disabled
            placeholder="주 사용 언어"
          />
        </YStack>

        <YStack space="$2">
          <Text>목표 언어</Text>
          <Input
            value={userData.targetLanguage}
            disabled
            placeholder="목표 언어"
          />
        </YStack>

        <YStack space="$2">
          <Text>영어 가능 여부</Text>
          <Input
            value={userData.canSpeakEnglish ? '가능' : '불가능'}
            disabled
            placeholder="영어 가능 여부"
          />
        </YStack>

        <YStack space="$2">
          <Text>관심 활동</Text>
          <Input
            value={userData.activities.join(', ')}
            disabled
            placeholder="관심 활동"
          />
        </YStack>

        {userData.otherActivity && (
          <YStack space="$2">
            <Text>기타 활동</Text>
            <Input
              value={userData.otherActivity}
              disabled
              placeholder="기타 활동"
            />
          </YStack>
        )}

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
