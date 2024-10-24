import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const data = {
  "1일차": [
    { id: '1', time: '오전 9:00', title: 'Kiritoshishinshindo', duration: '도보 15min', image: require('../../assets/images/ichiran.jpeg') },
    { id: '2', time: '오전 10:00', title: 'Kodai-ji Zen Temple', duration: '도보 30min', image: 'https://example.com/image2.jpg' },
    { id: '3', time: '오전 11:00', title: '% Arabica Kyoto Higashiyama', duration: '', image: 'https://example.com/image3.jpg' },
  ],
  "2일차": [
    { id: '1', time: '오전 8:00', title: 'Kyoto Tower', duration: '도보 10min', image: 'https://example.com/image4.jpg' },
    { id: '2', time: '오전 9:30', title: 'Fushimi Inari Shrine', duration: '도보 45min', image: 'https://example.com/image5.jpg' },
  ],
  "3일차": [
    { id: '1', time: '오전 8:00', title: 'Kyoto Tower', duration: '도보 10min', image: 'https://example.com/image4.jpg' },
    { id: '2', time: '오전 9:30', title: 'Fushimi Inari Shrine', duration: '도보 45min', image: 'https://example.com/image5.jpg' },
  ],
  "4일차": [
    { id: '1', time: '오전 8:00', title: 'Kyoto Tower', duration: '도보 10min', image: 'https://example.com/image4.jpg' },
    { id: '2', time: '오전 9:30', title: 'Fushimi Inari Shrine', duration: '도보 45min', image: 'https://example.com/image5.jpg' },
  ]
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
