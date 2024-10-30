import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const data = {
  "1일차": [
    { id: '1', time: '오전 10:00', title: '오우치 주쿠', duration: '', image: require('../../assets/images/Tohoku/d1.png') },
    { id: '2', time: '오후 12:00', title: '쓰루가성', duration: '차량 40min', image: require('../../assets/images/Tohoku/d2.png') },
    { id: '3', time: '오후 13:00', title: '나노카마치도리', duration: '차량 5min', image: require('../../assets/images/Tohoku/d5.png') },
    { id: '4', time: '오후 14:30', title: '다다미선', duration: '차량 30min', image: require('../../assets/images/Tohoku/d3.png') },
    { id: '5', time: '오후 17:30', title: '기타카타 라멘카이', duration: '차량 90min', image: require('../../assets/images/Tohoku/d6.png') },
    { id: '6', time: '오후 19:30', title: '후쿠시마현 관광 물산관', duration: '차량 90min', image: require('../../assets/images/Tohoku/d7.png') },
    { id: '7', time: '오후 21:00', title: '스파 리조트 하와이언즈', duration: '차량 60min', image: require('../../assets/images/Tohoku/d4.png') },

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

const TohokuCourse = () => {
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

export default TohokuCourse;
