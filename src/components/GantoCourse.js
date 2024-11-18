import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const data = {
  "1일차": [
    { id: '1', time: '오전 10:00', title: '도큐 플라자 하라주쿠 하라카도', duration: '', image: require('../../assets/images/Ganto/g1.png') },
    { id: '2', time: '오후 12:30', title: '시부야 스크램블 스퀘어', duration: '지하철 10min', image: require('../../assets/images/Ganto/g2.png') },
    { id: '3', time: '오후 14:30', title: '시부야 스카이', duration: '도보 1min', image: require('../../assets/images/Ganto/g3.png') },
    { id: '4', time: '오후 16:00', title: '미야시타 공원', duration: '도보 4min', image: require('../../assets/images/Ganto/g4.png') },
    { id: '5', time: '오후 17:30', title: '오모이데 요코초', duration: '지하철 19min', image: require('../../assets/images/Ganto/g5.png') },
  ],
  "2일차": [
    { id: '1', time: '오전 10:00', title: '센소지', duration: '', image: require('../../assets/images/Ganto/g6.png') },
    { id: '2', time: '오전 11:30', title: '쿠라마에 거리', duration: '지하철 10min', image: require('../../assets/images/Ganto/g7.png') },
    { id: '3', time: '오후 13:00', title: '긴자식스', duration: '지하철 20min', image: require('../../assets/images/Ganto/g8.png') },
    { id: '4', time: '오후 15:00', title: '이토야 긴자 본점', duration: '도보 6min', image: require('../../assets/images/Ganto/g9.png') },
    { id: '5', time: '오후 16:30', title: '아자부다이 힐즈 모리 JR 타워', duration: '지하철 26min', image: require('../../assets/images/Ganto/g10.png') },
    { id: '6', time: '오후 18:00', title: '팀랩 보더리스', duration: '도보 5min', image: require('../../assets/images/Ganto/g11.png') },
  ],
  "3일차": [
    { id: '1', time: '오전 10:00', title: '기치조지', duration: '', image: require('../../assets/images/Ganto/g12.png') },
    { id: '2', time: '오전 11:30', title: '이노카시라 온시 공원', duration: '도보 13min', image: require('../../assets/images/Ganto/g13.png') },
    { id: '3', time: '오후 12:30', title: '지브리 미술관', duration: '도보 9min', image: require('../../assets/images/Ganto/g14.png') },
    { id: '4', time: '오후 15:00', title: '고엔지 거리', duration: '지하철 30min', image: require('../../assets/images/Ganto/g15.png') },
    { id: '5', time: '오후 17:00', title: '시모키타자와', duration: '지하철 34min', image: require('../../assets/images/Ganto/g16.png') },
  ],
};

const TimelineItem = ({ time, title, duration, image }) => (
  <View style={styles.timelineItem}>
    <View style={styles.leftContainer}>
      <Text style={styles.timeText}>{time}</Text>
      {duration ? <Text style={styles.durationText}>{duration}</Text> : null}
    </View>
    <View style={styles.rightContainer}>
      <Image source={image} style={styles.image} />
      <Text style={styles.titleText}>{title}</Text>
    </View>
  </View>
);

const GantoCourse = () => {
  const [selectedDay, setSelectedDay] = useState('1일차');

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* 상단 탭 (1일차, 2일차, 3일차 등) */}
      <View style={styles.tabContainer}>
        {Object.keys(data).map(day => (
          <TouchableOpacity key={day} onPress={() => setSelectedDay(day)} style={styles.tabButton}>
            <Text style={[styles.tabText, selectedDay === day && styles.activeTab]}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 스크롤 가능한 타임라인 */}
      <ScrollView style={styles.scrollView}>
        {data[selectedDay].map(item => (
          <TimelineItem
            key={item.id}
            time={item.time}
            title={item.title}
            duration={item.duration}
            image={item.image}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 4,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabButton: {
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTab: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
    marginRight: 10
  },
  leftContainer: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  rightContainer: {
    width: '75%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  timeText: {
    fontSize: 14,
    color: '#333',
  },
  durationText: {
    fontSize: 12,
    color: '#888',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  titleText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default GantoCourse;
