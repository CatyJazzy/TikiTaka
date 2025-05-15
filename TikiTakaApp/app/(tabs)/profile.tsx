import React, { useState } from 'react';
import { Alert, Platform, Modal, TouchableOpacity, View } from 'react-native';
import { Stack, Text, Button, Input, YStack, Image } from 'tamagui';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [language, setLanguage] = useState('');
  const [activity, setActivity] = useState('');
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);

  const genderOptions = [
    { label: '남성', value: 'male' },
    { label: '여성', value: 'female' },
    { label: '기타', value: 'other' }
  ];

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
            source={require('../../assets/Tiger3.png')}
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
          <TouchableOpacity
            onPress={() => setIsGenderModalVisible(true)}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 4,
              height: 50,
              justifyContent: 'center',
              paddingLeft: 12,
              backgroundColor: 'white'
            }}
          >
            <Text color={gender ? 'black' : '#666'}>
              {gender ? genderOptions.find(opt => opt.value === gender)?.label : '성별을 선택하세요'}
            </Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={isGenderModalVisible}
            onRequestClose={() => setIsGenderModalVisible(false)}
          >
            <View style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: 'rgba(0,0,0,0.5)'
            }}>
              <View style={{
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 20
              }}>
                {genderOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => {
                      setGender(option.value);
                      setIsGenderModalVisible(false);
                    }}
                    style={{
                      padding: 15,
                      borderBottomWidth: 1,
                      borderBottomColor: '#eee'
                    }}
                  >
                    <Text>{option.label}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  onPress={() => setIsGenderModalVisible(false)}
                  style={{
                    padding: 15,
                    marginTop: 10,
                    backgroundColor: '#f0f0f0',
                    borderRadius: 8,
                    alignItems: 'center'
                  }}
                >
                  <Text>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
