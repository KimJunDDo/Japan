import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import TopLyoko from '../../assets/svg/TopLyoko.svg';

const DetailBoard = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;

  console.log(item);
  const imageUrl = item.boardImages && item.boardImages.length > 0 && item.boardImages[0].url
        ? `${item.boardImages[0].url}`
        : 'https://via.placeholder.com/100';

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
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.headerImage}
        />
      </View>
      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>{item.title}</Text>
        <Text style={styles.detailsName}>{item.nickname}</Text>
        <Text style={styles.detailsDescription}>{item.content}</Text>
      </View>
      </ScrollView>
      {/* Actions Section */}
      <View style={styles.actionsContainer}>
          <Text style={styles.contactText}>{item.name}</Text>
          <Text style={styles.phoneNumberText}>{item.date}</Text>
      </View>

      {/* Purchase Section */}
      <View style={styles.purchaseContainer}>
        <TouchableOpacity style={styles.wishlistButton}>
          <AntDesign name="like2" size={24} color="#000" />
          <Text style={styles.wishlistCount}>{item.recommendations}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.purchaseButton}>
          <Text style={styles.purchaseText}>추천하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    position: 'relative',
    paddingLeft: 10,
    paddingRight: 10,
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  headerTextContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerPrice: {
    color: '#00eaff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 15,
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsName: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    textAlign: 'right',
  },
  detailsDescription: {
    fontSize: 16,
    color: '#555',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    marginLeft: 0,
    fontSize: 16,
    fontWeight: 'bold',
  },
  phoneNumberButton: {
    justifyContent: 'center',
  },
  phoneNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  purchaseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  wishlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wishlistCount: {
    marginLeft: 5,
    fontSize: 16,
  },
  purchaseButton: {
    backgroundColor: '#ef4141',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  purchaseText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailBoard;