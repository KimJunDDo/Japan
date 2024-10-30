import { Image, ScrollView, TouchableOpacity, StyleSheet, Text, View, Linking } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const data = [
    {
      id: '1',
      title: '아키하바라 전자상가',
      description: '모든 전기 관련 상품이 늘어선, 세계에서도 유례없는 대규모 전자상가',
      location: '지요다구',
      image: require('../../assets/images/Ganto/akihabara.png'), // 이미지 URL 예시
      url: 'https://www.google.com/maps/place/%EC%98%A4%EB%8F%84%EB%A6%AC+%EA%B3%B5%EC%9B%90/@43.0607521,141.3518612,17z/data=!3m1!4b1!4m6!3m5!1s0x5f0b295148c5d329:0xe6cb236ed20e09e!8m2!3d43.0607521!4d141.3544308!16s%2Fm%2F03c93pq?entry=ttu&g_ep=EgoyMDI0MTAyMS4xIKXMDSoASAFQAw%3D%3D'
    },
    {
      id: '2',
      title: '긴자',
      description: '고급 브랜드 상점과 유명 레스토랑이 즐비한 긴자는 어른들의 거리, 산책 장소로 인기',
      location: '츄오구',
      image: require('../../assets/images/Ganto/ginza.png'),
    },
    {
      id: '3',
      title: '이마도 신사',
      description: '아사쿠사에 있는 이마도 신사는 결연의 파워 스폿으로서 여성에게 인기있는 신사',
      location: '다이토구',
      image: require('../../assets/images/Ganto/imado.png'),
    },
    {
      id: '4',
      title: '센소지 카미나리몬 나카미세',
      description: '도쿄 시내에서 가장 오래된 절 센소지',
      location: '다이토구',
      image: require('../../assets/images/Ganto/nakamise.png'),
    },
    {
      id: '5',
      title: '오모테산도 힐즈',
      description: '최첨단의 패션과 문화를 계속 발신하는 오모테산도의 랜드마크',
      location: '시부야구',
      image: require('../../assets/images/Ganto/omotesandohills.png'),
    },
    {
      id: '6',
      title: '롯폰기 힐즈 전망대',
      description: '오피스 빌딩과 영화관, 미술관, 각종 상점과 레스토랑 등이 모여 있는 종합 복합시설',
      location: '미나토구',
      image: require('../../assets/images/Ganto/rotpongihills.png'),
    },
    {
      id: '7',
      title: '시부야 스크램블 교차로',
      description: "하루에 50만 명의 사람들이 오가는 세계에서도 유례없는 교차로",
      location: '시부야구',
      image: require('../../assets/images/Ganto/scramblestreet.png'),
    },
    {
      id: '8',
      title: '시부야 스크램블 스퀘어',
      description: "지하2층~45층+옥상으로 이루어진 복합시설로 높이는 약 229.7미터로 시부야역 주변의 고층건물 중에서도 톱클래스",
      location: '시부야구',
      image: require('../../assets/images/Ganto/scramblesquare.png'),
    },
    {
      id: '9',
      title: '도쿄역',
      description: "약 100년 전 개업 당시의 붉은 벽돌 역사가 복원된 아름다운 도쿄역",
      location: '지요다구',
      image: require('../../assets/images/Ganto/tokyostation.png'),
    },
    {
      id: '10',
      title: '도쿄 타워',
      description: "높이 333m의 도쿄의 상징적인 랜드마크",
      location: '도쿄 타워',
      image: require('../../assets/images/Ganto/tokyotower.png'),
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

const GantoPlace = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((item) => (
        <BoardItem key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};

export default GantoPlace;

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
