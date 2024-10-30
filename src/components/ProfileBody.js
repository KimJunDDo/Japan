import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../contexts/AuthContext';

const ProfileBody = () => {
    const [profileData, setProfileData] = useState(null);  // 사용자 데이터를 저장할 상태
    const [loading, setLoading] = useState(true);    // 로딩 상태 추가

    const { userToken } = useContext(AuthContext); // AuthContext에서 userToken 가져오기
    console.log(userToken);

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

    if (loading) {
        return <Text>Loading...</Text>;              // 로딩 중에는 로딩 메시지 표시
    }

    return (
        <View>        
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginBottom: 10,
            marginTop: -5,
        }}>
            <View style={{
                alignItems: 'center',
            }}>
                <Image
                    source={profileData && profileData.profileImageUrl ? { uri: profileData.profileImageUrl } : require('../../assets/images/defaultUser.jpeg')}
                    style={{
                        resizeMode: 'cover',
                        width: 80,
                        height: 80,
                        borderRadius: 100,
                        borderColor: '#ffffff',
                        borderWidth: 1,
                    }}
                />
                {/* userData가 null이 아니고 nickname 필드가 있을 때만 렌더링 */}
                {profileData && profileData.nickname ? (
                    <Text style={{
                        paddingVertical: 5,
                        fontWeight: 'bold',
                        color: '#ffffff',
                        fontSize: 15,
                    }}>
                    {profileData.nickname}</Text>
                ) : (
                    <Text style={{
                        paddingVertical: 5,
                        fontWeight: 'bold',
                        color: '#ffffff',
                        fontSize: 15,
                    }}>{profileData.email}</Text>  // 데이터가 없을 때 기본 값 표시
                )}
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#ffffff', }}>0</Text>
                <Text style={{ color: '#ffffff', marginTop: 5, marginBottom: 20 }}>게시물</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#ffffff', }}>0</Text>
                <Text style={{ color: '#ffffff',  marginTop: 5, marginBottom: 20 }}>댓글</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#ffffff', }}>0</Text>
                <Text style={{ color: '#ffffff',  marginTop: 5, marginBottom: 20 }}>스크랩</Text>
            </View>
        </View>
        </View>
    );
}

export default ProfileBody;

const styles = StyleSheet.create({});
