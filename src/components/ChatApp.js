import React, { useState, useEffect, useRef, useContext } from 'react';
import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { database } from '../../firebase';  // Firebase 설정을 가져옴
import { ref, push, onValue } from 'firebase/database';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../contexts/AuthContext';

import TopLyoko from '../../assets/svg/TopLyoko.svg';

// Message 컴포넌트
const Message = ({ isLeft, message, user, timestamp }) => (
  <View
    style={[
      styles.messageContainer,
      isLeft ? styles.leftMessage : styles.rightMessage,
    ]}
  >
    <Text style={isLeft ? styles.messageText : styles.messageText2}>{message}</Text>
    <Text style={isLeft ? styles.messageTimestamp : styles.messageTimestamp2}>{new Date(timestamp).toLocaleTimeString()}</Text>
  </View>
);

const ChatApp = ({ route, navigation }) => {
  const { chatId, otherUser } = route.params; // route에서 chatId와 상대방 사용자 정보 전달 받음
  const [message, setMessage] = useState('');            // 입력한 메시지
  const [messages, setMessages] = useState([]);          // 채팅 메시지 목록
  const [currentUser, setCurrentUser] = useState(null);  // 현재 사용자 정보
  const scrollView = useRef();
  const { userToken } = useContext(AuthContext); // AuthContext에서 userToken 가져오기

  // API를 통해 현재 사용자 정보 가져오기
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
          setCurrentUser(data);  // API에서 받아온 사용자 정보를 currentUser에 설정
          console.log('현재 사용자 정보:', data);
        } else {
          console.error('사용자 정보를 가져오는 데 실패했습니다:', response.statusText);
        }
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error);
      }
    };

    fetchCurrentUser();
  }, [userToken]);

  // Firebase에서 메시지 가져오기
  useEffect(() => {
    const messagesRef = ref(database, `chats/${chatId}/messages`); // chats/{chatId}/messages 경로 사용
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedMessages = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setMessages(loadedMessages);
      } else {
        console.log("메시지가 없습니다.");
      }
    });
  }, [chatId]);

  // 메시지를 전송하는 함수
  const sendMessage = () => {
    if (message.trim() === '') return;

    const messagesRef = ref(database, `chats/${chatId}/messages`);
    push(messagesRef, {
      text: message,
      user: currentUser?.email || "Anonymous",  // 사용자 이메일 저장
      timestamp: Date.now(),  // 타임스탬프 추가
    })
    .then(() => {
      setMessage('');
    })
    .catch((error) => {
      console.error('메시지 전송 에러:', error);
    });
  };

  return (
    <SafeAreaView
            style={{
                width: '100%',
                backgroundColor: 'white',
                flex: 1,
        }}>
            <View 
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:'space-between',
                    padding: 10,
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{paddingLeft: 5, paddingBottom: 10}}>취소</Text>
                </TouchableOpacity>
                <TopLyoko />
                <TouchableOpacity>
                    <Text style={{ color: '#ffffff', paddingRight: 5, paddingBottom: 10}}>완료</Text>
                </TouchableOpacity>
            </View>
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0} // iOS에서 키보드 높이 보정
    >
      {/* 메시지 리스트 */}
      <ScrollView
        style={styles.messageList}
        ref={scrollView}
        onContentSizeChange={() => {
          scrollView.current.scrollToEnd({ animated: true });
        }}
      >
        {messages.map((msg) => (
          <Message
            key={msg.id}
            isLeft={msg.user !== currentUser?.email}  // 자신과 상대방 메시지 구분
            message={msg.text}
            user={msg.user}
            timestamp={msg.timestamp}  // 타임스탬프 전달
          />
        ))}
      </ScrollView>

      {/* 채팅 입력창 */}
      <View style={Platform.OS === "ios" ? styles.inputContainer : styles.inputContainer2}>
        <View style={styles.innerContainer}>
          <View style={styles.inputAndMicrophone}>
            <TouchableOpacity style={styles.emoticonButton}>
              <Feather name="camera" size={25} color="#767676" />
            </TouchableOpacity>
            <TextInput
              value={message}
              multiline
              placeholder="메시지를 입력하세요..."
              placeholderTextColor="#767676"
              style={styles.input}
              onChangeText={(text) => setMessage(text)}
            />
          </View>
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <FontAwesome name="send" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  messageList: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  messageContainer: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  leftMessage: {
    backgroundColor: '#e1e1e1',
    alignSelf: 'flex-start',
  },
  rightMessage: {
    backgroundColor: '#ef4141',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: '#000000',
    fontSize: 16,
  },
  messageText2: {
    color: '#ffffff',
    fontSize: 16,
  },
  messageTimestamp: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
    alignSelf: 'flex-end',
  },
  messageTimestamp2: {
    marginTop: 5,
    fontSize: 12,
    color: '#ffffff',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 0,
    marginBottom: 0,
  },
  inputContainer2: {
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 0,
    marginBottom: 20,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  inputAndMicrophone: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#eeeeee',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    maxHeight: 100,
    fontSize: 16,
    paddingBottom: 4
  },
  emoticonButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    backgroundColor: '#ef4141',
    borderRadius: 50,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});