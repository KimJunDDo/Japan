import React from 'react';
import { TouchableOpacity, StatusBar, SafeAreaView, ScrollView, View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Event from '../components/Event';
import TopLyoko from '../../assets/svg/TopLyoko.svg'
import Map from '../components/Map';

// 샘플 데이터
const sampledata = [
    {
        id: '1',
        title: '오도리 공원 와봤어요!',
        image: require('../../assets/images/Hokkaido/odoripark.png'),
        name: '강냉이 1',
        date: '2024-08-01',
        recommendations: 3,
        content: '확실히 여름에 오니까 춥지도 않고, 공원에서 돌아다니기 좋아요. 그치만 보기에는 겨울이 훨씬 더 예쁜 거 같아요!',
    },
    {
        id: '2',
        title: '이치란 웨이팅 미쳐요 :(',
        image: require('../../assets/images/ichiran.jpeg'),
        name: '강냉이 2',
        date: '2023-11-14',
        recommendations: 0,
        content: '이치란 사람 너무 많아요. 거의 다 한국인인데 들어가는 데에 2시간 걸렸어요.'
    },
    {
        id: '3',
        title: '이치란 웨이팅 미쳐요 :(',
        image: require('../../assets/images/ichiran.jpeg'),
        name: '강냉이 2',
        date: '2023-11-14',
        recommendations: 0,
        content: '이치란 사람 너무 많아요. 거의 다 한국인인데 들어가는 데에 2시간 걸렸어요.'
    },
    {
        id: '4',
        title: '오도리 공원 와봤어요!',
        image: require('../../assets/images/Hokkaido/odoripark.png'),
        name: '강냉이 1',
        date: '2024-08-01',
        recommendations: 3,
        content: '확실히 여름에 오니까 춥지도 않고, 공원에서 돌아다니기 좋아요. 그치만 보기에는 겨울이 훨씬 더 예쁜 거 같아요!',
    },
    {
        id: '5',
        title: '이치란 웨이팅 미쳐요 :(',
        image: require('../../assets/images/ichiran.jpeg'),
        name: '강냉이 2',
        date: '2023-11-14',
        recommendations: 0,
        content: '이치란 사람 너무 많아요. 거의 다 한국인인데 들어가는 데에 2시간 걸렸어요.'
    },
    {
        id: '6',
        title: '이치란 웨이팅 미쳐요 :(',
        image: require('../../assets/images/ichiran.jpeg'),
        name: '강냉이 2',
        date: '2023-11-14',
        recommendations: 0,
        content: '이치란 사람 너무 많아요. 거의 다 한국인인데 들어가는 데에 2시간 걸렸어요.'
    },
    {
        id: '7',
        title: '오도리 공원 와봤어요!',
        image: require('../../assets/images/Hokkaido/odoripark.png'),
        name: '강냉이 1',
        date: '2024-08-01',
        recommendations: 3,
        content: '확실히 여름에 오니까 춥지도 않고, 공원에서 돌아다니기 좋아요. 그치만 보기에는 겨울이 훨씬 더 예쁜 거 같아요!',
    },
    {
        id: '8',
        title: '이치란 웨이팅 미쳐요 :(',
        image: require('../../assets/images/ichiran.jpeg'),
        name: '강냉이 2',
        date: '2023-11-14',
        recommendations: 0,
        content: '이치란 사람 너무 많아요. 거의 다 한국인인데 들어가는 데에 2시간 걸렸어요.'
    },
    {
        id: '9',
        title: '이치란 웨이팅 미쳐요 :(',
        image: require('../../assets/images/ichiran.jpeg'),
        name: '강냉이 2',
        date: '2023-11-14',
        recommendations: 0,
        content: '이치란 사람 너무 많아요. 거의 다 한국인인데 들어가는 데에 2시간 걸렸어요.'
    },
    // 나머지 데이터 생략
];

// BoardItem 컴포넌트를 정의하여 useNavigation 훅 사용 가능하게 만듦
const BoardItem = ({ item }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.push('DetailBoard', { item });
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.itemContents} numberOfLines={3}>{item.content}</Text>
            <Text style={styles.itemRecommend}> 👍+{item.recommendations}</Text>
        </TouchableOpacity>
    );
};

const Main = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <View style={{ justifyContent: 'center', flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center' }}>
                <TopLyoko />
            </View>
            <View style={{ height: 100 }}>
                <Event />
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.topPart}>
                    <Map style={{ paddingTop: '10' }} />
                </View>
                <View style={styles.section} />
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                                onPress={() => navigation.navigate('BoardView', { sampledata })}>
                    <Text style={{ paddingLeft: 20, paddingTop: 10, fontSize: 18, fontWeight: 'bold' }}>요즘 핫한 소식 🔥🔥</Text>
                    <Text style={{ paddingRight: 20, paddingTop: 10, fontSize: 14, color: '#ef4141' }}>더보기</Text>
                </TouchableOpacity>

                {/* Bottom part: Horizontal FlatList */}
                <FlatList
                    data={sampledata}
                    renderItem={({ item }) => <BoardItem item={item} />} // BoardItem을 renderItem으로 전달
                    keyExtractor={(item) => item.id}
                    horizontal={true} // 가로 스크롤링
                    showsHorizontalScrollIndicator={false} // 가로 스크롤 바 숨김
                    contentContainerStyle={styles.flatListContainer} // 스타일 적용
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#ffffff',
    },
    topPart: {
        padding: 0,
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
    },
    flatListContainer: {
        paddingHorizontal: 10,
        height: 220,
    },
    itemContainer: {
        padding: 0,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 10,
        marginHorizontal: 10,
        width: 180,
    },
    itemImage: {
        width: 180,
        height: 100,
        borderRadius: 8,
    },
    itemTitle: {
        fontSize: 18,
        marginTop: 5,
        fontWeight: 'bold',
    },
    itemContents: {
        fontSize: 14,
        marginTop: 2,
    },
    itemRecommend: {
        alignSelf: 'center',
        fontSize: 14,
        color: '#333',
        marginTop: 'auto',
    },
    section: {
        padding: 3,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
    },
});

export default Main;
