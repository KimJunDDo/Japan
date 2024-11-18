import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const data = {
  "1일차": [
    { id: '1', time: '오후 15:00', title: 'JR 하카타 시티 아뮤 플라자 하카타', duration: '', image: require('../../assets/images/Kyushu/a1.png') },
    { id: '2', time: '오후 16:30', title: '캐널시티 하카타', duration: '도보 13min', image: require('../../assets/images/Kyushu/a2.png') },
    { id: '3', time: '오후 17:30', title: '이치란 캐널시티 하카타점', duration: '도보 1min', image: require('../../assets/images/Kyushu/a3.png') },
    { id: '4', time: '오후 19:00', title: '나카스', duration: '도보 8min', image: require('../../assets/images/Kyushu/a4.png') },
  ],
  "2일차": [
    { id: '1', time: '오전 10:00', title: '덴진 지하상가', duration: '', image: require('../../assets/images/Kyushu/a5.png') },
    { id: '2', time: '오전 11:30', title: '원조 하카타 멘모츠야', duration: '도보 7min', image: require('../../assets/images/Kyushu/a6.png') },
    { id: '3', time: '오후 13:00', title: '덴진 다이묘 거리', duration: '도보 13min', image: require('../../assets/images/Kyushu/a7.png') },
    { id: '4', time: '오후 14:30', title: '오호리 공원', duration: '도보 19min', image: require('../../assets/images/Kyushu/a8.png') },
    { id: '5', time: '오후 16:00', title: '후쿠오카 타워', duration: '버스 16min', image: require('../../assets/images/Kyushu/a9.png') },
    { id: '6', time: '오후 17:00', title: '시사이드 모모치 해변 공원', duration: '도보 3min', image: require('../../assets/images/Kyushu/a10.png') },
    { id: '7', time: '오후 18:00', title: '마리존', duration: '도보 1min', image: require('../../assets/images/Kyushu/a11.png') },
  ],
  "3일차": [
    { id: '1', time: '오전 10:00', title: '다자이후 덴만구', duration: '', image: require('../../assets/images/Kyushu/a12.png') },
    { id: '2', time: '오전 11:00', title: '스타벅스 다자이후 오모테산도점', duration: '도보 1min', image: require('../../assets/images/Kyushu/a13.png') },
    { id: '3', time: '오후 14:00', title: '야나가와 뱃놀이', duration: '차량 70min', image: require('../../assets/images/Kyushu/a14.png') },
    { id: '4', time: '오후 15:30', title: '오하나', duration: '도보 2min', image: require('../../assets/images/Kyushu/a15.png') },
    { id: '5', time: '오후 17:00', title: '와카마츠야', duration: '도보 1min', image: require('../../assets/images/Kyushu/a16.png') },
  ],
  "4일차": [
    { id: '1', time: '오전 10:00', title: '하카타역', duration: '', image: require('../../assets/images/Kyushu/a17.png') },
    { id: '2', time: '오전 11:00', title: '세이류 온천', duration: '버스 1min', image: require('../../assets/images/Kyushu/a18.png') },
    { id: '3', time: '오후 14:00', title: '키와미야 후쿠오카 파르코점', duration: '버스 1min', image: require('../../assets/images/Kyushu/a19.png') },
    { id: '4', time: '오후 15:30', title: '하카타 리버레인', duration: '도보 12min', image: require('../../assets/images/Kyushu/a20.png') },
    { id: '5', time: '오후 16:30', title: '후쿠오카 아시아 미술관', duration: '도보 1min', image: require('../../assets/images/Kyushu/a21.png') },
    { id: '6', time: '오후 17:30', title: '카미 가와바타 상점가', duration: '도보 3min', image: require('../../assets/images/Kyushu/a22.png') },
    { id: '7', time: '오후 18:30', title: '구시다 신사', duration: '도보 3min', image: require('../../assets/images/Kyushu/a23.png') },
    { id: '8', time: '오후 19:30', title: '돈키호테 나카스점', duration: '도보 6min', image: require('../../assets/images/Kyushu/a24.png') },
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

const KyushuCourse = () => {
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

export default KyushuCourse;
