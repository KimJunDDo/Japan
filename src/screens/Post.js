import React, { useState } from 'react';
import { StatusBar, View, Text, TextInput, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'react-native-image-picker';

import TopLyoko from '../../assets/svg/TopLyoko.svg'

const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const handleChoosePhoto = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: 'photo', quality: 1 },
      (response) => {
        if (!response.didCancel && response.assets && response.assets[0].uri) {
          setImageUri(response.assets[0].uri);
        }
      },
    );
  };

  const handleSubmit = () => {
    if (!title || !content) {
      alert('Please fill out all fields.');
      return;
    }

    // You can add logic to submit the post here
    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Image URI:', imageUri);
    alert('Post Created Successfully!');
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
        placeholder="Enter post title"
      />

      <Text style={styles.label}>멋진 사진을 올려주세요 📷📷</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={handleChoosePhoto}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Upload Image</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>자유롭게 내용을 적어주세요 📝📝</Text>
      <TextInput
        style={styles.textArea}
        value={content}
        onChangeText={setContent}
        placeholder="Write something..."
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
    height: 100,
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
