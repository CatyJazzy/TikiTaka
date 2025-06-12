import React, { useState, useEffect } from 'react';
import { Alert, ScrollView } from 'react-native';
import { Stack, Text, Button, Input, YStack, Select, Image, XStack } from 'tamagui';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';
import { API_URL } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

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
}

export default function ProfileScreen() {
  const { isAuthenticated, logout, token } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  // 언어 번역 헬퍼 함수
  const translateLanguage = (language: string) => {
    if (!language) return language;
    const languageKey = language.toLowerCase().replace(/\s+/g, '');
    const languageMap: { [key: string]: string } = {
      '한국어': 'korean',
      '영어': 'english',
      '중국어': 'chinese',
      '일본어': 'japanese',
      '프랑스어': 'french',
      '스페인어': 'spanish',
      '독일어': 'german',
      'korean': 'korean',
      'english': 'english',
      'chinese': 'chinese',
      'japanese': 'japanese',
      'french': 'french',
      'spanish': 'spanish',
      'german': 'german'
    };
    
    const key = languageMap[languageKey] || languageMap[language];
    return key ? t(`languages.${key}`) : language;
  };

  // 활동 번역 헬퍼 함수
  const translateActivity = (activity: string) => {
    if (!activity) return activity;
    const activityKey = activity.replace(/\s+/g, '').toLowerCase();
    const activityMap: { [key: string]: string } = {
      '국내여행': 'domesticTravel',
      '쇼핑': 'shopping',
      '명소': 'attractions',
      '한강': 'hanRiver',
      '시장': 'market',
      '편의점털기': 'convenienceStore',
      '편의점': 'convenienceStore',
      '카페': 'cafe',
      '노래방': 'karaoke',
      '놀이공원': 'amusementPark',
      '한옥마을': 'hanokVillage',
      '유행하는것': 'trending',
      '대화': 'conversation',
      '공부': 'study',
      '교내투어': 'campusTour',
      '맛집투어': 'foodTour',
      '음주': 'drinking',
      '기타': 'other',
      'domestictravel': 'domesticTravel',
      'shopping': 'shopping',
      'attractions': 'attractions',
      'hanriver': 'hanRiver',
      'market': 'market',
      'conveniencestore': 'convenienceStore',
      'cafe': 'cafe',
      'karaoke': 'karaoke',
      'amusementpark': 'amusementPark',
      'hanokvillage': 'hanokVillage',
      'trending': 'trending',
      'conversation': 'conversation',
      'study': 'study',
      'campustour': 'campusTour',
      'foodtour': 'foodTour',
      'drinking': 'drinking',
      'other': 'other'
    };
    
    const key = activityMap[activityKey] || activityMap[activity.toLowerCase()];
    return key ? t(`activities.${key}`) : activity;
  };

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
    Alert.alert(t('profile.logout'), t('profile.confirmLogout'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.yes'), onPress: () => logout() }
    ]);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <YStack flex={1} padding="$4" justifyContent="center" alignItems="center">
          <Text>{t('common.loading')}</Text>
        </YStack>
      </SafeAreaView>
    );
  }

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <YStack flex={1} padding="$4" space="$4" justifyContent="center" alignItems="center">
          <Text fontSize="$6" fontWeight="bold" textAlign="center">{t('profile.loginRequired')}</Text>
          <Text textAlign="center" marginBottom="$4">{t('profile.loginRequiredMessage')}</Text>
          <Button 
            theme="red" 
            onPress={() => router.push('/login')}
          >
            {t('profile.loginButton')}
          </Button>
        </YStack>
      </SafeAreaView>
    );
  }

  if (!userData) {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <YStack flex={1} padding="$4" justifyContent="center" alignItems="center">
          <Text>{t('profile.userDataError')}</Text>
          <Button 
            marginTop="$4"
            theme="red" 
            onPress={() => router.push('/login')}
          >
            {t('profile.reloginButton')}
          </Button>
        </YStack>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Stack flex={1} padding="$4" space="$4">
          <Text fontSize="$8" fontWeight="bold">{t('profile.title')}</Text>
          
          <Stack alignItems="center" space="$2">
            <Image
              source={require('../../assets/Tiger3.png')}
              width={120}
              height={120}
              borderRadius={60}
            />
          </Stack>

          <YStack space="$2">
            <Text>{t('profile.name')}</Text>
            <Input
              value={userData.name}
              disabled
              placeholder={t('profile.name')}
            />
          </YStack>

          <YStack space="$2">
            <Text>{t('profile.email')}</Text>
            <Input
              value={userData.email}
              disabled
              placeholder={t('profile.email')}
            />
          </YStack>

          <YStack space="$2">
            <Text>{t('profile.birthdate')}</Text>
            <Input
              value={`${userData.birthYear}${t('profile.yearUnit')} ${userData.birthMonth}${t('profile.monthUnit')} ${userData.birthDay}${t('profile.dayUnit')}`}
              disabled
              placeholder={t('profile.birthdate')}
            />
          </YStack>

          <YStack space="$2">
            <Text>{t('profile.gender')}</Text>
            <Input
              value={userData.gender === 'other' ? userData.otherGender : userData.gender}
              disabled
              placeholder={t('profile.gender')}
            />
          </YStack>

          <YStack space="$2">
            <Text>{t('profile.primaryLanguage')}</Text>
            <Input
              value={translateLanguage(userData.primaryLanguage)}
              disabled
              placeholder={t('profile.primaryLanguage')}
            />
          </YStack>

          <YStack space="$2">
            <Text>{t('profile.targetLanguage')}</Text>
            <Input
              value={translateLanguage(userData.targetLanguage)}
              disabled
              placeholder={t('profile.targetLanguage')}
            />
          </YStack>

          <YStack space="$2">
            <Text>{t('profile.englishAbility')}</Text>
            <Input
              value={userData.canSpeakEnglish ? t('profile.englishYes') : t('profile.englishNo')}
              disabled
              placeholder={t('profile.englishAbility')}
            />
          </YStack>

          <YStack space="$2">
            <Text>{t('profile.activities')}</Text>
            <Input
              value={userData.activities.map(translateActivity).join(', ')}
              disabled
              placeholder={t('profile.activities')}
            />
          </YStack>

          {userData.otherActivity && (
            <YStack space="$2">
              <Text>{t('profile.otherActivity')}</Text>
              <Input
                value={userData.otherActivity}
                disabled
                placeholder={t('profile.otherActivity')}
              />
            </YStack>
          )}

          <Button
            backgroundColor="$red9"
            color="white"
            onPress={handleLogout}
          >
            {t('profile.logout')}
          </Button>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
}
