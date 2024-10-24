import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Context 생성
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // AsyncStorage에서 토큰 불러오기
  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setUserToken(token);
      }
    } catch (error) {
      console.error('Failed to load token:', error);
    } finally {
      setLoading(false);
    }
  };

  // 로그인 함수: 토큰을 AsyncStorage와 상태에 저장
  const login = async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token); // 토큰을 AsyncStorage에 저장
      setUserToken(token); // 상태 업데이트
    } catch (error) {
      console.error('Failed to save token:', error);
    }
  };

  // 로그아웃 함수: 토큰을 제거
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setUserToken(null);
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  };

  useEffect(() => {
    loadToken(); // 초기 토큰 로드
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
