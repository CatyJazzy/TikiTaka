import { useState, useEffect } from 'react';
import { Stack, Text, XStack, YStack, Button, Card, Image, Spinner } from 'tamagui';
import { RefreshCw, Settings, UserPlus } from '@tamagui/lucide-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { API_URL } from '../../constants';
import { useTranslation } from 'react-i18next';

interface User {
  id: string;
  name: string;
  profileImage: string;
  age: number;
  gender: string;
  primaryLanguage: string;
  targetLanguage: string;
  activities: string[];
  matchScore: number;
}

export default function MatchingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { token, hasSetPreferences, setHasSetPreferences } = useAuth();
  const [matchedUsers, setMatchedUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { t } = useTranslation();

  // 언어 번역 헬퍼 함수
  const translateLanguage = (language: string) => {
    const languageKey = language.toLowerCase().replace(/\s+/g, '');
    // 언어 매핑
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
    const activityKey = activity.replace(/\s+/g, '').toLowerCase();
    // 활동 매핑
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

  const fetchMatches = async () => {
    if (!token) return;
    
    try {
      const response = await fetch(`${API_URL}/matching`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setMatchedUsers(data);
      }
    } catch (error) {
      console.error('매칭 결과 조회 중 오류:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const checkPreferences = async () => {
      if (!token) return;
      
      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const userData = await response.json();
          const hasPreferences = userData.genderPreference != null && 
                               userData.priority != null && 
                               userData.genderPreference !== '' && 
                               userData.priority !== '';
          setHasSetPreferences(hasPreferences);
          
          if (hasPreferences) {
            fetchMatches();
          }
        }
      } catch (error) {
        console.error('매칭 우선순위 설정 확인 중 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkPreferences();
  }, [token]);

  // 라우터 파라미터 변경 감지
  useEffect(() => {
    if (params.refresh === 'true') {
      fetchMatches();
      // 파라미터 제거 대신 router.replace 사용
      router.replace('/(tabs)/matching');
    }
  }, [params]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchMatches();
  };

  const handlePreferencesPress = () => {
    router.push('/matching-preferences');
  };

  const handleBuddyRequest = async (targetUserId: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/buddy-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ targetUserId }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || t('matching.requestFailed'));
      } else {
        alert(t('matching.requestSent'));
      }
    } catch (error) {
      alert(t('matching.requestFailed'));
    }
  };

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" color="$blue10" />
      </YStack>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Stack flex={1} padding="$4" space="$4">
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontSize="$8" fontWeight="bold">{t('matching.title')}</Text>
              <XStack space="$2">
                <Button
                  icon={Settings}
                  circular
                  onPress={handlePreferencesPress}
                  theme="active"
                />
                <Button
                  icon={RefreshCw}
                  circular
                  onPress={handleRefresh}
                  theme="active"
                  disabled={isRefreshing}
                />
              </XStack>
            </XStack>

            {!hasSetPreferences && (
              <YStack
                backgroundColor="$blue5"
                padding="$3"
                borderRadius="$4"
                marginBottom="$2"
              >
                <Text color="$blue10" textAlign="center">
                  {t('matching.preferencesRequired')}
                </Text>
              </YStack>
            )}

            {/* 매칭 결과 */}
            <YStack space="$4">
              {matchedUsers.map((user) => (
                <Card key={user.id} elevate size="$4" bordered>
                  <Card.Header padded>
                    <Image
                      source={{ uri: user.profileImage || 'https://via.placeholder.com/300x200' }}
                      width={300}
                      height={200}
                      borderRadius="$4"
                    />
                  </Card.Header>
                  <Card.Footer padded>
                    <YStack space="$2" width="100%">
                      <XStack justifyContent="space-between" alignItems="center">
                        <Text fontSize="$6" fontWeight="bold">{user.name}</Text>
                        <Text fontSize="$4" color="$gray11">{user.age}{t('matching.ageUnit')}</Text>
                      </XStack>
                      
                      <YStack space="$1">
                        <Text fontSize="$4" color="$gray11">
                          {t('matching.nativeLanguage')}: {translateLanguage(user.primaryLanguage)}
                        </Text>
                        <Text fontSize="$4" color="$gray11">
                          {t('matching.learningLanguage')}: {translateLanguage(user.targetLanguage)}
                        </Text>
                      </YStack>

                      <XStack flexWrap="wrap" space="$2">
                        {user.activities.map((activity, index) => (
                          <Text
                            key={index}
                            backgroundColor="$gray5"
                            paddingHorizontal="$2"
                            paddingVertical="$1"
                            borderRadius="$2"
                            fontSize="$3"
                          >
                            {translateActivity(activity)}
                          </Text>
                        ))}
                      </XStack>

                      <XStack justifyContent="space-between" alignItems="center">
                        <Text fontSize="$4" color="$blue10">
                          {t('matching.matchScore')}: {user.matchScore}%
                        </Text>
                        <Button
                          backgroundColor="rgb(255,191,84)"
                          color="$gray12"
                          size="$4"
                          onPress={() => handleBuddyRequest(user.id)}
                        >
                          {t('matching.sendRequest')}
                        </Button>
                      </XStack>
                    </YStack>
                  </Card.Footer>
                </Card>
              ))}

              {hasSetPreferences && matchedUsers.length === 0 && (
                <YStack
                  backgroundColor="$gray5"
                  padding="$4"
                  borderRadius="$4"
                  alignItems="center"
                >
                  <Text color="$gray11" textAlign="center">
                    {t('matching.noMatches')}
                  </Text>
                </YStack>
              )}
            </YStack>
          </Stack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 