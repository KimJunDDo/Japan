import { Image, ScrollView, TouchableOpacity, StyleSheet, Text, View, Linking } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: '1',
    title: '이토시마 토토로 숲',
    description: "유명 애니메이션 '이웃집 토토로'의 배경과 닮아 이름 지어진 숲",
    location: '이토시마',
    image: require('../../assets/images/Kyushu/i2.png'), // 이미지 URL 예시
    url: 'https://www.google.co.kr/maps/place/Itoshimas+Totoro+Forest/@33.5948563,130.1063797,16.75z/data=!4m6!3m5!1s0x3541e748b403682b:0x975c4cbafd177754!8m2!3d33.5950234!4d130.1094904!16s%2Fg%2F11gsn3xnk0?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '2',
    title: '이토시마시 관광 안내소',
    description: '이토시마에 대한 관광 정보와 자전거 대여 서비스를 제공하는 안내소',
    location: '이토시마',
    image: require('../../assets/images/Kyushu/i1.png'),
    url: 'https://www.google.co.kr/maps/place/Itoshimashi+Tourism+Information+Center/@33.5572248,129.0426551,9z/data=!3m1!5s0x3541e9c430e3cd1d:0xf6a80e8f640e986c!4m10!1m2!2m1!1z7J207Yag7Iuc66eIIOq0gOq0kSDslYjrgrTshow!3m6!1s0x3541e9c5b0ca840b:0xb66441097fde4350!8m2!3d33.5575205!4d130.1994713!15sCh3snbTthqDsi5zrp4gg6rSA6rSRIOyViOuCtOyGjFogIh7snbTthqAg7Iuc66eIIOq0gOq0kSDslYjrgrTshoySARp0b3VyaXN0X2luZm9ybWF0aW9uX2NlbnRlcpoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOdWVrMTVlalpSUlJBQuABAA!16s%2Fg%2F11cr_xv13_?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '3',
    title: 'JR 하카타 시티 아뮤 플라자 하카타',
    description: '상점, 식당가, 전망대까지 모두 갖춘 거대 규모의 복합 쇼핑몰',
    location: '하카타',
    image: require('../../assets/images/Kyushu/a1.png'),
    url: 'https://www.google.co.kr/maps/place/%EC%95%84%EB%AE%A4%ED%94%8C%EB%9D%BC%EC%9E%90+%ED%95%98%EC%B9%B4%ED%83%80/@33.58981,130.4178619,17z/data=!3m2!4b1!5s0x354191b808122eff:0xdb78b1ed04a82d0!4m6!3m5!1s0x354191c7ea885905:0x56198a5b265cebf4!8m2!3d33.58981!4d130.4204315!16s%2Fg%2F12365742?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '4',
    title: '캐널시티 하카타',
    description: '쇼핑과 엔터테인먼트를 동시에 즐길 수 있는 복합 상업시설',
    location: '하카타',
    image: require('../../assets/images/Kyushu/a2.png'),
    url: 'https://www.google.co.kr/maps/place/%EC%BA%90%EB%84%90%EC%8B%9C%ED%8B%B0+%ED%95%98%EC%B9%B4%ED%83%80/@33.5897944,130.4085332,17z/data=!3m1!4b1!4m6!3m5!1s0x354191958981c361:0xe0edba177a7419d1!8m2!3d33.5897944!4d130.4111028!16s%2Fm%2F04zxt4t?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '5',
    title: '나카스',
    description: "일본식 포장마차 '야타이'가 몰려 있는 거리",
    location: '하카타',
    image: require('../../assets/images/Kyushu/a4.png'),
    url: 'https://www.google.co.kr/maps/place/%EC%9D%BC%EB%B3%B8+%E3%80%92810-0801+%ED%9B%84%EC%BF%A0%EC%98%A4%EC%B9%B4%ED%98%84+%ED%9B%84%EC%BF%A0%EC%98%A4%EC%B9%B4%EC%8B%9C+%ED%95%98%EC%B9%B4%ED%83%80%EA%B5%AC+%EB%82%98%EC%B9%B4%EC%8A%A4/@33.5897944,130.4085332,17z/data=!4m6!3m5!1s0x35419194740b3db5:0x3808932bb30aa88d!8m2!3d33.5929669!4d130.4064173!16zL20vMDZ0YmZu?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '6',
    title: '덴진 지하상가',
    description: '덴진 지역의 쇼핑 플레이스들을 잇는 큰 규모의 지하상가',
    location: '덴진',
    image: require('../../assets/images/Kyushu/a5.png'),
    url: 'https://www.google.co.kr/maps/place/%ED%85%90%EC%A7%84+%EC%A7%80%ED%95%98%EA%B0%80/@33.589986,130.3969314,17z/data=!3m2!4b1!5s0x3541918fccfc58b7:0x4ceb5b05a795f268!4m6!3m5!1s0x3541918ea317bdf7:0xa69f5c429994a19b!8m2!3d33.589986!4d130.399501!16s%2Fg%2F1yh802kf7?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '7',
    title: '덴진 다이묘 거리',
    description: '맛집 탐방과 쇼핑을 함께 즐길 수 있는 번화가',
    location: '덴진',
    image: require('../../assets/images/Kyushu/a7.png'),
    url: 'https://www.google.co.kr/maps/place/Daimyoshomaeenoki+St,+2-ch%C5%8Dme-1+Daimy%C5%8D,+Chuo+Ward,+Fukuoka,+810-0041+%EC%9D%BC%EB%B3%B8/@33.5886892,130.3944106,17z/data=!3m1!4b1!4m9!1m2!2m1!1z7YWQ7KeEIOuLpOydtOusmA!3m5!1s0x354191866a43f989:0xeae648faaa01f7c3!8m2!3d33.5886892!4d130.3944106!16s%2Fg%2F11gb3y658q?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '8',
    title: '후쿠오카 타워',
    description: '하카타 만의 아름다운 오션뷰를 감상할 수 있는 랜드마크 타워',
    location: '모모치하마',
    image: require('../../assets/images/Kyushu/a9.png'),
    url: 'https://www.google.co.kr/maps/place/%ED%9B%84%EC%BF%A0%EC%98%A4%EC%B9%B4%ED%83%80%EC%9B%8C/@33.5932846,130.3489404,17z/data=!3m2!4b1!5s0x354193aa2fd67ecd:0xdb78b1edd7f3450!4m6!3m5!1s0x354193aa23040001:0xf9743b36617a912d!8m2!3d33.5932846!4d130.35151!16zL20vMDlzMXk4?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '9',
    title: '시사이드 모모치 해변 공원',
    description: '이국적인 휴양지 분위기를 가진 도심 속 해변 공원',
    location: '모모치하마',
    image: require('../../assets/images/Kyushu/a10.png'),
    url: 'https://www.google.co.kr/maps/place/%EC%8B%9C%EC%82%AC%EC%9D%B4%EB%93%9C+%EB%AA%A8%EB%AA%A8%EC%B9%98+%ED%95%B4%EB%B3%80%EA%B3%B5%EC%9B%90/@33.5923615,130.3497117,16z/data=!4m10!1m2!2m1!1z66qo66qo7LmYIO2VtOuzgCDqs7Xsm5A!3m6!1s0x354193aa5b902457:0xd0acf1307f545bd4!8m2!3d33.5945933!4d130.3512594!15sChfrqqjrqqjsuZgg7ZW067OAIOqzteybkFoZIhfrqqjrqqjsuZgg7ZW067OAIOqzteybkJIBBHBhcmvgAQA!16s%2Fg%2F1tddvk25?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '10',
    title: '다자이후 덴만구',
    description: '입시 성공을 위해 많은 사람들이 찾는 일본 중요 문화재 신사',
    location: '다자이후',
    image: require('../../assets/images/Kyushu/a12.png'),
    url: 'https://www.google.co.kr/maps/place/%EB%8B%A4%EC%9E%90%EC%9D%B4%ED%9B%84+%EC%B2%9C%EB%A7%8C%EA%B6%81/@33.5213697,130.5322543,17z/data=!3m1!4b1!4m6!3m5!1s0x35419b9f2aebfbcd:0xb824d1aba75fae97!8m2!3d33.5213697!4d130.5348239!16zL20vMDd2XzAz?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '11',
    title: '스타벅스 다자이후 오모테산도점',
    description: '독특한 목조 외관이 돋보이는 스타벅스 컨셉트 스토어',
    location: '다자이후',
    image: require('../../assets/images/Kyushu/a13.png'),
    url: 'https://www.google.co.kr/maps/place/%EC%8A%A4%ED%83%80%EB%B2%85%EC%8A%A4+%EB%8B%A4%EC%9E%90%EC%9D%B4%ED%9B%84+%EC%98%A4%EB%AA%A8%ED%85%8C%EC%82%B0%EB%8F%84%EC%A0%90/@33.5197185,130.5307987,17z/data=!3m1!4b1!4m6!3m5!1s0x35419b989b610001:0x7659019bcd949d0f!8m2!3d33.5197185!4d130.5333683!16s%2Fg%2F1hc33f0z9?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '12',
    title: '하카타역',
    description: '쇼핑과 식사, 도심 전망까지 한 번에 즐길 수 있는 규슈 최대 규모의 역',
    location: '하카타',
    image: require('../../assets/images/Kyushu/a17.png'),
    url: 'https://www.google.co.kr/maps/place/%ED%95%98%EC%B9%B4%ED%83%80/@33.5897275,130.4181578,17z/data=!3m1!4b1!4m6!3m5!1s0x354191c7e6f9b375:0x2ee22b3d45b98b90!8m2!3d33.5897275!4d130.4207274!16zL20vMDIzX3Zj?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '13',
    title: '카미 가와바타 상점가',
    description: '나카스 지역 특산품을 기념품으로 구입할 수 있는 아케이드 상점가',
    location: '하카타',
    image: require('../../assets/images/Kyushu/a22.png'),
    url: 'https://www.google.co.kr/maps/place/%EC%B9%B4%EC%99%80%EB%B0%94%ED%83%80+%EC%83%81%EC%A0%90%EA%B0%80/@33.5932546,130.4063988,17z/data=!3m1!5s0x35419194d7db436f:0xd5d79a486ae03762!4m10!1m2!2m1!1z7Lm066-4IOqwgOyZgOuwlO2DgCDsg4HsoJDqsIA!3m6!1s0x354191eb4d562889:0x7cb17c65cc4038a8!8m2!3d33.593537!4d130.4083423!15sCh3subTrr7gg6rCA7JmA67CU7YOAIOyDgeygkOqwgFofIh3subTrr7gg6rCA7JmA67CU7YOAIOyDgeygkOqwgJIBD3Nob3BwaW5nX2NlbnRlcuABAA!16s%2Fg%2F1232v3r2?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '14',
    title: '구시다 신사',
    description: '매년 여름 축제가 열리는 하카타 지역 사회의 중심',
    location: '하카타',
    image: require('../../assets/images/Kyushu/a23.png'),
    url: 'https://www.google.co.kr/maps/place/%EA%B5%AC%EC%8B%9C%EB%8B%A4+%EC%8B%A0%EC%82%AC/@33.5929546,130.4078893,17z/data=!3m1!4b1!4m6!3m5!1s0x354191eaaa536a57:0xa1896c7e84458da4!8m2!3d33.5929546!4d130.4104589!16s%2Fm%2F0ds2_4l?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'
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

const KyushuPlace = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((item) => (
        <BoardItem key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};

export default KyushuPlace;

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
