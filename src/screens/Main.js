import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, StatusBar, SafeAreaView, ScrollView, View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import Event from '../components/Event';
import TopLyoko from '../../assets/svg/TopLyoko.svg';
import Map from '../components/Map';

const BoardItem = ({ item }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.push('DetailBoard', { item });
    };

    const imageUrl = item.boardImages && item.boardImages.length > 0 && item.boardImages[0].url
        ? `${item.boardImages[0].url}`
        : 'https://via.placeholder.com/100';

    console.log(item.boardImages[0].url);

    return (
        <TouchableOpacity onPress={handlePress} style={styles.itemContainer}>
            <Image source={{ uri: imageUrl }} style={styles.itemImage} />
            <Text style={styles.itemTitle} numberOfLines={1}>{item.title || 'No Title'}</Text>
            <Text style={styles.itemContents} numberOfLines={3}>{item.content || 'No Content'}</Text>
            {/*<Text style={styles.itemRecommend}> 👍+{item.recommendations || 0}</Text>*/}
        </TouchableOpacity>
    );
};

const Main = () => {
    const navigation = useNavigation();
    const { userToken } = useContext(AuthContext);
    const [boardData, setBoardData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBoardData = async () => {
        try {
            const response = await axios.get('https://ryoko-sketch.duckdns.org/api/notice', {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });
            const sortedData = response.data.content.sort((a, b) => b.id - a.id);
            setBoardData(sortedData);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            Alert.alert('Error', 'Failed to fetch board data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userToken) {
            fetchBoardData();
        } else {
            setLoading(true); // 토큰이 없을 때 로딩 상태 유지
        }
    }, [userToken]);

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#ef4141" />
            </SafeAreaView>
        );
    }

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
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                    onPress={() => navigation.navigate('BoardView')}
                >
                    <Text style={{ paddingLeft: 20, paddingTop: 10, fontSize: 18, fontWeight: 'bold' }}>핫한 최근 소식 🔥🔥</Text>
                    <Text style={{ paddingRight: 20, paddingTop: 10, fontSize: 14, color: '#ef4141' }}>더보기</Text>
                </TouchableOpacity>

                <FlatList
                    data={boardData}
                    renderItem={({ item }) => <BoardItem item={item} />}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContainer}
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