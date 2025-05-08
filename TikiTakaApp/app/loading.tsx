import { Stack, Text } from 'tamagui';
import { useState, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export default function LoadingScreen() {
  // 텍스트 애니메이션
  const loadingSteps = ['로', '로딩', '로딩 중', ''];
  const [displayText, setDisplayText] = useState('');
  const stepRef = useRef(0);

  useEffect(() => {
    setDisplayText('');
    stepRef.current = 0;
    const interval = setInterval(() => {
      setDisplayText(loadingSteps[stepRef.current]);
      stepRef.current += 1;
      if (stepRef.current >= loadingSteps.length) {
        stepRef.current = 0;
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // 원형 점 애니메이션
  const dotCount = 8;
  const radius = 24;
  const dots = Array.from({ length: dotCount });
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Stack flex={1} alignItems="center" justifyContent="center">
      {/* 원형 점 애니메이션 */}
      <Animated.View
        style={{
          width: radius * 2 + 10,
          height: radius * 2 + 10,
          marginBottom: 32,
          alignItems: 'center',
          justifyContent: 'center',
          transform: [{ rotate }],
        }}
      >
        {dots.map((_, i) => {
          const angle = (2 * Math.PI * i) / dotCount;
          const x = Math.cos(angle) * radius + radius;
          const y = Math.sin(angle) * radius + radius;
          return (
            <Animated.View
              key={i}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#ffbf54',
                opacity: 0.8,
              }}
            />
          );
        })}
      </Animated.View>
      {/* 텍스트 애니메이션 */}
      <Text fontSize="$6" fontWeight="bold">{displayText}</Text>
    </Stack>
  );
} 