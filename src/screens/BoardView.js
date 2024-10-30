import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, FlatList, Image, StyleSheet, SafeAreaView, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import TopLyoko from '../../assets/svg/TopLyoko.svg';

const BoardItem = ({ item }) => {
    const navigation = useNavigation();
    // 첫 번째 이미지 URL 가져오기 또는 기본 이미지 설정
    const imageUrl = item.boardImages && item.boardImages.length > 0 && item.boardImages[0].url
        ? `${item.boardImages[0].url}`
        : 'https://via.placeholder.com/100';

    console.log(item.boardImages[0].url);
    const handlePress = () => {
        navigation.push('DetailBoard', { item });
    };
    return (
        <TouchableOpacity onPress={handlePress} style={styles.itemContainer}>
            <Image source={{ uri: imageUrl }} style={styles.itemImage} />
            <Text style={styles.itemTitle} numberOfLines={1}>{item.title || 'No Title'}</Text>
            <Text style={[styles.itemContents]} numberOfLines={1}>{item.nickname || 'No User'}</Text>
            <Text style={styles.itemContents} numberOfLines={3}>{item.content || 'No Content'}</Text>
        </TouchableOpacity>
    );
};

const BoardView = () => {
    const navigation = useNavigation();
    const { userToken } = useContext(AuthContext);
    const [boardData, setBoardData] = useState([]);
    const [loading, setLoading] = useState(true);
    // 데이터 가져오는 함수
    const fetchBoardData = async () => {
        try {
            const response = await axios.get('https://ryoko-sketch.duckdns.org/api/notice', {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });
            setBoardData(response.data.content);  // content 배열을 상태로 설정
        } catch (error) {
            console.error('Failed to fetch data:', error);
            Alert.alert('Error', 'Failed to fetch board data');
        } finally {
            setLoading(false);
        }
    };

    console.log('Board Data:', boardData);  // 데이터 구조 확인

    useEffect(() => {
        fetchBoardData();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#ef4141" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ width: '100%', backgroundColor: 'white', flex: 1 }}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.headerText}>취소</Text>
                </TouchableOpacity>
                <TopLyoko />
                <TouchableOpacity>
                    <Text style={[styles.headerText, { color: '#ffffff' }]}>완료</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={boardData}
                renderItem={({ item }) => <BoardItem item={item} />}
                keyExtractor={(item) => item.id.toString()}  // long 타입 id를 문자열로 변환
                numColumns={3}
                contentContainerStyle={styles.flatListContainer}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
    },
    headerText: {
        paddingLeft: 5,
        paddingBottom: 10,
    },
    flatListContainer: {
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 5,
        marginVertical: 10,
        width: '33%',
        padding: 5,
    },
    itemImage: {
        width: '100%',
        height: 100,
        borderRadius: 5,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    itemContents: {
        fontSize: 12,
        marginBottom: 5,
    },
});

export default BoardView;
