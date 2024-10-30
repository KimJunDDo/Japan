import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const data = {
  "1일차": [
    { id: '1', time: '오후 15:00', title: '삿포로 맥주 박물관', duration: '', image: require('../../assets/images/Hokkaido/beermuseum.jpg') },
    { id: '2', time: '오후 17:00', title: '오도리 공원', duration: '버스 15min', image: require('../../assets/images/Hokkaido/odoripark.png') },
    { id: '3', time: '오후 18:00', title: '네무로 하나마루 JR 타워 스텔라 플레이스 점', duration: '도보 18min', image: require('../../assets/images/Hokkaido/h1.png') },
    { id: '4', time: '오후 19:30', title: '삿포로 TV 타워', duration: '도보 17min', image: require('../../assets/images/Hokkaido/tvtower.png') },
  ],
  "2일차": [
    { id: '1', time: '오전 10:00', title: '훗카이도 대학 삿포로 캠퍼스', duration: '', image: require('../../assets/images/Hokkaido/h2.png') },
    { id: '2', time: '오후 12:00', title: '수프 카레 히리히리 2호점', duration: '도보 14min', image: require('../../assets/images/Hokkaido/h3.png') },
    { id: '3', time: '오후 14:00', title: '훗카이도 신궁', duration: '지하철 36min', image: require('../../assets/images/Hokkaido/h4.png') },
    { id: '4', time: '오후 16:00', title: '시로이 코이비토 파크', duration: '지하철 34min', image: require('../../assets/images/Hokkaido/h5.png') },
    { id: '5', time: '오후 18:00', title: '징기스칸 다루마 4.4 점', duration: '지하철 34min', image: require('../../assets/images/Hokkaido/h6.png') },
  ],
  "3일차": [
    { id: '1', time: '오전 09:00', title: '삿포로 역', duration: '', image: require('../../assets/images/Hokkaido/h7.png') },
    { id: '2', time: '오후 12:00', title: '팜 도미타', duration: '지하철 183min', image: require('../../assets/images/Hokkaido/h8.png') },
    { id: '3', time: '오후 13:30', title: '패치워크 로드', duration: '차량 32min', image: require('../../assets/images/Hokkaido/h9.png') },
    { id: '4', time: '오후 14:30', title: '준페이', duration: '차량 10min', image: require('../../assets/images/Hokkaido/h10.png') },
    { id: '5', time: '오후 16:00', title: '아오이이케', duration: '차량 18min', image: require('../../assets/images/Hokkaido/h11.png') },
    { id: '6', time: '오후 17:00', title: '흰수염 폭포', duration: '차량 4min', image: require('../../assets/images/Hokkaido/h12.png') },
    { id: '7', time: '오후 21:30', title: '삿포로 역', duration: '지하철 219min', image: require('../../assets/images/Hokkaido/h7.png') },
  ],
  "4일차": [
    { id: '1', time: '오전 10:00', title: '텐구야마', duration: '', image: require('../../assets/images/Hokkaido/h13.png') },
    { id: '2', time: '오전 11:30', title: '오타루 운하', duration: '차량 25min', image: require('../../assets/images/Hokkaido/otaru.jpg') },
    { id: '3', time: '오후 12:30', title: '오타루 운하 공예관', duration: '도보 2min', image: require('../../assets/images/Hokkaido/h14.png') },
    { id: '4', time: '오후 13:30', title: '오타루 오르골당 본관', duration: '도보 18min', image: require('../../assets/images/Hokkaido/h17.png') },
    { id: '5', time: '오후 14:30', title: '사와자키 수산 3호점', duration: '도보 12min', image: require('../../assets/images/Hokkaido/h15.png') },
    { id: '6', time: '오후 16:00', title: '구 일본 우선주식회사 오타루 지점', duration: '도보16min', image: require('../../assets/images/Hokkaido/h16.png') },
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

const HokkaidoCourse = () => {
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

export default HokkaidoCourse;
