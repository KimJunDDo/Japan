import { SafeAreaView, StatusBar, View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native'
import React from 'react'

import Lyoko from '../../assets/svg/TopLyoko.svg';

const Community = () => {
  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex:1  }}>
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
          <Lyoko />
        {/*<View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Ionic name="search" style={{ fontSize: 24, paddingHorizontal: 15, color: '#ef4141' }} />
            <Fonti name="bell" style={{ fontSize: 24, color: '#ef4141' }} />
        </View> */}
      </View>
      <ScrollView>
        {/*Board*/}
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Community

const styles = StyleSheet.create({
});