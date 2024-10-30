import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, Text, TextInput, Switch, TouchableOpacity, Image, ScrollView, StyleSheet, Modal, Alert } from 'react-native';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthContext } from '../contexts/AuthContext';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios'; // axios 추가

const EditProfile = ({ route, navigation }) => {
  const [profileData, setProfileData] = useState([]);

  const [nickname, setNickname] = useState('');
  const [sex, setSex] = useState('');
  const [birth, setBirth] = useState('');
  const [country, setCountry] = useState('');

  const [imageUri, setImageUri] = useState(null);
  const [imageName, setImageName] = useState('');
  const [imageType, setImageType] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [userData, setUserData] = useState(null); // 사용자 데이터를 저장할 상태
  const [user, setUser] = useState(null); // 인증된 사용자 정보를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const { userToken } = useContext(AuthContext); // AuthContext에서 userToken 가져오기
  console.log(userToken);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const onPressModalOpen = () => {
    console.log("개인정보 수정창을 여는 중입니다.");
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    console.log("개인정보 수정창을 닫는 중입니다.");
    setIsModalVisible(false);
  };

  const handleChoosePhoto = async () => {
    try {
      const response = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });
      
      if (!response.didCancel && response.assets && response.assets[0].uri) {
        const selectedImage = response.assets[0];
        setImageUri(selectedImage.uri);
        setImageName(selectedImage.fileName || 'profile_photo');
        setImageType(selectedImage.type);
  
        console.log("Selected Image URI:", selectedImage.uri);
        
        // 이미지 업로드 함수 호출
        await handleUploadPhoto();
      }
    } catch (error) {
      console.error('Error choosing photo:', error);
      Alert.alert('Error', 'An error occurred while choosing the photo.');
    }
  };
  
  const handleUploadPhoto = async () => {
    try {
      if (!imageUri || !imageName || !imageType) {
        Alert.alert('Error', 'Image data is missing.');
        return;
      }
  
      const formData = new FormData();
      formData.append('newProfileImage', {
        uri: imageUri,
        name: imageName,
        type: imageType,
      });
  
      console.log('FormData:', formData);
  
      const response = await axios.put('https://ryoko-sketch.duckdns.org/api/profile/image', formData, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
  
      if (response.status === 200) {
        Alert.alert('프로필 사진 등록 완료!', '프로필을 등록해주셔서 감사합니다.');
        setImageUri(null);
      } else {
        Alert.alert('Error', response.data.message || '프로필 사진 등록에 실패하였습니다.');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      Alert.alert('Error', 'An error occurred while uploading the image.');
    }
  };

  const handleSetting = async () => {
    try {
      // API 호출을 통해 회원가입 요청
      const response = await fetch('https://ryoko-sketch.duckdns.org/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          nickname: nickname,
          gender: sex,
          birth: birth,
          nationality: country
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('User profile updated successfully:', data);
        Alert.alert('프로필 정보 등록 완료!', '프로필을 등록해주셔서 감사합니다.');
        // 회원가입 성공 후 DetailLogin 페이지로 이동
        navigation.push('DetailLogin');
      } else {
        console.log('Profile update failed:', data.message || 'Unknown error');
        Alert.alert('프로필 정보 수정 실패', data.message || '오류가 발생했습니다.');
      }
    } catch (error) {
      console.log('Error updating profile:', error);
      {/*Alert.alert('프로필 수정 오류', '오류가 발생했습니다. 다시 시도하세요.');*/}
    }
  };

  const fetchProfileData = async () => {
    try {
        const response = await axios.get('https://ryoko-sketch.duckdns.org/api/profile', {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        });
        setProfileData(response.data);  // content 배열을 상태로 설정
    } catch (error) {
        console.error('Failed to fetch data:', error);
        Alert.alert('Error', 'Failed to fetch board data');
    } finally {
        setLoading(false);
    }
};

console.log('Profile Data:', profileData);  // 데이터 구조 확인

useEffect(() => {
    fetchProfileData();
}, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ paddingLeft: 5 }}>취소</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>프로필 수정</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: '#ef4141', paddingRight: 5 }}>완료</Text>
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
          <TouchableOpacity onPress={handleChoosePhoto} style={styles.settingRow}>
            <Text style={styles.settingText}>프로필 사진</Text>
            <Image
              style={styles.profileImage}
              source={{ uri: profileData.profileImageUrl }}
              />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow} onPress={onPressModalOpen}>
            <Text style={styles.settingText}>닉네임</Text>
            {profileData && profileData.nickname ? (
              <Text style={styles.subText}>{profileData.nickname}</Text>
            ) : (
              <Text style={styles.subText}>이름을 설정해주세요</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow} onPress={onPressModalOpen}>
            <Text style={styles.settingText}>성별</Text>
            {profileData && profileData.gender ? (
              <Text style={styles.subText}>{profileData.gender}</Text>
            ) : (
              <Text style={styles.subText}>성별을 설정해주세요</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow} onPress={onPressModalOpen}>
            <Text style={styles.settingText}>출생년도</Text>
            {profileData && profileData.birth ? (
              <Text style={styles.subText}>{profileData.birth}</Text>
            ) : (
              <Text style={styles.subText}>출생년도를 설정해주세요</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow} onPress={onPressModalOpen}>
            <Text style={styles.settingText}>국적</Text>
            {profileData && profileData.nationality ? (
              <Text style={styles.subText}>{profileData.nationality}</Text>
            ) : (
              <Text style={styles.subText}>국적을 설정해주세요</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* 고객 지원 및 기타 설정 */}
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

        {/* Modal */}
        <View style={{ marginTop: 400 }}>
          <Modal animationType="slide" visible={isModalVisible} transparent={true}>
            <View style={styles.modalView}>
              <View style={{ width: '150%' }}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.sectionTitle}>프로필 수정</Text>
                </View>
                <TextInput
                  placeholder="이름"
                  value={nickname}
                  onChangeText={text => setNickname(text)}
                  style={styles.inputStyle}
                />
                <TextInput
                  placeholder="성별 (MALE or FEMALE)"
                  value={sex}
                  onChangeText={text => setSex(text)}
                  style={styles.inputStyle}
                />
                <TextInput
                  placeholder="생년월일 (0000-00-00)"
                  value={birth}
                  onChangeText={text => setBirth(text)}
                  style={styles.inputStyle}
                />
                <TextInput
                  placeholder="국적 (KOREAN OR JAPANESE)"
                  value={country}
                  onChangeText={text => setCountry(text)}
                  style={styles.inputStyle}
                />
              </View>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity style={styles.modalButton} onPress={async () => { await handleSetting();  // 비동기 함수 실행 후
                  onPressModalClose(); }}>
                  <Text style={{ color: 'white' }}>저장하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={onPressModalClose}>
                  <Text style={{ color: 'white' }}>돌아가기</Text>
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
  modalButtonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    flexDirection: 'row',
  },
  modalButton: {
    backgroundColor: '#EF4141',
    width: '100%',
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  inputStyle: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EF4141',
    marginTop: 8,
  },
});

export default EditProfile;
