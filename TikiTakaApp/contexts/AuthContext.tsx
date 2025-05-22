import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../constants';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const validateToken = async (tokenToValidate: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${tokenToValidate}`
        }
      });
      return response.ok;
    } catch (error) {
      console.error('토큰 검증 중 오류 발생:', error);
      return false;
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          const isValid = await validateToken(storedToken);
          if (isValid) {
            setToken(storedToken);
            setIsAuthenticated(true);
          } else {
            // 토큰이 유효하지 않으면 삭제
            await AsyncStorage.removeItem('token');
            setToken(null);
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error('토큰 확인 중 오류 발생:', error);
        // 에러 발생 시 로그아웃 상태로 설정
        await AsyncStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, []);

  const login = async (newToken: string) => {
    try {
      // 개발 환경용 임시 토큰인 경우 검증 건너뛰기
      if (newToken === 'dev-token') {
        await AsyncStorage.setItem('token', newToken);
        setToken(newToken);
        setIsAuthenticated(true);
        return;
      }

      const isValid = await validateToken(newToken);
      if (!isValid) {
        throw new Error('유효하지 않은 토큰입니다.');
      }
      
      await AsyncStorage.setItem('token', newToken);
      setToken(newToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      // 로그인 실패 시 상태 초기화
      await AsyncStorage.removeItem('token');
      setToken(null);
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setToken(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 