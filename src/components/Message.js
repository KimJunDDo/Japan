import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Message 컴포넌트
const Message = ({ isLeft, message }) => (
  <View
    style={[
      styles.messageContainer,
      isLeft ? styles.leftMessage : styles.rightMessage,
    ]}
  >
    <Text style={styles.messageText}>{message}</Text>
  </View>
);

const ChatApp = () => {
  const [messages, setMessages] = useState([
    {
      user: 0,
      content: '도쿄에서 1박 2일 여행할 예정인데, 시간대에 따라 여행지랑 먹거리 추천해줘',
    },
    {
      user: 1,
      content:
        "오전은 아사쿠사에 있는 센소지(浅草寺): 도쿄에서 가장 유명한 사원 중 하나입니다. '카미나리몬(雷門)'이라 불리는 대문을 통해 들어가보세요.",
    },
    {
      user: 0,
      content: '밥은 뭐 먹는 게 좋을까?',
    },
    {
      user: 1,
      content:
        '아사쿠사에서의 점심을 드실 것이라면, 우나기(장어) 또는 덴푸라(튀김)을 추천드려요. 아사쿠사는 우나기와 덴푸라로 유명합니다. 지역의 전통 식당에서 일본식 점심을 즐겨보세요.',
    },
    {
      user: 0,
      content: '오후 일정도 추천해줘',
    },
  ]);

  const [message, setMessage] = useState('');
  const user = useRef(0); // 현재 사용자는 0번 유저
  const scrollView = useRef();

  // 메시지를 전송하는 함수
  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { user: user.current, content: message }]);
      setMessage(''); // 입력창 비우기
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // iOS에서 키보드 높이 보정
    >
      {/* 메시지 리스트 */}
      <ScrollView
        style={styles.messageList}
        ref={(ref) => (scrollView.current = ref)}
        onContentSizeChange={() => {
          scrollView.current.scrollToEnd({ animated: true });
        }}
      >
        {messages.map((message, index) => (
          <Message
            key={index}
            isLeft={message.user !== user.current}
            message={message.content}
          />
        ))}
      </ScrollView>

      {/* 채팅 입력창 */}
      <View style={styles.inputContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.inputAndMicrophone}>
            <TouchableOpacity style={styles.emoticonButton}>
              <Feather name="camera" size={25} color="#767676" />
            </TouchableOpacity>
            <TextInput
              value={message}
              multiline
              placeholder="AI에게 추천을 받아보세요"
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
    color: '#fff',
  },
  inputContainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 0,  // 패딩 제거
    marginBottom: -30,     // 하단 여백 제거
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
