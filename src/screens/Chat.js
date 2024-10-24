import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from'react-native-safe-area-context'

import TopLyoko from '../../assets/svg/TopLyoko.svg';
import ChatApp from '../components/ChatApp';

const Chat = () => {
  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1}}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
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
          <TopLyoko />
        </View>
      </View>
      <ChatApp />
    </SafeAreaView>
  )
}

export default Chat

const styles = StyleSheet.create({})