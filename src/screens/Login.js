import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({ navigation }) => {
    const navigaiton = useNavigation();

    return (
        <View style={styles.container}>
        {/* 배경 이미지 */}
        <ImageBackground
            source={require('../../assets/images/LyokoLogin.png')} // 로컬 이미지 파일을 require()로 불러옴
            style={styles.backgroundImage}
        >
            <TouchableOpacity style={styles.loginButton}
                onPress={() => navigation.push('DetailLogin')}>
                <Text style={styles.loginText}>시작하기</Text>
            </TouchableOpacity>
        
            {/* Sign up link */}
            <Text style={styles.signupText}>
                계정이 없으신가요?{'  '}
                <Text style={styles.signupLink} onPress={() => navigation.navigate('SignUp')}>
                회원가입
                </Text>
            </Text>
        </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    position: 'absolute',
    bottom: 150,
    backgroundColor: '#ef4141',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
  },
  loginText: {
    color: '#ffffff',
    fontSize: 18,
  },
  signupText: {
    color: '#000000',
    fontSize: 18,
    position: 'absolute',
    bottom: 100,
    fontWeight: '500',
  },
  signupLink: {
    color: '#ef4141',
    textDecorationLine: 'underline',
    fontWeight: '600'
  },
});

export default Login;
