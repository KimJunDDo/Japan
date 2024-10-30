import React, { useState, useContext } from 'react';
import { StatusBar, View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios'; // axios 추가
import { AuthContext } from '../contexts/AuthContext';

import TopLyoko from '../../assets/svg/TopLyoko.svg';

const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [imageName, setImageName] = useState('');
  const [imageType, setImageType] = useState('');
  const { userToken } = useContext(AuthContext);  // AuthContext에서 userToken 가져오기
  console.log(userToken);

  // 이미지 선택 함수
  const handleChoosePhoto = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: 'photo', quality: 1 },
      (response) => {
        if (!response.didCancel && response.assets && response.assets[0].uri) {
          setImageUri(response.assets[0].uri);
          setImageName(response.assets[0].fileName);
          setImageType(response.assets[0].type);
        }
      },
    );
  };

  // POST 요청 함수 (axios 사용)
const handleSubmit = async () => {
  if (!title || !content || !imageUri) {
    Alert.alert('Error', 'Please fill out all fields and choose an image.');
    return;
  }

  const formData = new FormData();
  
  formData.append('title', title);
  formData.append('content', content);

  formData.append('images', {
    uri: imageUri,
    name: imageName,
    type: imageType,
  });

  console.log(title);
  console.log(content);
  console.log(imageUri);

  try {
    const response = await axios.post('https://ryoko-sketch.duckdns.org/api/notice', formData, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
      },
    });

    if (response.status === 200) {
      Alert.alert('Success', 'Post Created Successfully!');
      // Reset form
      setTitle('');
      setContent('');
      setImageUri(null);
    } else {
      Alert.alert('Error', response.data.message || 'Failed to create post.');
    }
  } catch (error) {
    console.error('Error:', error);
    Alert.alert('Error', 'An error occurred while creating the post.');
  }
};


  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={{ justifyContent: 'center', flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center' }}>
        <TopLyoko />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>제목을 입력해주세요</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="제목을 작성해주세요..."
        />

        <Text style={styles.label}>멋진 사진을 올려주세요 📷📷</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={handleChoosePhoto}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Text style={styles.imagePlaceholder}>이미지</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>자유롭게 내용을 적어주세요 📝📝</Text>
        <TextInput
          style={styles.textArea}
          value={content}
          onChangeText={setContent}
          placeholder="내용을 작성해주세요..."
          multiline={true}
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.postingButton} onPress={handleSubmit}>
          <Text style={styles.postingText}>작성하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 180,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    paddingTop: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  imagePicker: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  imagePlaceholder: {
    fontSize: 16,
    color: '#888',
  },
  postingButton: {
    backgroundColor: '#ef4141',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    color: 'white',
  },
  postingText: {
    fontSize: 18,
    color: 'white',
  },
});

export default Post;
