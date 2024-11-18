import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const data = {
  "1일차": [
    { id: '1', time: '오후 13:00', title: '덴포잔 대관람차', duration: '', image: require('../../assets/images/Gansai/o1.png') },
    { id: '2', time: '오후 14:30', title: '범선형 관광선 산타마리아', duration: '도보 4min', image: require('../../assets/images/Gansai/o2.png') },
    { id: '3', time: '오후 13:00', title: '오사카 스테이션 시티', duration: '지하철 33min', image: require('../../assets/images/Gansai/o3.png') },
    { id: '4', time: '오후 13:00', title: '도톤보리', duration: '지하철 17min', image: require('../../assets/images/Gansai/o4.png') },
  ],
  "2일차": [
    { id: '1', time: '오전 10:00', title: '오사카 성', duration: '', image: require('../../assets/images/Gansai/o5.png') },
    { id: '2', time: '오후 12:00', title: '오사카 역사 박물관', duration: '도보 14min', image: require('../../assets/images/Gansai/o6.png') },
    { id: '3', time: '오후 13:30', title: '미나미센바', duration: '지하철 17min', image: require('../../assets/images/Gansai/o7.png') },
    { id: '4', time: '오후 15:00', title: '도큐핸즈 신사이바시점', duration: '도보 3min', image: require('../../assets/images/Gansai/o8.png') },
    { id: '5', time: '오후 17:00', title: '난바 워크', duration: '도보 15min', image: require('../../assets/images/Gansai/o9.png') },
  ],
  "3일차": [
    { id: '1', time: '오전 10:00', title: '유니버셜 스튜디오 재팬', duration: '', image: require('../../assets/images/Gansai/o10.png') },
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

const GansaiCourse = () => {
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

export default GansaiCourse;
