import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Svg, Rect, FeDropShadow } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

import HokkaidoMap from './HokkaidoMap';
import Japan from '../../assets/svg/Japan.svg'

const Map = () => {
  const navigation = useNavigation();
  const [showHokkaidoMap, setShowHokkaidoMap] = useState(false);

  if (showHokkaidoMap) {
    return <HokkaidoMap />;
  }

  return (
    <View style={{ position: 'relative', width: 400, height: 400 }}>
      <Japan style={{ }}/>

      {/* TouchableOpacity 위치 및 크기 조정 */}
      {/* 첫 번째 Rect (훗카이도) */}
      <TouchableOpacity
        style={{ position: 'absolute', left: 250, top: 15, width: 110, height: 100, }}
        onPress={() => navigation.push('HokkaidoMap')}>
        <Text style={{ color: '#ffffff', fontWeight: 'bold', paddingTop: 40, paddingLeft: 30 }}>훗카이도</Text>
      </TouchableOpacity>

      {/* 두 번째 Rect (도호쿠) */}
      <TouchableOpacity
        style={{ position: 'absolute', left: 240, top: 130, width: 50, height: 80, }}
        onPress={() => console.log('도호쿠 Rect pressed')}>
        <Text style={{ color: '#ffffff', fontWeight: 'bold', paddingTop: 35, paddingLeft: 10 }}>도호쿠</Text>
      </TouchableOpacity>

      {/* 세 번째 Rect (간토) */}
      <TouchableOpacity
        style={{ position: 'absolute', left: 230, top: 215, width: 50, height: 80 , }}
        onPress={() => console.log('간토 Rect pressed')}>
        <Text style={{ color: '#ffffff', fontWeight: 'bold', paddingTop: 25, paddingLeft: 10 }}>간토</Text>
      </TouchableOpacity>

      {/* 네 번째 Rect (주고쿠) */}
      <TouchableOpacity
        style={{ position: 'absolute', left: 90, top: 270, width: 60, height: 75, }}
        onPress={() => console.log('주고쿠 Rect pressed')}>
        <Text style={{ color: '#ffffff', fontWeight: 'bold', paddingTop: 16, paddingLeft: 8 }}>도호쿠</Text>
      </TouchableOpacity>

      {/* 다섯 번째 Rect (간사이) */}
      <TouchableOpacity
        style={{ position: 'absolute', left: 155, top: 230, width: 70, height: 90, }}
        onPress={() => console.log('간사이 Rect pressed')}>
        <Text style={{ color: '#ffffff', fontWeight: 'bold', paddingTop: 40, paddingLeft: 15 }}>간사이</Text>
      </TouchableOpacity>

      {/* 일곱 번째 Rect (규슈) */}
      <TouchableOpacity
        style={{ position: 'absolute', left: 40, top: 310, width: 45, height: 75, }}
        onPress={() => console.log('규슈 Rect pressed')}>
        <Text style={{ color: '#ffffff', fontWeight: 'bold', paddingTop: 20, paddingLeft: 12  }}>큐슈</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Map;
