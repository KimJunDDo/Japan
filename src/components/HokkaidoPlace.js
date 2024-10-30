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
    url: 'https://www.google.com/maps/place/%EC%82%BF%ED%8F%AC%EB%A1%9C+TV+%ED%83%80%EC%9B%8C/@43.0611086,141.3538497,17z/data=!3m2!4b1!5s0x5f0b299d508fc785:0xa89c33d35137c190!4m6!3m5!1s0x5f0b299d5f87648d:0xe2041a78c3222031!8m2!3d43.0611047!4d141.3564246!16zL20vMDVqMmc1?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '3',
    title: 'JR타워 전망대',
    description: '삿포로 중심에서 일본 3대 야경 만끽',
    location: '삿포로시',
    image: require('../../assets/images/Hokkaido/JRTower.jpg'),
    url: 'https://www.google.com/maps/place/JR%ED%83%80%EC%9B%8C+%EC%A0%84%EB%A7%9D%EB%8C%80/@43.0681432,141.3498536,17z/data=!3m2!4b1!5s0x5f0b2974dc2a8f89:0x4ceb5b059319900b!4m6!3m5!1s0x5f0b2974dcd54fa9:0x2ca814f767ebdf05!8m2!3d43.0681393!4d141.3524285!16s%2Fg%2F1tgzb46r?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '4',
    title: '훗카이도청 구 본청사',
    description: "훗카이도의 상징, 애칭은 '붉은 벽돌 청사'",
    location: '삿포로시',
    image: require('../../assets/images/Hokkaido/chungsa.jpg'),
    url: 'https://www.google.com/maps/place/%ED%99%8B%EC%B9%B4%EC%9D%B4%EB%8F%84%EC%B2%AD/@43.064313,141.3442575,17z/data=!3m2!4b1!5s0x5f0b299efedc6365:0x957994fdbbfc8681!4m6!3m5!1s0x5f0b299f007507ad:0xbb215d6e0de69db7!8m2!3d43.0643091!4d141.3468324!16zL20vMGgxbnNt?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '5',
    title: '삿포로시 시계탑',
    description: '130년이 넘는 세월이 흐르는 국가 지정 중요 문화재',
    location: '삿포로시',
    image: require('../../assets/images/Hokkaido/clocktop.jpg'),
    url: 'https://www.google.com/maps/place/%EC%82%BF%ED%8F%AC%EB%A1%9C%EC%8B%9C+%EC%8B%9C%EA%B3%84%ED%83%91/@43.0625807,141.3509179,17z/data=!3m1!4b1!4m6!3m5!1s0x5f0b297627507247:0x1b9ba84a4b04cdeb!8m2!3d43.0625768!4d141.3534928!16s%2Fm%2F0263ys5?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D'
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
    url: 'https://www.google.com/maps/place/%EC%82%BF%ED%8F%AC%EB%A1%9C%EC%8B%9C+%EB%A7%88%EB%A3%A8%EC%95%BC%EB%A7%88+%EB%8F%99%EB%AC%BC%EC%9B%90/@43.0515165,141.3052823,17z/data=!3m1!4b1!4m6!3m5!1s0x5f0b29c37dcbb621:0x74b24c4658778f26!8m2!3d43.0515126!4d141.3078572!16s%2Fm%2F0k2bs4q?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '8',
    title: '조잔케이 온천',
    description: "삿포로에서 자동차로 약 1시간 거리의 온천지",
    location: '삿포로시',
    image: require('../../assets/images/Hokkaido/zozan.jpg'),
    url: 'https://www.google.com/maps/place/Jozankei+Onsen,+%EB%AF%B8%EB%82%98%EB%AF%B8%EA%B5%AC+%EC%82%BF%ED%8F%AC%EB%A1%9C%EC%8B%9C+%ED%99%8B%EC%B9%B4%EC%9D%B4%EB%8F%84+%EC%9D%BC%EB%B3%B8/@42.9691967,141.1564629,15z/data=!3m1!4b1!4m6!3m5!1s0x5f0ad223039b2371:0x555564cf966f0209!8m2!3d42.9660653!4d141.1670505!16s%2Fg%2F121vrgr4?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '9',
    title: '치토세 아울렛몰 렐라',
    description: "신치토세 공항에서 약 10분 거리",
    location: '치토세시',
    image: require('../../assets/images/Hokkaido/chitose.jpg'),
    url: 'https://www.google.com/maps/place/%EC%A7%80%ED%86%A0%EC%84%B8+%EC%95%84%EC%9A%B8%EB%A0%9B%EB%AA%B0+%EB%A0%88%EB%9D%BC/@42.8115072,141.6729983,17z/data=!3m1!4b1!4m6!3m5!1s0x5f752082f066b873:0x92745780a025e5f9!8m2!3d42.8115033!4d141.6755732!16s%2Fg%2F121fqlvq?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '10',
    title: '오타루 운하',
    description: "오타루를 대표하는 인기 관광지",
    location: '오타루시',
    image: require('../../assets/images/Hokkaido/otaru.jpg'),
    url: 'https://www.google.com/maps/place/%EC%98%A4%ED%83%80%EB%A3%A8+%EC%9A%B4%ED%95%98/@43.1990449,140.9995427,17z/data=!3m1!4b1!4m6!3m5!1s0x5f0ae16457554cd1:0x4ee07ad75699721!8m2!3d43.199041!4d141.0021176!16s%2Fg%2F12182k3s?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D'
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

const HokkaidoPlace = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((item) => (
        <BoardItem key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};

export default HokkaidoPlace;

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
