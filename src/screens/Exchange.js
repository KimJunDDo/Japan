import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import TopLyoko from '../../assets/svg/TopLyoko.svg';

const Exchange = () => {
  const navigation = useNavigation();

  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('JPY'); // 기본: JPY
  const [toCurrency, setToCurrency] = useState('KRW'); // 기본: KRW
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState('');
  const [isReversed, setIsReversed] = useState(false); // 환율 변환 방향

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      getExchangeRate(fromCurrency, toCurrency);
    }
  }, [fromCurrency, toCurrency]);

  const getExchangeRate = async (from, to) => {
    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from}`);
      const rate = response.data.rates[to];
      setExchangeRate(rate);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
    }
  };

  const handleConvert = () => {
    if (!amount) return;
    const result = (parseFloat(amount) * exchangeRate).toFixed(2);
    setConvertedAmount(result);
  };

  const handleInput = (value) => {
    if (value === 'clear') {
      setAmount(''); // 입력된 값을 지우기
      setConvertedAmount(''); // 변환된 값도 초기화
    } else {
      setAmount(amount + value); // 입력된 값을 추가
    }
  };

  const toggleConversion = () => {
    setIsReversed(!isReversed);
    setFromCurrency(isReversed ? 'JPY' : 'KRW');
    setToCurrency(isReversed ? 'KRW' : 'JPY');
    setAmount('');
    setConvertedAmount('');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ paddingLeft: 5, paddingBottom: 10 }}>취소</Text>
        </TouchableOpacity>
        <TopLyoko />
        <TouchableOpacity>
          <Text style={{ color: '#ffffff', paddingRight: 5, paddingBottom: 10 }}>완료</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {/* 상단 국가 이미지와 금액 */}
        <View style={styles.currencyContainer}>
          {isReversed ? (
            <Image source={{ uri: `https://flagcdn.com/w320/kr.png` }} style={styles.flag} />
          ) : (
            <Image source={{ uri: `https://flagcdn.com/w320/jp.png` }} style={styles.flag} />
          )}
          {isReversed ? (
            <Text style={styles.amount}>{amount} 원</Text>) : (
            <Text style={styles.amount}>{amount} 엔</Text>
          )}
        </View>

        <TouchableOpacity onPress={toggleConversion}>
          <AntDesign name='sync' size={30} color='#888' style={{ padding: 10 }} />
        </TouchableOpacity>

        {/* 하단 국가 이미지와 변환된 금액 */}
        <View style={styles.currencyContainer}>
          {isReversed ? (
            <Image source={{ uri: `https://flagcdn.com/w320/jp.png` }} style={styles.flag} />
          ) : (
            <Image source={{ uri: `https://flagcdn.com/w320/kr.png` }} style={styles.flag} />
          )}
          {isReversed ? (
            <Text style={styles.amount}>{convertedAmount} 엔</Text>) : (
            <Text style={styles.amount}>{convertedAmount} 원</Text>
          )}
        </View>

        {/* 숫자 입력 패드 */}
        <View style={styles.numberPad}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '00', 'clear'].map((num, index) => (
            <TouchableOpacity key={index} style={styles.numberButton} onPress={() => handleInput(num)}>
              <Text style={styles.numberText}>{num === 'clear' ? '⌫' : num}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Convert 버튼 */}
        <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
          <Text style={styles.convertButtonText}>CONVERT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Exchange;

const styles = StyleSheet.create({
  safeContainer: {
    width: '100%',
    backgroundColor: 'white',
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  currencyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  flag: {
    width: 50,
    height: 40,
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: '#888',
  },
  amount: {
    fontSize: 28,
    fontWeight: 'bold',
    borderBottomColor: '#888',
    borderBottomWidth: 1,
    width: '60%',
  },
  convertButton: {
    backgroundColor: '#ef4141',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginVertical: 20,
    width: '80%',
  },
  convertButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  numberPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '80%',
  },
  numberButton: {
    width: '30%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    marginVertical: 10,
  },
  numberText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
