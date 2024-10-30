import React, { useState, useEffect, useContext } from 'react';
import { Alert, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 추가
import { SafeAreaView } from 'react-native-safe-area-context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';  // Firebase Auth 가져오기
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';

import Icon from 'react-native-vector-icons/FontAwesome';
import Lyoko from '../../assets/svg/Lyoko.svg';

const DetailLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  // Firebase 로그인 처리 함수
  const handleFirebaseLogin = async () => {
    if (!email || !password) {
      Alert.alert('입력 오류', '이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      // Firebase 로그인 시도
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('Firebase login successful:', user);
      Alert.alert('로그인 성공', 'Firebase 로그인 성공!');
      // 로그인 성공 시 BottomTab으로 이동
      navigation.navigate('Bottom');
    } catch (error) {
      console.error('Firebase login error:', error);
      Alert.alert('로그인 오류', 'Firebase 로그인 실패');
    } finally {
      setLoading(false);
    }
  };

  // 기존 API 로그인 처리 함수
  const handleApiLogin = async () => {
    if (!email || !password) {
        Alert.alert('입력 오류', '이메일과 비밀번호를 입력해주세요.');
        return;
    }

    setLoading(true);

    try {
        const response = await fetch('https://ryoko-sketch.duckdns.org/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('API login successful:', data);

            // accessToken을 AuthContext에 저장
            if (data.tokenInfo && data.tokenInfo.accessToken) {
              console.log('Access Token:', data.tokenInfo.accessToken);
              login(data.tokenInfo.accessToken);  // 토큰을 AuthContext에 저장
            }

            navigation.navigate('Bottom'); // 로그인 성공 시 BottomTab으로 이동
        } else {
            console.log('API login failed:', data.message || 'Unknown error');
            Alert.alert('로그인 실패', data.message || '이메일 또는 비밀번호가 잘못되었습니다.');
        }
    } catch (error) {
        console.error('API login error:', error);
        Alert.alert('로그인 오류', '서버와 통신하는 데 문제가 발생했습니다. 다시 시도해주세요.');
    } finally {
        setLoading(false);
    }
};


  useEffect(() => {
    const unsubscribe = () => {};
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Welcome icon and text */}
      <Lyoko style={styles.Lyoko} />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="이메일을 입력해주세요"
        keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
        autoCapitalize="none"
      />

      {/* Password Input */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Icon name={passwordVisible ? 'eye' : 'eye-slash'} size={20} color="gray" />
        </TouchableOpacity>

        {/* API 로그인 버튼 */}
        <TouchableOpacity style={styles.loginInput} onPress={handleApiLogin}>
          <Text style={styles.loginText}>로그인</Text>
        </TouchableOpacity>

      {/*
        <TouchableOpacity style={styles.loginInput} onPress={handleFirebaseLogin}>
          <Text style={styles.loginText}>Firebase Log in</Text>
        </TouchableOpacity> */}
      </View>

      {/* Social login options */}
      <Text style={styles.orText}>또는</Text>
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="facebook" size={25} color="#4267B2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="google" size={25} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="apple" size={25} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Sign up link */}
      <Text style={styles.signupText}>
      계정이 없으신가요?{'  '}
        <Text style={styles.signupLink} onPress={() => navigation.navigate('SignUp')}>
          회원가입
        </Text>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  Lyoko: {
    marginLeft: 50
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#717171',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 25,
    height: 50
  },
  loginInput: {
    width: '100%',
    backgroundColor: '#EF4141',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    height: 50
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
    marginBottom: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  loginText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    color: '#717171',
    marginVertical: 20,
    top: -15
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  socialButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#717171',
    borderWidth: 2,
  },
  signupText: {
    fontSize: 15,
    color: '#000',
  },
  signupLink: {
    color: '#EF4141',
    textDecorationLine: 'underline',
  },
});

export default DetailLogin;
