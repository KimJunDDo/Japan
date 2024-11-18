import { Image, ScrollView, TouchableOpacity, StyleSheet, Text, View, Linking } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: '1',
    title: '오우치 주쿠',
    description: '에도시대의 풍경이 잘 보존되어 역사의 정취가 넘치는 옛 역참 마을',
    location: '후쿠시마현',
    image: require('../../assets/images/Tohoku/d1.png'), // 이미지 URL 예시
    url: 'https://www.google.com/maps/place/%EC%98%A4%EB%8F%84%EB%A6%AC+%EA%B3%B5%EC%9B%90/@43.0607521,141.3518612,17z/data=!3m1!4b1!4m6!3m5!1s0x5f0b295148c5d329:0xe6cb236ed20e09e!8m2!3d43.0607521!4d141.3544308!16s%2Fm%2F03c93pq?entry=ttu&g_ep=EgoyMDI0MTAyMS4xIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '2',
    title: '쓰루가성',
    description: '일본에서 유일한 붉은 기와 천수각이 아름다운 난공불락의 명성',
    location: '후쿠시마현',
    image: require('../../assets/images/Tohoku/d2.png'),
    url: 'https://www.google.com/maps/place/%EC%98%A4%EC%98%A4%EC%9A%B0%EC%B9%98%EC%A3%BC%EC%BF%A0/@37.3339192,139.8584779,17z/data=!3m1!4b1!4m6!3m5!1s0x601ffcb1e26e16b1:0x622953e13bf4f230!8m2!3d37.3339192!4d139.8610475!16s%2Fm%2F026pr8h?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '3',
    title: '다다미선',
    description: '오쿠아이즈의 웅대한 자연을 배경으로 다다미 강의 계곡을 따라 달리는 다다미선',
    location: '후쿠시마현',
    image: require('../../assets/images/Tohoku/d3.png'),
    url: 'https://www.google.com/maps/place/%EC%9D%BC%EB%B3%B8+%ED%9B%84%EC%BF%A0%EC%8B%9C%EB%A7%88%ED%98%84+Minamiaizu+District,+%EB%8B%A4%EB%8B%A4%EB%AF%B8%EB%A7%88%EC%B9%98/@37.2922974,139.3701238,11z/data=!3m1!4b1!4m6!3m5!1s0x5ff57bb8f0721e95:0x216ffe8984c26843!8m2!3d37.3489055!4d139.3160686!16zL20vMDNrejhr?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '4',
    title: '스파 리조트 하와이언즈',
    description: "훌라걸과 365일 여름의 낙원을 만끽할 수 있는 온천 테마파크",
    location: '후쿠시마현',
    image: require('../../assets/images/Tohoku/d4.png'),
    url: 'https://www.google.com/maps/place/Spa+Resort+Hawaiians/@36.7768609,139.9215791,8.44z/data=!4m9!3m8!1s0x60210e6f39a17e05:0xd0e990a6bf5122ad!5m2!4m1!1i2!8m2!3d36.9935302!4d140.8156638!16s%2Fm%2F065zy5q?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
];

const BoardItem = ({ item }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (item.url) {
      Linking.openURL(item.url).catch((err) => console.error('An error occurred', err));
    } else {
      console.log('URL이 존재하지 않습니다.');
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.boardItem}>
      <Image source={ item.image } style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <View style={styles.cardFooter}>
          <Text>{item.location}</Text>
          <Text>{item.views} {item.likes}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const TohokuPlace = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((item) => (
        <BoardItem key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};

export default TohokuPlace;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 0,
  },
  boardItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cardImage: {
    width: 120,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
