import { StyleSheet, Text, View, navigation, TouchableOpacity, SafeAreaView, FlatList, ScrollView } from 'react-native'
import React from 'react';
import TodoInput from '../components/TodoInput';
import TodoItem from '../components/TodoItem';
import { useSelector } from'react-redux';
import { useNavigation } from '@react-navigation/native';
import TopLyoko from '../../assets/svg/TopLyoko.svg';

const Conversation = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeContainer}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ paddingLeft: 5, paddingBottom: 10 }}>취소</Text>
        </TouchableOpacity>
        <TopLyoko />
        <TouchableOpacity>
          <Text style={{ color: '#ffffff', paddingRight: 5, paddingBottom: 10 }}>완료</Text>
        </TouchableOpacity>
      </View>
            <ScrollView>
                <Text style={styles.normal}>기본 표현</Text>
                <Text style={styles.conversation}>안녕하세요(아침): 오하요- 고자이마스</Text>
                <Text style={styles.conversation}>안녕하세요(점심): 콘니치와</Text>
                <Text style={styles.conversation}>안녕하세요(저녁): 콤방와</Text>
                <Text style={styles.conversation}>잘 먹겠습니다: 이타다키마스</Text>
                <Text style={styles.conversation}>잘 먹었습니다: 고치소-사마데시타</Text>
                <Text style={styles.conversation}></Text>
                <Text style={styles.conversation}>네: 하이</Text>
                <Text style={styles.conversation}>아니요: 이-에</Text>
                <Text style={styles.conversation}></Text>
                <Text style={styles.conversation}>감사합니다: 아리가토-고자이마스</Text>
                <Text style={styles.conversation}>도움이 됐어요: 타스카리마시타</Text>
                <Text style={styles.conversation}>정말 고맙습니다: 도-모 스미마셍</Text>
                <Text style={styles.conversation}></Text>
                <Text style={styles.conversation}>죄송합니다: 스미마셍</Text>
                <Text style={styles.conversation}>실례했습니다: 시츠레-이타시마시타</Text>
                <Text style={styles.conversation}>미안합니다: 고멘나사이</Text>
                <Text style={styles.conversation}>괜찮아요: 다이죠-부데스</Text>
                <Text style={styles.conversation}></Text>
                <Text style={styles.conversation}>부탁드립니다: 오네가이시마스</Text>
                <Text style={styles.conversation}>저기, 죄송한데요: 아노 스미마셍</Text>
                <Text style={styles.conversation}>좀 물어봐도 될까요?: 쵿토 키이테모 이-데스까?</Text>
                <Text style={styles.conversation}></Text>
                <Text style={styles.conversation}>알겠습니다: 와카리마시타</Text>
                <Text style={styles.conversation}>잘 모르겠어요: 요쿠 와카리마셍</Text>
                <Text style={styles.conversation}>다시 한 번 말씀해주시겠어요?: 모-이치도 하나시테 모라에마스까?</Text>
                <Text style={styles.conversation}>잠시만 기다려주세요: 쵿토 맏테 쿠다사이</Text>
                <Text style={styles.normal2}>교통수단에서</Text>
                <Text style={styles.conversation}>역은 어디에요?: 에키와 도코데스까?</Text>
                <Text style={styles.conversation}>여기로 가고 싶은데요: 코코니 이키타인데스가..</Text>
                <Text style={styles.conversation}>어디서 환승하면 돼요?:도코데 노리카에레바 이-데스까?</Text>
                <Text style={styles.conversation}></Text>
                <Text style={styles.conversation}>이 버스 ○○에 가나요?: 코노 바스와 ○○니 이키마스까?</Text>
                <Text style={styles.conversation}></Text>
                <Text style={styles.conversation}>○○역까지 가주세요: ○○ 에키마데 오네가이시마스</Text>
                <Text style={styles.conversation}>여기서 내려 주세요: 코코데 오로시테 쿠다사이</Text>
                <Text style={styles.normal2}>숙소에서</Text>
                <Text style={styles.conversation}>빈방 있어요?: 쿠-시츠와 아리마스까?</Text>
                <Text style={styles.conversation}>체크인 부탁드립니다: 첵쿠인 오네가이시마스</Text>
                <Text style={styles.conversation}>몇 인실인가요?: 난닌베야데스까?</Text>
                <Text style={styles.conversation}></Text>
                <Text style={styles.conversation}>세탁할 수 있어요?: 쿠리-닝구 데키마스까?</Text>
                <Text style={styles.conversation}>조식은 뷔페인가요?: 쵸-쇼쿠와 바이킹구데스까?</Text>
                <Text style={styles.conversation}>주차장은 하루에 얼마예요?: 츄-샤죠-와 이치니치 이쿠라데스까?</Text>
            </ScrollView>
    </SafeAreaView>
    )
}

export default Conversation;

const styles = StyleSheet.create({
    safeContainer: {
        width: '100%',
        backgroundColor: 'white',
        flex: 1,
      },
      navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
      },
    pageTitle: {
        marginBottom: 35,
        paddingHorizontal: 15,
        fontSize: 54,
        fontWeight: '600'
    },
    listView: {
        flex: 1
    },
    emptyListText: {
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: 15,
        fontSize: 20,
        lineHeight: 20,
        color: '#767676'
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    normal: {
        paddingLeft: 15,
        fontSize: 25,
        color: '#000000',
        paddingHorizontal: 10,
        fontWeight: 'bold'
    },
    normal2: {
        paddingTop: 15,
        paddingLeft: 15,
        fontSize: 25,
        color: '#000000',
        paddingHorizontal: 10,
        fontWeight: 'bold'
    },
    conversation: {
        paddingTop: 5,
        paddingLeft: 15,
        fontSize: 15,
        color: '#767676',
        paddingHorizontal: 10,
        fontWeight: 'bold'
    }
})