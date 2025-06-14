import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import '../i18n'; // i18n 설정 파일 import
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </I18nextProvider>
  );
}

function RootLayoutNav() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const current = '/' + segments.join('/');
    // 인증이 필요한 경우에만 로그인 페이지로 리다이렉트
    if (current !== '/login' && current !== '/signup' && !isAuthenticated) {
      // 개발자용 버튼으로 진입한 경우 모든 탭과 퀘스트 페이지 접근 허용
      if (segments[0] === '(tabs)' || segments[0] === 'study' || segments[0] === 'cafe-tour') {
        return;
      }
      router.replace('/login');
    }
  }, [isAuthenticated, segments]);

  return (
    <TamaguiProvider config={config}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="study" options={{ headerShown: false }} />
        <Stack.Screen name="study/quest1" options={{ headerShown: false }} />
        <Stack.Screen name="study/quest2" options={{ headerShown: false }} />
        <Stack.Screen name="study/quest3" options={{ headerShown: false }} />
        <Stack.Screen name="study/quest4" options={{ headerShown: false }} />
        <Stack.Screen name="study/quest5" options={{ headerShown: false }} />
      </Stack>
    </TamaguiProvider>
  );
}
