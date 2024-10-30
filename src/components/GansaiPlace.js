import { Image, ScrollView, TouchableOpacity, StyleSheet, Text, View, Linking } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: '1',
    title: '오도리 공원',
    description: '꽃과 나무, 조각 작품들이 동서로 길게 나 있는 아름다운 공원',
    location: '삿포로시',
    image: require('../../assets/images/Hokkaido/odoripark.png'), // 이미지 URL 예시
    url: 'https://www.google.com/maps/place/%EC%98%A4%EB%8F%84%EB%A6%AC+%EA%B3%B5%EC%9B%90/@43.0607521,141.3518612,17z/data=!3m1!4b1!4m6!3m5!1s0x5f0b295148c5d329:0xe6cb236ed20e09e!8m2!3d43.0607521!4d141.3544308!16s%2Fm%2F03c93pq?entry=ttu&g_ep=EgoyMDI0MTAyMS4xIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '2',
    title: 'TV 타워',
    description: '삿포로의 랜드마크 중 하나로 1957년에 지어진 147m 높이의 송신탑',
    location: '삿포로시',
    image: require('../../assets/images/Hokkaido/tvtower.png'),
  },
  {
    id: '3',
    title: 'JR타워 전망대',
    description: '삿포로 중심에서 일본 3대 야경 만끽',
    location: '삿포로시',
    image: require('../../assets/images/Hokkaido/JRTower.jpg'),
  },
  {
    id: '4',
    title: '훗카이도청 구 본청사',
    description: "훗카이도의 상징, 애칭은 '붉은 벽돌 청사'",
    location: '삿포로시',
    image: require('../../assets/images/Hokkaido/chungsa.jpg'),
  },
  {
    id: '5',
    title: '삿포로시 시계탑',
    description: '130년이 넘는 세월이 흐르는 국가 지정 중요 문화재',
    location: '삿포로시',
    image: require('../../assets/images/Hokkaido/clocktop.jpg'),
  },
  {
    id: '6',
    title: '삿포로 맥주 박물관',
    description: '일본의 유일한 맥주 박물관, 거대한 굴뚝도 챙겨봐야 할 포인트',
    location: '삿포로시',
    image: require('../../assets/images/Hokkaido/beermuseum.jpg'),
  },
  {
    id: '7',
    title: '삿포로시 마루야마 동물원',
    description: "2018년 '북극곰관' 오픈",
    location: '삿포로시',
    image: require('../../assets/images/Hokkaido/maruyama.jpg'),
  },
  {
    id: '8',
    title: '조잔케이 온천',
    description: "삿포로에서 자동차로 약 1시간 거리의 온천지",
    location: '삿포로시',
    image: require('../../assets/images/Hokkaido/zozan.jpg'),
  },
  {
    id: '9',
    title: '치토세 아울렛 몰렐라',
    description: "신치토세 공항에서 약 10분 거리",
    location: '치토세시',
    image: require('../../assets/images/Hokkaido/chitose.jpg'),
  },
  {
    id: '10',
    title: '오타루 운하',
    description: "오타루를 대표하는 인기 관광지",
    location: '오타루시',
    image: require('../../assets/images/Hokkaido/otaru.jpg'),
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

const GansaiPlace = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((item) => (
        <BoardItem key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};

export default GansaiPlace;

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
