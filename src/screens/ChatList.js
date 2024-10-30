import React, { useEffect, useState, useContext } from 'react';
import { Image, StatusBar, StyleSheet, Text, View, FlatList, TouchableOpacity, PermissionsAndroid, Platform, Alert, ActivityIndicator } from 'react-native';
import { ref, set } from 'firebase/database';
import { database } from '../../firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

import TopLyoko from '../../assets/svg/TopLyoko.svg';

const ChatList = ({ navigation }) => {
  const [profileData, setProfileData] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const { userToken } = useContext(AuthContext);
  console.log(userToken);

  // 권한 요청 및 위치 정보 설정
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
          updateLocationAndFetchUsers();
        } else {
          console.log('위치 권한이 거부되었습니다.');
        }
      } else {
        Geolocation.requestAuthorization('always').then(() => {
          updateLocationAndFetchUsers();
        });
      }
    };

    const updateLocationAndFetchUsers = async () => {
      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
          console.log(latitude, longitude);

          await sendLocationToApi(latitude, longitude);
          fetchNearbyUsers();
        },
        (error) => {
          console.error('위치 추적 오류: ', error);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
      );
    };

    // 5분마다 위치와 유저 정보 업데이트
    const intervalId = setInterval(updateLocationAndFetchUsers, 300000);
    updateLocationAndFetchUsers();

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('https://ryoko-sketch.duckdns.org/api/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data);
          console.log('현재 사용자 정보:', data);
        } else {
          console.error('사용자 정보를 가져오는 데 실패했습니다:', response.statusText);
        }
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [userToken]);

  const sendLocationToApi = async (latitude, longitude) => {
    try {
      const response = await fetch('https://ryoko-sketch.duckdns.org/api/location/save', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude, longitude }),
      });

      if (response.ok) {
        console.log('Location updated successfully');
      } else {
        console.error('Failed to update location');
      }
    } catch (error) {
      console.error('Error sending location data:', error);
    }
  };

  const fetchProfileData = async () => {
    try {
      const response = await axios.get('https://ryoko-sketch.duckdns.org/api/profile', {
        headers: { 'Authorization': `Bearer ${userToken}` }
      });
      setProfileData(response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      Alert.alert('Error', 'Failed to fetch board data');
    } finally {
      setLoading(false);
    }
  };

  console.log('Profile Data:', profileData);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const saveUsersToFirebase = (users) => {
    users.forEach((user, index) => {
      const userRef = ref(database, `users/user_${index}`);
      set(userRef, {
        email: user.email,
        nickname: user.nickname,
      })
      .then(() => {
        console.log(`User ${index} saved successfully!`);
      })
      .catch((error) => {
        console.error(`Error saving user ${index}:`, error);
      });
    });
  };

  const fetchNearbyUsers = async () => {
    try {
      const response = await fetch('https://ryoko-sketch.duckdns.org/api/match/nearby', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        const data = await response.json();
        const topFiveUsers = data.slice(0, 5);
        setUsers(topFiveUsers);
        console.log(topFiveUsers);
        saveUsersToFirebase(topFiveUsers);
        createChatsWithUsers(topFiveUsers);
      } else {
        console.error('Failed to fetch nearby users');
      }
    } catch (error) {
      console.error('Error fetching nearby users:', error);
    }
  };

  const createChatsWithUsers = (users) => {
    if (!currentUser) {
      console.log('현재 사용자가 확인되지 않았습니다.');
      return;
    }
    users.forEach((user) => {
      const chatId = createChatId(currentUser, user);
      console.log(`Creating chat with ID: ${chatId}`);
    });
  };

  const sanitizeEmail = (email) => {
    return email.replace(/\./g, '_dot_').replace(/@/g, '_at_');
  };

  const createChatId = (user1, user2) => {
    const sanitizedUser1 = sanitizeEmail(user1.email);
    const sanitizedUser2 = sanitizeEmail(user2.email);
    return [sanitizedUser1, sanitizedUser2].sort().join('AND');
  };

  const handleUserPress = (user) => {
    if (!currentUser) {
      Alert.alert('오류', '현재 사용자가 확인되지 않았습니다.');
      return;
    }

    const chatId = createChatId(currentUser, user);
    navigation.navigate('ChatApp', { chatId, otherUser: user });
  };

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
      <View style={{ height: 310, paddingLeft: 10, paddingRight: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#ddd' }}>
        {currentLocation ? (
          <MapView
            style={{ flex: 1, borderRadius: 15 }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.08,
              longitudeDelta: 0.03,
            }}
          >
            <Marker coordinate={currentLocation} description="내 위치">
              <View style={styles.customMarker}>
                <Image
                  source={profileData && profileData.profileImageUrl ? { uri: profileData.profileImageUrl } : require('../../assets/images/defaultUser.jpeg')}
                  style={styles.markerImage}
                />
              </View>
            </Marker>
            {users.map((user, index) => (
              user.latitude && user.longitude && (
                <Marker
                  key={index}
                  coordinate={{ latitude: user.latitude, longitude: user.longitude }}
                  description={user.nickname}
                >
                  <View style={styles.customMarkerNearby}>
                    <Image
                      source={user.profileImageUrl ? { uri: user.profileImageUrl } : require('../../assets/images/defaultUser.jpeg')}
                      style={styles.markerImage}
                    />
                  </View>
                </Marker>
              )
            ))}
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
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleUserPress(item)} style={styles.userContainer}>
              <Image
                source={item.profileImageUrl ? { uri: item.profileImageUrl } : require('../../assets/images/defaultUser.jpeg')}
                style={{
                  resizeMode: 'cover',
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  borderColor: '#ddd',
                  borderWidth: 1,
                }}
              />
              <View>
                <Text style={styles.nickname}>{item.nickname || item.email}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.email} numberOfLines={1}>{item.birth.split('-')[0] || '??'}년생</Text>
                  <Text style={styles.email}>{item.gender === 'MALE' ? '남성' : item.gender === 'FEMALE' ? '여성' : '??성'}</Text>
                  <Text style={styles.email}>{item.nationality === 'KOREAN' ? '한국인' : item.nationality === 'JAPANESE' ? '일본인' : '??인'}</Text>
                </View>
              </View>
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingLeft: 10,
  },
  email: {
    fontSize: 14,
    color: '#888',
    paddingLeft: 10,
    flexDirection: 'row',
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
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // 반투명 빨간 배경
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
  customMarkerNearby: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35 / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // 반투명 파란 배경
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,  // 그림자를 둥글게 퍼지게
    elevation: 5, // Android 전용 그림자 설정
  },
});
