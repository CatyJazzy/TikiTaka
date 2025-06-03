import { useState, useEffect } from 'react';
import { Stack, Text, Button, Card, Select, Adapt, Sheet } from 'tamagui';
import { useRouter } from 'expo-router';
import { ChevronDown } from '@tamagui/lucide-icons';
import { KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { API_URL } from '../constants';

export default function MatchingPreferencesScreen() {
  const router = useRouter();
  const { token, setHasSetPreferences } = useAuth();
  const [genderPreference, setGenderPreference] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // 사용자의 현재 매칭 우선순위 설정을 불러옵니다
  const loadPreferences = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('사용자 정보를 불러오는데 실패했습니다.');
      }

      const userData = await response.json();
      setGenderPreference(userData.genderPreference || '');
      setPriority(userData.priority || '');
    } catch (error) {
      Alert.alert('알림', '설정을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPreferences();
  }, []);

  const handleSave = async () => {
    if (!genderPreference || !priority) {
      Alert.alert('알림', '모든 설정을 완료해주세요.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/me/preferences`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ genderPreference, priority }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('알림', data.message || '저장에 실패했습니다.');
        return;
      }

      console.log('설정 저장 응답:', data);
      setHasSetPreferences(true);

      Alert.alert('알림', '설정이 저장되었습니다.', [
        { text: '확인', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('설정 저장 중 오류:', error);
      Alert.alert('알림', '저장 중 오류가 발생했습니다.');
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <Stack flex={1} padding="$4" justifyContent="center" alignItems="center">
          <Text>로딩 중...</Text>
        </Stack>
      </SafeAreaView>
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
            <Text fontSize="$6" fontWeight="bold">매칭 우선순위 설정</Text>

            <Card elevate size="$4" bordered>
              <Card.Header padded>
                <Text fontSize="$5" fontWeight="bold">성별 선호</Text>
              </Card.Header>
              <Card.Footer padded>
                <Select
                  id="gender"
                  value={genderPreference}
                  onValueChange={setGenderPreference}
                >
                  <Select.Trigger width="100%" iconAfter={ChevronDown}>
                    <Select.Value placeholder="성별 선호도를 선택하세요" />
                  </Select.Trigger>

                  <Adapt when="sm" platform="touch">
                    <Sheet
                      modal
                      dismissOnSnapToBottom
                      snapPoints={[50]}
                      position={0}
                      zIndex={100000}
                    >
                      <Sheet.Frame>
                        <Sheet.ScrollView>
                          <Adapt.Contents />
                        </Sheet.ScrollView>
                      </Sheet.Frame>
                      <Sheet.Overlay />
                    </Sheet>
                  </Adapt>

                  <Select.Content>
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                      <Select.Group>
                        <Select.Label>성별 선호도</Select.Label>
                        <Select.Item index={0} value="same">
                          <Select.ItemText>동성만 선호</Select.ItemText>
                        </Select.Item>
                        <Select.Item index={1} value="any">
                          <Select.ItemText>성별 상관없음</Select.ItemText>
                        </Select.Item>
                      </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                  </Select.Content>
                </Select>
              </Card.Footer>
            </Card>

            <Card elevate size="$4" bordered>
              <Card.Header padded>
                <Text fontSize="$5" fontWeight="bold">매칭 기준 우선순위</Text>
              </Card.Header>
              <Card.Footer padded>
                <Select
                  id="priority"
                  value={priority}
                  onValueChange={setPriority}
                >
                  <Select.Trigger width="100%" iconAfter={ChevronDown}>
                    <Select.Value placeholder="우선순위를 선택하세요" />
                  </Select.Trigger>

                  <Adapt when="sm" platform="touch">
                    <Sheet
                      modal
                      dismissOnSnapToBottom
                      snapPoints={[50]}
                      position={0}
                      zIndex={100000}
                    >
                      <Sheet.Frame>
                        <Sheet.ScrollView>
                          <Adapt.Contents />
                        </Sheet.ScrollView>
                      </Sheet.Frame>
                      <Sheet.Overlay />
                    </Sheet>
                  </Adapt>

                  <Select.Content>
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                      <Select.Group>
                        <Select.Label>우선순위</Select.Label>
                        <Select.Item index={0} value="language">
                          <Select.ItemText>교류 언어 우선</Select.ItemText>
                        </Select.Item>
                        <Select.Item index={1} value="activity">
                          <Select.ItemText>선호 활동 우선</Select.ItemText>
                        </Select.Item>
                      </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                  </Select.Content>
                </Select>
              </Card.Footer>
            </Card>

            <Button
              size="$5"
              theme="active"
              onPress={handleSave}
            >
              저장
            </Button>
          </Stack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 