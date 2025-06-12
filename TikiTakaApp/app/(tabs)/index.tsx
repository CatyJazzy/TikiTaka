import { useState, useEffect, useCallback } from 'react';
import { Stack, Text, XStack, YStack, Card, Spinner, Button, Image, Sheet } from 'tamagui';
import { useRouter, useFocusEffect } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { API_URL } from '../../constants';
import { Trophy, Users, Clock, Target, Check, X } from '@tamagui/lucide-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

interface MatchingStats {
  acceptedMatches: number;
  pendingRequests: number;
  sentPendingRequests: number;
}

interface FriendRequest {
  _id: string;
  sender: {
    _id: string;
    name: string;
    profileImage: string;
  };
  receiver: {
    _id: string;
    name: string;
    profileImage: string;
  };
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

interface Buddy {
  _id: string;
  name: string;
  profileImage: string;
  matchedAt: string;
}

interface UserProfile {
  _id: string;
  name: string;
  profileImage: string;
  age: number;
  bio: string;
  preferredActivities: string[];
  languages: string[];
  activities: string[];
  primaryLanguage: string;
  targetLanguage: string;
}

interface ProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
}

const ProfilePopup = ({ isOpen, onClose, profile }: ProfilePopupProps) => {
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
  
  if (!profile) return null;

  return (
    <Sheet
      modal
      open={isOpen}
      onOpenChange={onClose}
      snapPoints={[85]}
      dismissOnSnapToBottom
    >
      <Sheet.Overlay />
      <Sheet.Frame padding="$4" space="$4">
        <Sheet.Handle />
        <XStack justifyContent="space-between" alignItems="center">
          <Text fontSize="$6" fontWeight="bold" marginBottom="$2">{t('home.profileInfo')}</Text>
          <Button
            icon={X}
            circular
            size="$3"
            onPress={onClose}
          />
        </XStack>
        
        <XStack space="$4" alignItems="center">
          <Image
            source={{ uri: profile.profileImage || 'https://via.placeholder.com/100' }}
            width={100}
            height={100}
            borderRadius={50}
          />
          <YStack space="$2">
            <Text fontSize="$6" fontWeight="bold">{profile.name}</Text>
            <Text fontSize="$4" color="$gray11">{profile.age}{t('home.ageUnit')}</Text>
          </YStack>
        </XStack>

        <Card bordered margin="$2">
          <Card.Header padded>
            <Text fontSize="$5" fontWeight="bold">{t('home.selfIntroduction')}</Text>
          </Card.Header>
          <Card.Footer padded>
            <Text fontSize="$4">{profile.bio || t('home.noSelfIntroduction')}</Text>
          </Card.Footer>
        </Card>

        <Card bordered margin="$2">
          <Card.Header padded>
            <Text fontSize="$5" fontWeight="bold">{t('home.preferredActivities')}</Text>
          </Card.Header>
          <Card.Footer padded>
            <XStack flexWrap="wrap" space="$2">
              {profile.activities?.map((activity, index) => (
                <Text
                  key={index}
                  fontSize="$3"
                  backgroundColor="$blue5"
                  color="$blue11"
                  paddingHorizontal="$2"
                  paddingVertical="$1"
                  borderRadius="$2"
                >
                  {translateActivity(activity)}
                </Text>
              ))}
            </XStack>
          </Card.Footer>
        </Card>

        <Card bordered margin="$2">
          <Card.Header padded>
            <Text fontSize="$5" fontWeight="bold">{t('home.languageUsage')}</Text>
          </Card.Header>
          <Card.Footer padded>
            <YStack space="$2">
              <XStack space="$2" alignItems="center">
                <Text fontSize="$4" color="$gray11">{t('home.nativeLanguage')}:</Text>
                <Text
                  fontSize="$3"
                  backgroundColor="$green5"
                  color="$green11"
                  paddingHorizontal="$2"
                  paddingVertical="$1"
                  borderRadius="$2"
                >
                  {translateLanguage(profile.primaryLanguage)}
                </Text>
              </XStack>
              <XStack space="$2" alignItems="center">
                <Text fontSize="$4" color="$gray11">{t('home.targetLanguage')}:</Text>
                <Text
                  fontSize="$3"
                  backgroundColor="$blue5"
                  color="$blue11"
                  paddingHorizontal="$2"
                  paddingVertical="$1"
                  borderRadius="$2"
                >
                  {translateLanguage(profile.targetLanguage)}
                </Text>
              </XStack>
            </YStack>
          </Card.Footer>
        </Card>
      </Sheet.Frame>
    </Sheet>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const { token } = useAuth();
  const { t } = useTranslation();
  const [matchingStats, setMatchingStats] = useState<MatchingStats | null>(null);
  const [receivedRequests, setReceivedRequests] = useState<FriendRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<FriendRequest[]>([]);
  const [acceptedBuddies, setAcceptedBuddies] = useState<Buddy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);

  const fetchMatchingStats = useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/friend-requests/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setMatchingStats(data);
      }
    } catch (error) {
      console.error('매칭 통계 조회 오류:', error);
    }
  }, [token]);

  const fetchFriendRequests = useCallback(async () => {
    if (!token) return;

    try {
      // 받은 친구 신청 조회
      const receivedResponse = await fetch(`${API_URL}/friend-requests/received`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (receivedResponse.ok) {
        const receivedData = await receivedResponse.json();
        console.log('받은 친구 신청:', receivedData);
        setReceivedRequests(receivedData);
      }

      // 보낸 친구 신청 조회
      console.log('보낸 친구 신청 API 호출:', `${API_URL}/friend-requests/sent`);
      const sentResponse = await fetch(`${API_URL}/friend-requests/sent`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (sentResponse.ok) {
        const sentData = await sentResponse.json();
        console.log('보낸 친구 신청 응답:', sentData);
        setSentRequests(sentData);
      } else {
        console.error('보낸 친구 신청 조회 실패:', sentResponse.status);
        const errorText = await sentResponse.text();
        console.error('에러 내용:', errorText);
      }
    } catch (error) {
      console.error('친구 신청 목록 조회 오류:', error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const fetchAcceptedBuddies = useCallback(async () => {
    if (!token) return;

    try {
      console.log('성사된 버디 목록 API 호출 시작');
      console.log('API URL:', `${API_URL}/friend-requests/accepted`);
      console.log('토큰:', token);

      const response = await fetch(`${API_URL}/friend-requests/accepted`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('API 응답 상태:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('받은 성사된 버디 목록:', data);
        setAcceptedBuddies(data);
      } else {
        const errorText = await response.text();
        console.error('성사된 버디 목록 조회 실패:', response.status);
        console.error('에러 내용:', errorText);
      }
    } catch (error) {
      console.error('성사된 버디 목록 조회 오류:', error);
    }
  }, [token]);

  const handleRequestResponse = async (requestId: string, status: 'accepted' | 'rejected') => {
    try {
      const response = await fetch(`${API_URL}/friend-requests/${requestId}/respond`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        // 신청 목록 새로고침
        fetchFriendRequests();
        fetchMatchingStats();
      }
    } catch (error) {
      console.error('친구 신청 응답 오류:', error);
    }
  };

  const handleProfileClick = async (userId: string) => {
    if (!token) {
      console.error('토큰이 없습니다.');
      return;
    }

    try {
      console.log('프로필 조회 시작:', userId);
      console.log('API URL:', `${API_URL}/api/users/${userId}`);
      console.log('토큰:', token);
      
      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('API 응답 상태:', response.status);
      
      if (response.ok) {
        const profileData = await response.json();
        console.log('받은 프로필 데이터:', profileData);
        setSelectedProfile(profileData);
        setIsProfilePopupOpen(true);
      } else {
        const errorText = await response.text();
        console.error('프로필 조회 실패:', response.status);
        console.error('에러 내용:', errorText);
      }
    } catch (error) {
      console.error('프로필 정보 조회 오류:', error);
    }
  };

  // 화면이 포커스될 때마다 데이터 새로고침
  useFocusEffect(
    useCallback(() => {
      fetchMatchingStats();
      fetchFriendRequests();
      fetchAcceptedBuddies();
    }, [fetchMatchingStats, fetchFriendRequests, fetchAcceptedBuddies])
  );

  // 30초마다 자동 새로고침
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMatchingStats();
      fetchFriendRequests();
      fetchAcceptedBuddies();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchMatchingStats, fetchFriendRequests, fetchAcceptedBuddies]);

  // 로그인 상태 체크
  useEffect(() => {
    if (!token) {
      router.replace('/login');
    }
  }, [token, router]);

  if (!token) {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <Stack flex={1} justifyContent="center" alignItems="center">
          <Spinner size="large" color="$blue10" />
        </Stack>
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <Stack flex={1} justifyContent="center" alignItems="center">
          <Spinner size="large" color="$blue10" />
        </Stack>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Stack flex={1} padding="$4" space="$4">
          <Text fontSize="$8" fontWeight="bold">{t('common.home')}</Text>

          {/* 매칭 현황 */}
          <Card elevate size="$4" bordered>
            <Card.Header padded>
              <Text fontSize="$6" fontWeight="bold">{t('matching.stats.title')}</Text>
            </Card.Header>
            <Card.Footer padded>
              <XStack space="$4" flex={1}>
                <YStack flex={1} alignItems="center" space="$2">
                  <Users size={24} color="$blue10" />
                  <Text fontSize="$6" fontWeight="bold">{matchingStats?.acceptedMatches || 0}</Text>
                  <Text fontSize="$3" color="$gray11">{t('matching.stats.acceptedMatches')}</Text>
                </YStack>
                <YStack flex={1} alignItems="center" space="$2">
                  <Clock size={24} color="$orange10" />
                  <Text fontSize="$6" fontWeight="bold">{matchingStats?.pendingRequests || 0}</Text>
                  <Text fontSize="$3" color="$gray11">{t('matching.stats.receivedRequests')}</Text>
                </YStack>
                <YStack flex={1} alignItems="center" space="$2">
                  <Target size={24} color="$green10" />
                  <Text fontSize="$6" fontWeight="bold">{matchingStats?.sentPendingRequests || 0}</Text>
                  <Text fontSize="$3" color="$gray11">{t('matching.stats.sentRequests')}</Text>
                </YStack>
              </XStack>
            </Card.Footer>
          </Card>

          {/* 성사된 버디 목록 */}
          <Card elevate size="$4" bordered>
            <Card.Header padded>
              <Text fontSize="$6" fontWeight="bold">{t('matching.buddies.title')}</Text>
            </Card.Header>
            <Card.Footer padded>
              <YStack space="$4" width="100%">
                {acceptedBuddies.length === 0 ? (
                  <Text color="$gray11" textAlign="center">{t('matching.buddies.noBuddies')}</Text>
                ) : (
                  acceptedBuddies.map((buddy) => (
                    <Button
                      key={buddy._id}
                      unstyled
                      onPress={() => handleProfileClick(buddy._id)}
                    >
                      <Card bordered width="100%">
                        <Card.Header padded>
                          <XStack space="$3" alignItems="center">
                            <Image
                              source={{ uri: buddy.profileImage || 'https://via.placeholder.com/50' }}
                              width={50}
                              height={50}
                              borderRadius={25}
                            />
                            <YStack>
                              <Text fontSize="$5" fontWeight="bold">{buddy.name}</Text>
                              <Text fontSize="$3" color="$gray11">
                                {t('home.matchedDate')}: {new Date(buddy.matchedAt).toLocaleDateString()}
                              </Text>
                            </YStack>
                          </XStack>
                        </Card.Header>
                      </Card>
                    </Button>
                  ))
                )}
              </YStack>
            </Card.Footer>
          </Card>

          {/* 받은 친구 신청 */}
          <Card elevate size="$4" bordered>
            <Card.Header padded>
              <Text fontSize="$6" fontWeight="bold">{t('home.receivedFriendRequests')}</Text>
            </Card.Header>
            <Card.Footer padded>
              <YStack space="$4" width="100%">
                {receivedRequests.length === 0 ? (
                  <Text color="$gray11" textAlign="center">{t('home.noReceivedRequests')}</Text>
                ) : (
                  receivedRequests.map((request) => (
                    <Card key={request._id} bordered>
                      <Button
                        unstyled
                        onPress={() => handleProfileClick(request.sender._id)}
                      >
                        <Card.Header padded>
                          <XStack space="$3" alignItems="center">
                            <Image
                              source={{ uri: request.sender.profileImage || 'https://via.placeholder.com/50' }}
                              width={50}
                              height={50}
                              borderRadius={25}
                            />
                            <YStack>
                              <Text fontSize="$5" fontWeight="bold">{request.sender.name}</Text>
                              <Text fontSize="$3" color="$gray11">
                                {t('home.receivedDate')}: {new Date(request.createdAt).toLocaleDateString()}
                              </Text>
                            </YStack>
                          </XStack>
                        </Card.Header>
                      </Button>
                      <Card.Footer padded>
                        <XStack space="$2" flex={1}>
                          <Button
                            flex={1}
                            icon={Check}
                            theme="active"
                            backgroundColor="$green10"
                            onPress={() => handleRequestResponse(request._id, 'accepted')}
                          >
                            {t('home.accept')}
                          </Button>
                          <Button
                            flex={1}
                            icon={X}
                            theme="active"
                            backgroundColor="$red10"
                            onPress={() => handleRequestResponse(request._id, 'rejected')}
                          >
                            {t('home.reject')}
                          </Button>
                        </XStack>
                      </Card.Footer>
                    </Card>
                  ))
                )}
              </YStack>
            </Card.Footer>
          </Card>

          {/* 보낸 친구 신청 */}
          <Card elevate size="$4" bordered>
            <Card.Header padded>
              <Text fontSize="$6" fontWeight="bold">{t('home.sentFriendRequests')}</Text>
            </Card.Header>
            <Card.Footer padded>
              <YStack space="$4" width="100%">
                {sentRequests.length === 0 ? (
                  <Text color="$gray11" textAlign="center">{t('home.noSentRequests')}</Text>
                ) : (
                  sentRequests.map((request) => (
                    <Button
                      key={request._id}
                      unstyled
                      onPress={() => handleProfileClick(request.receiver._id)}
                    >
                      <Card bordered width="100%">
                        <Card.Header padded>
                          <XStack space="$3" alignItems="center">
                            <Image
                              source={{ uri: request.receiver.profileImage || 'https://via.placeholder.com/50' }}
                              width={50}
                              height={50}
                              borderRadius={25}
                            />
                            <YStack>
                              <Text fontSize="$5" fontWeight="bold">{request.receiver.name}</Text>
                            </YStack>
                          </XStack>
                        </Card.Header>
                        <Card.Footer padded>
                          <YStack space="$2" width="100%">
                            <XStack space="$2" alignItems="center">
                              <Text fontSize="$3" color="$gray11">{t('home.sentDate')}: </Text>
                              <Text fontSize="$3" color="$gray12">
                                {new Date(request.createdAt).toLocaleDateString()}
                              </Text>
                            </XStack>
                            <XStack space="$2" alignItems="center">
                              <Text fontSize="$3" color="$gray11">{t('home.status')}: </Text>
                              <Text 
                                fontSize="$3" 
                                color={
                                  request.status === 'pending' 
                                    ? '$orange10' 
                                    : request.status === 'accepted' 
                                      ? '$green10' 
                                      : '$red10'
                                }
                              >
                                {request.status === 'pending' 
                                  ? t('home.statusPending')
                                  : request.status === 'accepted' 
                                    ? t('home.statusAccepted')
                                    : t('home.statusRejected')}
                              </Text>
                            </XStack>
                          </YStack>
                        </Card.Footer>
                      </Card>
                    </Button>
                  ))
                )}
              </YStack>
            </Card.Footer>
          </Card>
        </Stack>
      </ScrollView>

      <ProfilePopup
        isOpen={isProfilePopupOpen}
        onClose={() => setIsProfilePopupOpen(false)}
        profile={selectedProfile}
      />
    </SafeAreaView>
  );
}
