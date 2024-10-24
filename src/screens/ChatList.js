import React, { useEffect, useState } from 'react';
import { Image, StatusBar, StyleSheet, Text, View, FlatList, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { database, auth } from '../../firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import TopLyoko from '../../assets/svg/TopLyoko.svg'

const ChatList = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  // 권한 요청 및 Geolocation 설정
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: '위치 접근 권한 요청',
            message: '이 앱은 위치 정보를 사용해야 합니다.',
            buttonNeutral: '나중에 묻기',
            buttonNegative: '취소',
            buttonPositive: '확인',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          watchLocation();
        } else {
          console.log('위치 권한이 거부되었습니다.');
        }
      } else {
        // iOS 권한 요청
        Geolocation.requestAuthorization('always').then(() => {
          watchLocation();
        });
      }
    };

    const watchLocation = () => {
      const watchId = Geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
          console.log(latitude, longitude);
        },
        (error) => {
          console.error('위치 추적 오류: ', error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 10,
          timeout: 20000,
          maximumAge: 10000,
        }
      );
      return () => Geolocation.clearWatch(watchId);
    };

    requestLocationPermission();
  }, []);

  // 현재 사용자 및 사용자 목록 로드
  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      setCurrentUser(user);  // 현재 사용자 설정

      const usersRef = ref(database, 'users');
      onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const loadedUsers = Object.keys(data).map((key) => ({
            userId: key,
            nickname: data[key].nickname,
            email: data[key].email,
          }));
          setUsers(loadedUsers);
        } else {
          console.log('사용자를 찾을 수 없습니다.');
        }
      });
    } else {
      console.log('로그인된 사용자가 없습니다.');
    }
  }, []);

  const sanitizeEmail = (email) => {
    return email.replace(/\./g, '_dot_').replace(/@/g, '_at_');
  };

  const createChatId = (user1, user2) => {
    const sanitizedUser1 = sanitizeEmail(user1.email);
    const sanitizedUser2 = sanitizeEmail(user2.email);

    // 두 사용자의 이메일을 결합해 고유 채팅방 ID 생성
    return [sanitizedUser1, sanitizedUser2].sort().join('AND');
  };

  const handleUserPress = (user) => {
    if (!currentUser) {
      Alert.alert('오류', '현재 사용자가 확인되지 않았습니다.');
      return;
    }

    const chatId = createChatId(currentUser, user);  // 1:1 채팅방 ID 생성
    navigation.navigate('ChatApp', { chatId, otherUser: user });
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <View style={{ justifyContent: 'center', flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center' }}>
                <TopLyoko />
            </View>
      <View style={{ flex: 4, paddingLeft: 10, paddingRight: 10 }}>
      {currentLocation ? (
          <MapView
            style={{ flex: 1, borderRadius: 15 }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.04,
              longitudeDelta: 0.03,
            }}
          >
            <Marker
              coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }}
              description="내 위치"
            >
              <View style={styles.customMarker}>
                <Image
                  source={require('../../assets/images/heartping.jpeg')}
                  style={styles.markerImage}
                />
              </View>
            </Marker>
          </MapView>    
        ) : (
          <Text style={styles.title}>위치 정보를 가져오는 중...</Text>
        )}
      </View>
      {users.length === 0 ? (
        <Text style={styles.noUserText}>사용자가 없습니다.</Text>
      ) : (
        <FlatList
          data={users.filter((u) => currentUser && u.email !== currentUser.email)}  // 본인 제외
          keyExtractor={(item) => item.userId}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleUserPress(item)} style={styles.userContainer}>
              <Image
                    source={require('../../assets/images/heartping.jpeg')}
                    style={{
                        resizeMode: 'cover',
                        width: 40,
                        height: 40,
                        borderRadius: 100,
                        borderColor: '#ddd',
                        borderWidth: 2,
                    }}
                />
              <Text style={styles.nickname}>{item.nickname}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  userContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nickname: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingLeft: 10
  },
  email: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  noUserText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  title: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  customMarker: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35 / 2,
    backgroundColor: 'rgba(255, 0, 0, 0.6)', // 반투명 빨간 배경
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,  // 그림자를 둥글게 퍼지게
    elevation: 5, // Android 전용 그림자 설정
  },
  markerImage: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
});
