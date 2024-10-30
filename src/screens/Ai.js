import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'; // For the send icon

import TopLyoko from '../../assets/svg/TopLyoko.svg';

const ChatScreen = () => {
    const [chatMessages, setChatMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = async () => {
        if (inputMessage.trim() === '') return;
        console.log(inputMessage);
        console.log(JSON.stringify(inputMessage));
    
        const newMessage = {
          id: chatMessages.length + 1,
          question: inputMessage,
          isUser: true,
        };
    
        setChatMessages([...chatMessages, newMessage]);
        setInputMessage('');
    
        // ChatGPT API 호출 로직 (예시)
        try {
            const response = await fetch('https://ryoko-sketch.duckdns.org/api/gpt/question', {
              method: 'POST',
              headers: {

                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                question: inputMessage
              }),
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`HTTP error ${response.status}: ${errorText}`);
                return;
              }
              
    
            // 응답 텍스트 확인
            const data = await response.text();
            console.log('Raw response:', data); // API에서 반환된 원본 데이터를 로그로 출력
          
            // JSON으로 변환
            const parsedData = JSON.parse(data);
            
            const reply = parsedData.choices[0].message.content;
          
            const newBotMessage = {
              id: chatMessages.length + 2,
              question: reply,
              isUser: false,
            };
          
            setChatMessages((prevMessages) => [...prevMessages, newBotMessage]);
          
          } catch (error) {
            console.error('Error fetching chat GPT response:', error);
          }
          
      };

  return (
    <SafeAreaView style={{ backgroundColor: '#212121', flex:1  }}>
      <StatusBar
        barStyle="light-content"
      />
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          borderBottomColor: '#333',
          borderBottomWidth: 1,
      }}>
        <Text style={styles.headerTitle}>ChatGPT 3.5   + </Text>
        <TopLyoko />    
      </View>

      {/* Chat Scrollable Content */}
      <ScrollView
            style={styles.chatScrollView}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {chatMessages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.chatMessage,
                  message.isUser ? styles.userMessage : styles.botMessage,
                ]}
              >
                <Text style={message.isUser ? styles.userText : styles.botText}>
                  {message.question}
                </Text>
              </View>
            ))}
        </ScrollView>
        

      {/* 백그라운드 이미지로 로고 사용 */}
      <ImageBackground
        source={require('../../assets/images/ChatGPT.webp')} // 이미지 파일 경로
        style={styles.logoBackground}  // 백그라운드 이미지 스타일
        resizeMode="contain"  // 이미지 크기를 조정할 모드
      >
        {/* 이 영역에 필요한 콘텐츠 추가 가능 */}
      </ImageBackground>

      {/* 하단 메시지 입력 부분 */}
      <View style={styles.inputContainer}>
        
        <View style={styles.textInput}>
            <AntDesign name="paperclip" size={24} color="#fff" style={styles.attachmentIcon} />
            <TextInput
            style={{ fontSize: 16, color: '#fff' }}
            placeholder="메시지 ChatGPT"
            multiline
            placeholderTextColor="#888"
            value={inputMessage}
            onChangeText={(text) => setInputMessage(text)}
            />
            <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
                <AntDesign name="arrowup" size={24} color="white" />
            </TouchableOpacity>
        </View>
      </View>

      {/* 안내 문구 */}
      <Text style={styles.footerText}>ChatGPT는 실수를 할 수 있습니다. 중요한 정보를 확인하세요.</Text>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#222', // 배경을 검정색으로
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    backgroundColor: '#222',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  logoBackground: {
    position: 'absolute',
    bottom: 250, // 화면 하단에 배치
    left: 0,
    right: 0,
    height: 200, // 이미지 높이 조정
    zIndex: -1, // 다른 콘텐츠 위에 표시
    opacity: 0.2, // 이미지 투명도 설정
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#222',
    position: 'absolute',
    bottom: 15,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    color: '#fff',
    width: '100%',
    flexDirection: 'row',
  },
  sendButton: {
    backgroundColor: '#888',
    width: 35,
    height: 35,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
    position: 'absolute',
    right: 10,
  },
  attachmentIcon: {
    paddingRight: 10,
  },
  footerText: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#222"
  },
  chatScrollView: {
    flex: 1,
    padding: 10
  },
  chatMessage: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
  },
  userMessage: {
    backgroundColor: '#333',
    alignSelf: 'flex-end',
    maxWidth: '70%',
  },
  botMessage: {
    backgroundColor: '#0c090a',
    alignSelf: 'flex-start',
    maxWidth: '70%',
  },
  userText: {
    color: '#fff',
    fontSize: 16,
  },
  botText: {
    color: '#fff',
    fontSize: 16,
  },
});