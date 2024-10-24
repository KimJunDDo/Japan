import React, { useContext } from 'react';
import { TouchableOpacity, View, Text, FlatList, Image, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import { AuthContext } from '../contexts/AuthContext';

import TopLyoko from '../../assets/svg/TopLyoko.svg';

// BoardItem 컴포넌트를 정의하여 useNavigation 훅 사용 가능하게 만듦
const BoardItem = ({ item }) => {
    return (
        <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.itemContents} numberOfLines={3}>{item.content}</Text>
            <Text style={styles.itemRecommend}> 👍+{item.recommendations}</Text>
        </View>
    );
};

const BoardView = ({ route }) => {
    const navigation = useNavigation();
    const { sampledata } = route.params;  // Main에서 전달된 sampledata 받기
    const { userToken } = useContext(AuthContext);
    console.log(userToken);

    return (
        <SafeAreaView
            style={{
            width: '100%',
            backgroundColor: 'white',
            flex: 1,
        }}>
        {/* 상단 네비게이션 */}
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: 10,
                paddingRight: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ paddingLeft: 5, paddingBottom: 10 }}>취소</Text>
            </TouchableOpacity>
            <TopLyoko />
            <TouchableOpacity>
                <Text style={{ color: '#ffffff', paddingRight: 5, paddingBottom: 10 }}>완료</Text>
            </TouchableOpacity>
        </View>
            <FlatList
                data={sampledata}
                renderItem={({ item }) => <BoardItem item={item} />}
                keyExtractor={(item) => item.id}
                numColumns={3}  // 3열로 설정
                contentContainerStyle={styles.flatListContainer}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
        width: '33%',  // 3열 레이아웃에서 각각 30% 너비로 설정
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
    itemRecommend: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 50,
        right: 30,
        backgroundColor: '#ef4141',  // 버튼 색상
        width: 50,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    floatingButtonText: {
        color: 'white',
        fontSize: 30,
        lineHeight: 30,
    },
});

export default BoardView;