import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'

const eventInfo = [
    {
        id: 1,
        name: '돈키호테 할인 쿠폰',
        image: require('../../assets/images/event6.png'),
        url: 'https://japanportal.donki-global.com/coupon/cp001_en.html'
    },
    {
        id: 2,
        name: '도쿄행 에어프레미아',
        image: require('../../assets/images/event2.png'),
        url: 'https://www.airpremia.com/?utm_source=cafe&utm_medium=banner&utm_campaign=promtion&utm_content=24.0416'
    },
    {
        id: 3,
        name: '후쿠오카 버스 투어',
        image: require('../../assets/images/event3.png'),
        url: 'https://triple.guide/tna/products/bcf22eb4-862e-40bd-8be4-299597d7e585?_triple_no_navbar&is_retargeting=true&source_caller=ui&shortlink=2afpvxm3&c=navercafe_%EB%84%A4%EC%9D%BC%EB%8F%99_%ED%9B%84%EC%BF%A0%EC%98%A4%EC%B9%B4%EB%B2%84%EC%8A%A4%ED%88%AC%EC%96%B4(0920)&pid=navercafe&af_click_lookback=7d&af_xp=custom'
    },
    {
        id: 4,
        name: '일본 호텔 할인쿠폰',
        image: require('../../assets/images/event4.png'),
        url: 'https://www.hanatour.com/promotion/plan/PM00667452DF?af_force_deeplink=true&source_caller=bulk&pid=naver_int&is_retargeting=true&af_click_lookback=7d&utm_content=mkt_performance_b_banner_jpnstory_neildong_fnd_2409_banner_tr_non&utm_source=naver_int&af_live_day=20240901&shortlink=ldh5qt28&utm_medium=viral&af_adset=mkt_performance_revenue_topic_single&af_ad=neildong_fnd_2409_banner_tr_non&utm_campaign=aqu_24y_mkt_performance_revenue_topic_single_pm00667452df&deep_link_value=https%3A%2F%2Fapptour.hanatour.com%2Fdcr%2Fpromotion%2Fplan%2FPM00667452DF&af_channel=viral&af_ad_type=b_banner_jpnstory&utm_term=aug_24_5w&c=aqu_24y_mkt_performance_revenue_topic_single_pm00667452df'
    },
    {
        id: 5,
        name: '이바라키현 럭셔리 관광',
        image: require('../../assets/images/event5.png'),
        url: 'https://ibaraki-special-plans.com/?utm_source=naver&utm_medium=cpc&utm_campaign=001naver'
    },
]

const Event = () => {
  const handleImagePress = () => {
    Linking.openURL('https://www.naver.com');
  };

  return (
    <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        styles={{ paddingVertical: 20 }}
        >
        
        {eventInfo.map((data, index) => {
                return (
                    <TouchableOpacity onPress= {() => Linking.openURL(data.url)}>
                        <View
                            style={{
                                flexDirection: 'column',
                                paddingHorizontal: 1,
                                position: 'relative',
                                height: 20,
                                paddingLeft: 10,
                            }}>
                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: 15,
                                    right: 10,
                                    zIndex: 1,
                                }}>
                            </View>
                            <View
                                style={{
                                    width: 116,
                                    height: 75,
                                    backgroundColor: '#e87a54',
                                    borderRadius: 22,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Image
                                    source={data.image}
                                    style={{
                                        resizeMode: 'cover',
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 10,
                                        backgroundColor: 'orange',
                                    }}
                                />
                            </View>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 13,
                                    paddingTop: 1,
                                }}>
                                {data.name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
    </ScrollView>
  )
}

export default Event

const styles = StyleSheet.create({})