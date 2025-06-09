import { useState, useEffect } from 'react';
import { Stack, Text, XStack, YStack, Button, Card, Image, Spinner } from 'tamagui';
import { RefreshCw, Settings, UserPlus } from '@tamagui/lucide-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { API_URL } from '../../constants';

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

  const handleBuddyRequest = async (userId: string) => {
    try {
      console.log('친구 신청 API 호출:', `${API_URL}/friend-requests/send`);
      console.log('토큰:', token);
      console.log('요청 데이터:', { receiverId: userId });

      const response = await fetch(`${API_URL}/friend-requests/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ receiverId: userId })
      });

      console.log('응답 상태:', response.status);
      const responseText = await response.text();
      console.log('응답 내용:', responseText);

      if (response.ok) {
        alert('친구 신청이 전송되었습니다.');
      } else {
        try {
          const data = JSON.parse(responseText);
          alert(data.message || '친구 신청 전송에 실패했습니다.');
        } catch (e) {
          alert('친구 신청 전송에 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('친구 신청 오류:', error);
      alert('친구 신청 전송 중 오류가 발생했습니다.');
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
              <Text fontSize="$8" fontWeight="bold">Buddies</Text>
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
                  매칭 기준 우선순위를 상단의 설정 아이콘에서 저장해주세요.
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
                        <Text fontSize="$4" color="$gray11">{user.age}세</Text>
                      </XStack>
                      
                      <YStack space="$1">
                        <Text fontSize="$4" color="$gray11">
                          모국어: {user.primaryLanguage}
                        </Text>
                        <Text fontSize="$4" color="$gray11">
                          학습 언어: {user.targetLanguage}
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
                            {activity}
                          </Text>
                        ))}
                      </XStack>

                      <XStack justifyContent="space-between" alignItems="center">
                        <Text fontSize="$4" color="$blue10">
                          매칭 점수: {user.matchScore}%
                        </Text>
                        <Button
                          icon={UserPlus}
                          theme="active"
                          backgroundColor="rgb(255,191,84)"
                          onPress={() => handleBuddyRequest(user.id)}
                        >
                          버디 신청
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
                    아직 매칭된 버디가 없습니다.
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