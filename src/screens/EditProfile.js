import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Switch, TouchableOpacity, Image, ScrollView, StyleSheet, Modal } from 'react-native';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const EditProfile = ({ route, navigation}) => {
    const [nickname, setNickname] = useState('');
    const [sex, setSex] = useState('');
    const [birth, setBirth] = useState('');
    const [country, setCountry] = useState('');

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEnabled, setIsEnabled] = useState(true);
    const [userData, setUserData] = useState(null);  // 사용자 데이터를 저장할 상태
    const [user, setUser] = useState(null); // 인증된 사용자 정보를 저장할 상태
    const [loading, setLoading] = useState(true);    // 로딩 상태 추가

    const db = getFirestore();                       // Firestore 인스턴스
    const auth = getAuth();                          // Firebase 인증 인스턴스

    useEffect(() => {
      const fetchUserData = async (uid) => {
        const docRef = doc(db, 'users', uid);         // Firestore에서 사용자 데이터 참조
        const docSnap = await getDoc(docRef);         // Firestore에서 데이터 가져오기
  
        if (docSnap.exists()) {
          setUserData(docSnap.data());               // 가져온 데이터를 상태에 저장
        } else {
          console.log("No such document!");
        }
        setLoading(false);                           // 로딩 완료
      };

      // Firebase 인증 상태를 감지하여 로그인된 사용자의 UID로 Firestore에서 데이터 가져오기
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user); // user 상태 저장
          fetchUserData(user.uid);                   // 사용자가 있으면 UID로 데이터 가져오기
        } else {
          console.log('User is not logged in');
          setLoading(false);                         // 사용자가 없으면 로딩 상태 해제
        }
      });

      return unsubscribe;                            // 컴포넌트 언마운트 시 리스너 해제
    }, []);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const onPressModalOpen = () => {
        console.log("개인정보 수정창을 여는 중입니다.")
        setIsModalVisible(true);
    };

    const onPressModalClose = () => {
        console.log("개인정보 수정창을 닫는 중입니다.")
        setIsModalVisible(false);
    };

    const handleSetting = async () => {
        try {
          if (user) {  // user가 있을 때만 Firestore에 설정
            const userRef = doc(db, 'users', user.uid);  // Firestore에서 사용자 문서 참조
      
            // Firestore에 사용자 정보 업데이트
            await updateDoc(userRef, {
              nickname: nickname,
              sex: sex,
              birth: birth,
              country: country,
            });
      
            setIsModalVisible(false);  // 모달을 닫습니다.
          } else {
            console.log("User not logged in.");
          }
        } catch (error) {
          console.log(error.message);
        }
      };

    if (loading) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <Text>Loading...</Text>
        </SafeAreaView>
      );
    }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View 
        style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{paddingLeft: 5}}>취소</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: 'bold', }}>프로필 수정</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: '#ef4141', paddingRight: 5}}>완료</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>알림 설정</Text>
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingText}>알림 받기</Text>
              <Text style={styles.subText}>다양한 혜택 소식을 위해 설정에서 알림을 켜주세요.</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#FEBEBE" }}
              thumbColor={isEnabled ? "#EF4141" : "#f4f3f4"}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>프로필 설정</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>프로필 사진</Text>
            <Image
              style={styles.profileImage}
              source={require('../../assets/images/heartping.jpeg')}
            />
          </View>
          <TouchableOpacity style={styles.settingRow} onPress={onPressModalOpen}>
            <Text style={styles.settingText}>닉네임</Text>
            {userData && userData.nickname ? (
                <Text style={styles.subText}>{userData.nickname}</Text>
            ) : (
                <Text style={styles.subText}>이름을 설정해주세요</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow} onPress={onPressModalOpen}>
            <Text style={styles.settingText}>성별</Text>
            {userData && userData.sex ? (
                <Text style={styles.subText}>{userData.sex}</Text>
            ) : (
                <Text style={styles.subText}>성별을 설정해주세요</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow} onPress={onPressModalOpen}>
            <Text style={styles.settingText}>출생년도</Text>
            {userData && userData.birth ? (
                <Text style={styles.subText}>{userData.birth}</Text>
            ) : (
                <Text style={styles.subText}>출생년도를 설정해주세요</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow} onPress={onPressModalOpen}>
            <Text style={styles.settingText}>국적</Text>
            {userData && userData.country ? (
                <Text style={styles.subText}>{userData.country}</Text>
            ) : (
                <Text style={styles.subText}>국적을 설정해주세요</Text>
            )}
          </TouchableOpacity> 
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>고객 지원</Text>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingText}>자주 묻는 질문</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingText}>제안/의견보내기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingText}>료코스케치 탈퇴</Text>
          </TouchableOpacity>
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>버전 정보</Text>
            <Text style={styles.subText}>0.0.1</Text>
          </View>
        </View>

        <View style={{ marginTop: 400 }}>
                <Modal
                    animationType="slide"
                    visible={isModalVisible}
                    transparent={true}
                >
                    <View style={styles.modalView}>
                        <View style={{width: '150%'}}>
                            <View style={{alignItems: 'center'}}>
                            <Text style={styles.sectionTitle}>프로필 수정</Text>
                            </View>
                            <TextInput
                            placeholder="닉네임"
                            value={nickname}
                            onChangeText={text => setNickname(text)}
                            style={{
                                backgroundColor: 'white',
                                paddingHorizontal: 15,
                                paddingVertical: 10,
                                borderRadius: 10,
                                borderWidth:1,
                                borderColor: '#EF4141',
                                marginTop: 8,
                            }}
                            />
                            <TextInput
                            placeholder="성별 (남, 여)"
                            value={sex}
                            onChangeText={text => setSex(text)}
                            style={{
                                backgroundColor: 'white',
                                paddingHorizontal: 15,
                                paddingVertical: 10,
                                borderRadius: 10,
                                borderWidth:1,
                                borderColor: '#EF4141',
                                marginTop: 8,
                            }}
                            />
                            <TextInput
                            placeholder="생년월일 (2001)"
                            value={birth}
                            onChangeText={text => setBirth(text)}
                            style={{
                                backgroundColor: 'white',
                                paddingHorizontal: 15,
                                paddingVertical: 10,
                                borderRadius: 10,
                                borderWidth:1,
                                borderColor: '#EF4141',
                                marginTop: 8,
                            }}
                            />
                            <TextInput
                            placeholder="국적 (한국, 일본)"
                            value={country}
                            onChangeText={text => setCountry(text)}
                            style={{
                                backgroundColor: 'white',
                                paddingHorizontal: 15,
                                paddingVertical: 10,
                                borderRadius: 10,
                                borderWidth:1,
                                borderColor: '#EF4141',
                                marginTop: 8,
                            }}
                            />
                        </View>
                        <View style={{width: '60%', justifyContent: 'center', alignItems: 'center', marginTop: 15, flexDirection: 'row'}}>
                            <TouchableOpacity style={{backgroundColor: '#EF4141', width: '100%', padding: 13, borderRadius: 10, alignItems: 'center', marginRight: 10}} onPress={handleSetting}>
                                <Text style={{color: 'white'}}>저장하기</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor: '#EF4141', width: '100%', padding: 13, borderRadius: 10, alignItems: 'center'}} onPress={onPressModalClose}>
                                <Text style={{color: 'white'}}>돌아가기</Text>
                            </TouchableOpacity>
                        </View>                    
                    </View>
                </Modal>
            </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingText: {
    fontSize: 16,
  },
  subText: {
    fontSize: 14,
    color: '#666',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  modalView: {
    marginTop: '100%',
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 80,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
        width: 3,
        height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
},
modalTextStyle: {
    color: '#17191c',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 10
},
});

export default EditProfile;
