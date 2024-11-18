import { Image, ScrollView, TouchableOpacity, StyleSheet, Text, View, Linking } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: '1',
    title: '유니버셜 스튜디오 재팬',
    description: '온가족 모두 즐거운 할리우드 영화 테마파크',
    location: '오사카시',
    image: require('../../assets/images/Gansai/o10.png'), // 이미지 URL 예시
    url: 'https://www.google.com/maps/place/%EC%9C%A0%EB%8B%88%EB%B2%84%EC%84%A4+%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4+%EC%9E%AC%ED%8C%AC/@34.6656768,135.4297489,17z/data=!3m1!4b1!4m6!3m5!1s0x6000e0d083d5e25d:0x3605fe25303252aa!8m2!3d34.6656768!4d135.4323185!16zL20vMDczN3g1?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '2',
    title: '덴포잔 대관람차',
    description: '간사이 풍경을 한눈에 담을 수 있는 세계 최대 규모의 대관람차',
    location: '오사카시',
    image: require('../../assets/images/Gansai/o1.png'),
    url: 'https://www.google.com/maps/place/%EB%8D%B4%ED%8F%AC%EC%9E%94+%EB%8C%80%EA%B4%80%EB%9E%8C%EC%B0%A8/@34.6562686,135.4283963,17z/data=!3m1!4b1!4m6!3m5!1s0x6000e88b5561e543:0xfe7be2a424a0c226!8m2!3d34.6562686!4d135.4309659!16zL20vMDZrN2M1?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '3',
    title: '도톤보리',
    description: '화려한 네온사인 속 맛집 탐험! 오사카 NO.1 관광 명소',
    location: '난바',
    image: require('../../assets/images/Gansai/o4.png'),
    url: 'https://www.google.com/maps/place/%EC%9D%BC%EB%B3%B8+%E3%80%92542-0071+%EC%98%A4%EC%82%AC%EC%B9%B4%EB%B6%80+%EC%98%A4%EC%82%AC%EC%B9%B4%EC%8B%9C+%EC%A3%BC%EC%98%A4%EA%B5%AC+%EB%8F%84%ED%86%A4%EB%B3%B4%EB%A6%AC/@34.668532,135.4938138,15z/data=!3m1!4b1!4m6!3m5!1s0x6000e71526dc6083:0xe43d6b861e80b709!8m2!3d34.6686471!4d135.5030983!16s%2Fg%2F1pxxyn9jt?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '4',
    title: '오사카 성',
    description: "오사카를 상징하는 랜드마크이자 필수 관광 코스",
    location: '오사카시',
    image: require('../../assets/images/Gansai/o5.png'),
    url: 'https://www.google.com/maps/place/%EC%98%A4%EC%82%AC%EC%B9%B4+%EC%84%B1/@34.6872571,135.5168424,16z/data=!4m10!1m2!2m1!1z7Jik7IKs7Lm0IOyEsQ!3m6!1s0x6000e0cd5c283afd:0xf01d07d5ca11e41!8m2!3d34.6872571!4d135.5258546!15sCg3smKTsgqzsubQg7ISxWg8iDeyYpOyCrOy5tCDshLGSAQZjYXN0bGXgAQA!16zL20vMDI0Yl9n?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '5',
    title: '오사카 역사 박물관',
    description: '오사카의 역사와 전통을 체험할 수 있는 박물관',
    location: '오사카시',
    image: require('../../assets/images/Gansai/o6.png'),
    url: 'https://www.google.com/maps/place/%EC%98%A4%EC%82%AC%EC%B9%B4+%EC%97%AD%EC%82%AC%EB%B0%95%EB%AC%BC%EA%B4%80/@34.6826141,135.5182279,17z/data=!3m2!4b1!5s0x6000e7318a1949fb:0x2a4a0ad09f4a1c29!4m6!3m5!1s0x6000e73225da9c47:0xe984837dc97fe2ca!8m2!3d34.6826141!4d135.5207975!16s%2Fm%2F0nbcw5c?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '6',
    title: '난바 워크',
    description: '200여 개의 매장이 모여 있는 지하 상점가',
    location: '난바',
    image: require('../../assets/images/Gansai/o9.png'),
    url: 'https://www.google.com/maps/place/%EB%82%9C%EB%B0%94+%EC%9B%8C%ED%81%AC/@34.6670875,135.5004465,17z/data=!3m2!4b1!5s0x6000e71354c0fb87:0xa230d50a1d78f6a8!4m6!3m5!1s0x6000e76a9249a3ad:0x46da5440b1a266c!8m2!3d34.6670875!4d135.5030161!16s%2Fg%2F122x7vx8?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '7',
    title: '미나미센바',
    description: "고급 매장과 분위기 있는 음식점들이 모여 있는 지역",
    location: '오사카시',
    image: require('../../assets/images/Gansai/o7.png'),
    url: 'https://www.google.com/maps/place/%EC%9D%BC%EB%B3%B8+%E3%80%92542-0081+%EC%98%A4%EC%82%AC%EC%B9%B4%EB%B6%80+%EC%98%A4%EC%82%AC%EC%B9%B4%EC%8B%9C+%EC%A3%BC%EC%98%A4%EA%B5%AC+%EB%AF%B8%EB%82%98%EB%AF%B8%EC%84%BC%EB%B0%94/@34.676498,135.4939693,15z/data=!3m1!4b1!4m6!3m5!1s0x6000e717812dbc3d:0x3703b1b2426b458e!8m2!3d34.6762739!4d135.5045713!16s%2Fg%2F121p7224?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
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
