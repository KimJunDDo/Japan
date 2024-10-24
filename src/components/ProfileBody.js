import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const ProfileBody = () => {
    const [userData, setUserData] = useState(null);  // 사용자 데이터를 저장할 상태
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
          fetchUserData(user.uid);                   // 사용자가 있으면 UID로 데이터 가져오기
        } else {
          console.log('User is not logged in');
          setLoading(false);                         // 사용자가 없으면 로딩 상태 해제
        }
      });

      return unsubscribe;                            // 컴포넌트 언마운트 시 리스너 해제
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
                    source={require('../../assets/images/heartping.jpeg')}
                    style={{
                        resizeMode: 'cover',
                        width: 80,
                        height: 80,
                        borderRadius: 100,
                        borderColor: '#ffffff',
                        borderWidth: 2,
                    }}
                />
                {/* userData가 null이 아니고 nickname 필드가 있을 때만 렌더링 */}
                {userData && userData.nickname ? (
                    <Text style={{
                        paddingVertical: 5,
                        fontWeight: 'bold',
                        color: '#ffffff',
                        fontSize: 15,
                    }}>
                    {userData.nickname}</Text>
                ) : (
                    <Text style={{
                        paddingVertical: 5,
                        fontWeight: 'bold',
                        color: '#ffffff',
                        fontSize: 15,
                    }}>{userData.email}</Text>  // 데이터가 없을 때 기본 값 표시
                )}
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#ffffff', }}>5</Text>
                <Text style={{ color: '#ffffff', marginTop: 5, marginBottom: 20 }}>게시물</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#ffffff', }}>7</Text>
                <Text style={{ color: '#ffffff',  marginTop: 5, marginBottom: 20 }}>댓글</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#ffffff', }}>25</Text>
                <Text style={{ color: '#ffffff',  marginTop: 5, marginBottom: 20 }}>스크랩</Text>
            </View>
        </View>
        </View>
    );
}

export default ProfileBody;

const styles = StyleSheet.create({});