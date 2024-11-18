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
      url: 'https://www.google.com/maps/place/Akihabara+Electric+Town,+%EB%8F%84%EC%BF%84%EB%8F%84+%EC%9D%BC%EB%B3%B8/@35.6999417,139.7671667,16z/data=!3m1!4b1!4m6!3m5!1s0x60188c1d829dd5cd:0x772f5995da208987!8m2!3d35.6996473!4d139.7713703!16zL20vMDExOW0?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      id: '2',
      title: '긴자',
      description: '고급 브랜드 상점과 유명 레스토랑이 즐비한 긴자는 어른들의 거리, 산책 장소로 인기',
      location: '츄오구',
      image: require('../../assets/images/Ganto/ginza.png'),
      url: 'https://www.google.com/maps/place/%EC%9D%BC%EB%B3%B8+%E3%80%92104-0061+%EB%8F%84%EC%BF%84%EB%8F%84+%EC%A3%BC%EC%98%A4%EA%B5%AC+%EA%B8%B4%EC%9E%90/@35.6696257,139.7552608,15z/data=!3m1!4b1!4m6!3m5!1s0x60188be701836fbb:0x604685b30ba99851!8m2!3d35.6712228!4d139.7664859!16zL20vMDFrNHQy?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      id: '3',
      title: '이마도 신사',
      description: '아사쿠사에 있는 이마도 신사는 결연의 파워 스폿으로서 여성에게 인기있는 신사',
      location: '다이토구',
      image: require('../../assets/images/Ganto/imado.png'),
      url: 'https://www.google.com/maps/place/%EC%9D%B4%EB%A7%88%EB%8F%84+%EC%8B%A0%EC%82%AC/@35.7193219,139.8009627,17z/data=!3m1!4b1!4m6!3m5!1s0x60188edd4de502a3:0x9c0f93a97544e047!8m2!3d35.7193219!4d139.8035323!16s%2Fg%2F1236ynk1?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      id: '4',
      title: '센소지 카미나리몬 나카미세',
      description: '도쿄 시내에서 가장 오래된 절 센소지',
      location: '다이토구',
      image: require('../../assets/images/Ganto/nakamise.png'),
      url: 'https://www.google.com/maps/place/%EC%84%BC%EC%86%8C%EC%A7%80+%EA%B0%80%EB%AF%B8%EB%82%98%EB%A6%AC%EB%AA%AC/@35.7111163,139.793796,17z/data=!3m2!4b1!5s0x60188ec7317b39ad:0x328c7121f66ac5b5!4m6!3m5!1s0x60188ec6db068cd1:0xd9a856805c8012bd!8m2!3d35.7111163!4d139.7963656!16s%2Fm%2F03wc6qd?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      id: '5',
      title: '오모테산도 힐즈',
      description: '최첨단의 패션과 문화를 계속 발신하는 오모테산도의 랜드마크',
      location: '시부야구',
      image: require('../../assets/images/Ganto/omotesandohills.png'),
      url: 'https://www.google.com/maps/place/%EC%98%A4%EB%AA%A8%ED%85%8C%EC%82%B0%EB%8F%84+%ED%9E%90%EC%A6%88/@35.6672869,139.7060466,17z/data=!3m1!4b1!4m6!3m5!1s0x60188ca182a31e0b:0x99d7a9865079f0a5!8m2!3d35.6672869!4d139.7086162!16zL20vMGJtcno3?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      id: '6',
      title: '롯폰기 힐즈 전망대',
      description: '오피스 빌딩과 영화관, 미술관, 각종 상점과 레스토랑 등이 모여 있는 종합 복합시설',
      location: '미나토구',
      image: require('../../assets/images/Ganto/rotpongihills.png'),
      url: 'https://www.google.com/maps/place/%EB%A1%AF%ED%8F%B0%EA%B8%B0+%ED%9E%90%EC%8A%A4/@35.6602384,139.7255706,17z/data=!4m10!1m2!2m1!1z66Gv7Y-w6riwIO2ekOymiA!3m6!1s0x60188b771049dc33:0x5bfe0248594cc802!8m2!3d35.6602384!4d139.7300767!15sChDroa_tj7DquLAg7Z6Q7KaIWhIiEOuhr-2PsOq4sCDtnpDspoiSAQ1idXNpbmVzc19wYXJr4AEA!16zL20vMDFyMl9r?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      id: '7',
      title: '시부야 스크램블 교차로',
      description: "하루에 50만 명의 사람들이 오가는 세계에서도 유례없는 교차로",
      location: '시부야구',
      image: require('../../assets/images/Ganto/scramblestreet.png'),
      url: 'https://www.google.com/maps/place/Shibuya+Scramble+Crossing/@35.659482,139.6960535,17z/data=!3m1!5s0x60188b57f546295f:0x486cece41a7b21b0!4m10!1m2!2m1!1z7Iuc67aA7JW8IOyKpO2BrOueqOu4lCDqtZDssKjroZw!3m6!1s0x60188bcaeb0cd12b:0x20e563a2e0aec969!8m2!3d35.659482!4d139.7005596!15sCiDsi5zrtoDslbwg7Iqk7YGs656o67iUIOq1kOywqOuhnFoiIiDsi5zrtoDslbwg7Iqk7YGs656o67iUIOq1kOywqOuhnJIBEnRvdXJpc3RfYXR0cmFjdGlvbuABAA!16s%2Fg%2F11shy4scrj?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      id: '8',
      title: '시부야 스크램블 스퀘어',
      description: "지하2층~45층+옥상으로 이루어진 복합시설로 높이는 약 229.7미터로 시부야역 주변의 고층건물 중에서도 톱클래스",
      location: '시부야구',
      image: require('../../assets/images/Ganto/scramblesquare.png'),
      url: 'https://www.google.com/maps/place/%EC%8B%9C%EB%B6%80%EC%95%BC+%EC%8A%A4%ED%81%AC%EB%9E%A8%EB%B8%94+%EC%8A%A4%ED%80%98%EC%96%B4/@35.659482,139.6960535,17z/data=!3m1!5s0x60188b7b9c819b61:0x92144cdf397130f5!4m10!1m2!2m1!1z7Iuc67aA7JW8IOyKpO2BrOueqOu4lCDqtZDssKjroZw!3m6!1s0x60188b8427e1c0b1:0x78f6e23397061d6f!8m2!3d35.6584638!4d139.7022621!15sCiDsi5zrtoDslbwg7Iqk7YGs656o67iUIOq1kOywqOuhnFoiIiDsi5zrtoDslbwg7Iqk7YGs656o67iUIOq1kOywqOuhnJIBD3Nob3BwaW5nX2NlbnRlcuABAA!16s%2Fg%2F11f01x7t7p?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      id: '9',
      title: '도쿄역',
      description: "약 100년 전 개업 당시의 붉은 벽돌 역사가 복원된 아름다운 도쿄역",
      location: '지요다구',
      image: require('../../assets/images/Ganto/tokyostation.png'),
      url: 'https://www.google.com/maps/place/%EB%8F%84%EC%BF%84/@35.6812362,139.7645552,17z/data=!3m1!4b1!4m6!3m5!1s0x60188bfbd89f700b:0x277c49ba34ed38!8m2!3d35.6812362!4d139.7671248!16zL20vMDFfdnY3?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      id: '10',
      title: '도쿄 타워',
      description: "높이 333m의 도쿄의 상징적인 랜드마크",
      location: '도쿄 타워',
      image: require('../../assets/images/Ganto/tokyotower.png'),
      url: 'https://www.google.com/maps/place/%EB%8F%84%EC%BF%84+%ED%83%80%EC%9B%8C/@35.6585805,139.7428633,17z/data=!3m1!4b1!4m6!3m5!1s0x60188bbd9009ec09:0x481a93f0d2a409dd!8m2!3d35.6585805!4d139.7454329!16zL20vMDEzMl94?authuser=0&entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
    },
];

const BoardItem = ({ item }) => {
  const navigation = useNavigation ();

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
