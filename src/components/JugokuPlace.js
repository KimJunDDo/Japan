import { Image, ScrollView, TouchableOpacity, StyleSheet, Text, View, Linking } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: '1',
    title: '이츠쿠시마 신사',
    description: '실제 바다 한복판에 서 있는 신사',
    location: '히로시마',
    image: require('../../assets/images/Jugoku/h1.png'), // 이미지 URL 예시
    url: 'https://www.google.com/maps/place/%EC%9D%B4%EC%93%B0%EC%BF%A0%EC%8B%9C%EB%A7%88+%EC%8B%A0%EC%82%AC/@34.2959896,132.3172589,17z/data=!3m1!4b1!4m6!3m5!1s0x601ae3047ec76d8f:0x357228f7d0b5d590!8m2!3d34.2959896!4d132.3198285!16zL20vMDJycnJm?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '2',
    title: '원폭 돔',
    description: '인류 역사상 최초의 원자 폭탄이 떨어졌으나 아직 건재한 원폭 돔',
    location: '히로시마',
    image: require('../../assets/images/Jugoku/h2.png'),
    url: 'https://www.google.com/maps/place/%EC%9B%90%ED%8F%AD+%EB%8F%94/@34.2718376,132.2228755,12z/data=!4m6!3m5!1s0x355aa20cdb2780a9:0x34e6677ae0c6c096!8m2!3d34.395483!4d132.453592!16zL20vMDFmYnoy?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '3',
    title: '미야지마 마치야 거리',
    description: '미야지마 섬의 과거 향수를 느끼게 해주는 거리',
    location: '미야지마 섬',
    image: require('../../assets/images/Jugoku/h3.png'),
    url: 'https://www.google.com/maps/place/%EC%9D%BC%EB%B3%B8+%E3%80%92739-0588+%ED%9E%88%EB%A1%9C%EC%8B%9C%EB%A7%88%ED%98%84+%ED%95%98%EC%93%B0%EC%B9%B4%EC%9D%B4%EC%B9%98%EC%8B%9C+%EB%AF%B8%EC%95%BC%EC%A7%80%EB%A7%88%EC%B4%88/@34.2718376,132.2228755,12z/data=!3m1!4b1!4m6!3m5!1s0x355ab6cf888dc94b:0xfc989787339d2f2!8m2!3d34.2975361!4d132.3216115!16zL20vMDJqNmp5?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '4',
    title: '겐민노하마 해변',
    description: "일본 100대 해변 중 하나",
    location: '가미카마가리 섬',
    image: require('../../assets/images/Gansai/o5.png'),
    url: 'https://www.google.com/maps/place/%EA%B0%80%EB%AF%B8%EC%B9%B4%EB%A7%88%EA%B0%80%EB%A6%AC+%EC%84%AC/@34.1811451,132.6434008,12z/data=!3m1!4b1!4m6!3m5!1s0x355011c98fa5da13:0xda1a88df7494bebc!8m2!3d34.188723!4d132.7173856!16s%2Fg%2F1217cnp1?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '5',
    title: '히로시마 성',
    description: '16세기에 지어진 도시 중심 속 히로시마의 대표 성',
    location: '히로시마',
    image: require('../../assets/images/Jugoku/h6.png'),
    url: 'https://www.google.com/maps/place/%ED%9E%88%EB%A1%9C%EC%8B%9C%EB%A7%88+%EC%84%B1/@34.4027456,132.4565359,17z/data=!3m1!4b1!4m6!3m5!1s0x355a98a6eaf7e7c3:0xf57be92cb5339632!8m2!3d34.4027456!4d132.4591055!16zL20vMDdrdjNk?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '6',
    title: '오쿠노시마 섬',
    description: '야생 토끼가 700마리 사는 곳으로 유명하여, 위안과 치유를 원하는 관광객이 찾는 섬',
    location: '오쿠노시마 섬',
    image: require('../../assets/images/Jugoku/h5.png'),
    url: 'https://www.google.com/maps/place/%C5%8Ckunoshima/@34.3089766,132.9833289,15z/data=!3m1!4b1!4m6!3m5!1s0x3550453047d04345:0x48c667e9a04c14fa!8m2!3d34.30906!4d132.9939774!16s%2Fm%2F03bzlvh?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
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

const JugokuPlace = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((item) => (
        <BoardItem key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};

export default JugokuPlace;

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
