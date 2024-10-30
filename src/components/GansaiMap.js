import { Image, ScrollView, TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import TopLyoko from '../../assets/svg/TopLyoko.svg';
import HokkaidoCourse from './HokkaidoCourse';
import HokkaidoPlace from './HokkaidoPlace';

const GansaiMap = ({ route, navigation }) => {
  const [activeTab, setActiveTab] = useState('place'); // 현재 활성화된 탭 상태

  return (
    <SafeAreaView
        style={{
            width: '100%',
            backgroundColor: 'white',
            flex: 1,
        }}>
        {/* 상단 네비게이션 */}
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: 10,
                paddingRight: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ paddingLeft: 5, paddingBottom: 10 }}>취소</Text>
            </TouchableOpacity>
            <TopLyoko />
            <TouchableOpacity>
                <Text style={{ color: '#ffffff', paddingRight: 5, paddingBottom: 10 }}>완료</Text>
            </TouchableOpacity>
        </View>

        {/* 탭 메뉴 */}
        <View style={styles.tabs}>
            <TouchableOpacity
              style={styles.tab}
              onPress={() => setActiveTab('place')} // 장소 추천 탭 활성화
            >   
                <Text style={activeTab === 'place' ? styles.tabTextActive : styles.tabTextInactive}>
                    훗카이도 장소 추천
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tab}
              onPress={() => setActiveTab('course')} // 코스 추천 탭 활성화
            >
                <Text style={activeTab === 'course' ? styles.tabTextActive : styles.tabTextInactive}>
                    훗카이도 코스 추천
                </Text>
            </TouchableOpacity>
        </View>
        
        {/* 선택된 탭에 따라 컴포넌트 렌더링 */}
        {activeTab === 'place' ? <HokkaidoPlace /> : <HokkaidoCourse />}

    </SafeAreaView>
  )
}

export default GansaiMap

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: -15,
    },
    tabs: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      paddingHorizontal: 20,
      paddingVertical: 10,
      paddingTop: 0
    },
    tab: {
      paddingVertical: 5,
    },
    tabTextActive: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
      textAlign: 'center',
    },
    tabTextInactive: {
      fontSize: 16,
      color: '#888',
      textAlign: 'center',
    },
  });
