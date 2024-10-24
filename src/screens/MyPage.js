import { View, Text, StatusBar, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import React, { useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase'; // Firebase Auth 가져오기

import TopLyoko2 from '../../assets/svg/TopLyoko2.svg';
import ProfileBody from '../components/ProfileBody';
const MyPage = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#ef4141', flex: 1}}>
      <StatusBar
        backgroundColor="white"
        barStyle="light-content"
      />
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
      }}>
        <View style={{
          justifyContent: 'center',
          flexDirection: 'row',          
          alignItems: 'center',           
      }}>
          <TopLyoko2 />
        </View>
      </View>
      
      <ProfileBody />
      <View style={{height: 550, backgroundColor: '#ffffff'}}>
        <Text style={{
          color: '#CDCDCD',
          fontWeight: 'bold',
          paddingLeft: 15,
          paddingTop: 20,
          paddingBottom: 20,
          fontSize: 15
        }}>마이페이지</Text>

        <TouchableOpacity style={[styles.touchContainer, {paddingTop: -10,}]}
          onPress={() => navigation.push('EditProfile')}>
          <View style={styles.leftContainer}>
            <Feather name='user' size={20} color='#000000' />
            <Text style={styles.textContainer}>개인정보</Text>
          </View>
          <AntDesign name='right' size={20} color='#CDCDCD' style={{paddingRight: 15}} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchContainer}
        onPress= {() => Linking.openURL('https://www.vjw.digital.go.jp/main/#/vjwplo001')}>
          <View style={styles.leftContainer}>
            <MaterialCommunityIcons name='airplane' size={20} color='#000000' />
            <Text style={styles.textContainer}>비짓재팬</Text>
          </View>
          <AntDesign name='right' size={20} color='#CDCDCD' style={{paddingRight: 15}} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchContainer}
          onPress={() => navigation.push('Todo')}>
          <View style={styles.leftContainer}>
            <Feather name='check-square' size={20} color='#000000' />
            <Text style={styles.textContainer}>체크리스트</Text>
          </View>
          <AntDesign name='right' size={20} color='#CDCDCD' style={{paddingRight: 15}} />
        </TouchableOpacity> 

        <TouchableOpacity style={styles.touchContainer}
          onPress={() => navigation.push('Exchange')}>
          <View style={styles.leftContainer}>
            <MaterialCommunityIcons name='currency-cny' size={20} color='#000000' />
            <Text style={styles.textContainer}>환율</Text>
          </View>
          <AntDesign name='right' size={20} color='#CDCDCD' style={{paddingRight: 15}} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchContainer}
          onPress={() => navigation.push('Weather')}>
          <View style={styles.leftContainer}>
            <MaterialCommunityIcons name='weather-cloudy' size={20} color='#000000' />
            <Text style={styles.textContainer}>날씨</Text>
          </View>
          <AntDesign name='right' size={20} color='#CDCDCD' style={{paddingRight: 15}} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchContainer}
          onPress={() => navigation.push('Conversation')}>
          <View style={styles.leftContainer}>
            <MaterialCommunityIcons name='syllabary-hiragana' size={24} color='#000000'/>
            <Text style={[styles.textContainer, {paddingLeft: 10}]}>기본 회화</Text>
          </View>
          <AntDesign name='right' size={20} color='#CDCDCD' style={{paddingRight: 15}} />
        </TouchableOpacity>

        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.touchContainer}
            onPress={handleLogout}>
            <View style={styles.leftContainer}>
              <MaterialIcons name='logout' size={20} color='#CDCDCD' />
              <Text style={[styles.textContainer, {color: '#CDCDCD'}]}>로그아웃</Text>
            </View>
            <AntDesign name='right' size={20} color='#CDCDCD' style={{paddingRight: 15}} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MyPage

const styles = StyleSheet.create({
  textContainer:{
    paddingLeft: 15,
    fontSize: 20,
    color: '#000000',
    paddingHorizontal: 10,
    borderBottomColor: 'black',
    fontWeight: 'bold'
  },
  touchContainer: {
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    borderBottomWidth: 1,
    borderColor: '#CDCDCD',
    paddingBottom: 15,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 5
  },
});