import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const JugokuCourse = () => {
  const [selectedDay, setSelectedDay] = useState('1일차');

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Scrollable Timeline */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.centeredText}>빠른 시일 내로 준비하겠습니다...</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flex: 1,
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
    paddingHorizontal: 10,
  },
  centeredText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold'
  },
});


export default JugokuCourse;
