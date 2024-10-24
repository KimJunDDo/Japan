import React, { useState, useEffect } from 'react';
import { Alert, View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Lyoko from '../../assets/svg/Lyoko.svg';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("비밀번호 오류", "비밀번호 확인이 일치하지 않습니다.", [{ text: "닫기", onPress: () => console.log('닫기') }], { cancelable: true });
      return;
    }

    try {
      // API 호출을 통해 회원가입 요청
      const response = await fetch('https://ryoko-sketch.duckdns.org/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          checkedPassword: confirmPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('User registered successfully:', data);
        // 회원가입 성공 후 DetailLogin 페이지로 이동
        navigation.push('DetailLogin');
      } else {
        console.log('Registration failed:', data.message || 'Unknown error');
        Alert.alert('회원가입 실패', data.message || '오류가 발생했습니다.');
      }
    } catch (error) {
      console.log('Error registering user:', error);
      Alert.alert('회원가입 오류', '오류가 발생했습니다. 다시 시도하세요.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Welcome icon and text */}
      <Lyoko style={styles.Lyoko} />
      <Text style={styles.welcomeText}>Welcome!</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
        autoCapitalize="none"
      />

      {/* Password Input */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
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

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Icon name={passwordVisible ? 'eye' : 'eye-slash'} size={20} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginInput} onPress={handleSignUp}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  Lyoko: {
    marginLeft: 50,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
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
    height: 50,
  },
  loginInput: {
    width: '100%',
    backgroundColor: '#EF4141',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    height: 50,
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
});

export default SignUp;
