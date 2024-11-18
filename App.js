import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

import Ionic from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from'react-native-vector-icons/AntDesign';

import Login from './src/screens/Login';
import DetailLogin from './src/screens/DetailLogin';
import SignUp from './src/screens/SignUp';
import Main from './src/screens/Main';
import Community from './src/screens/Community';
import Ai from './src/screens/Ai';
import MyPage from './src/screens/MyPage';
import Chat from './src/screens/Chat';
import EditProfile from './src/screens/EditProfile';
import Exchange from './src/screens/Exchange';
import DetailScreen from './src/components/DetailScreen';
import DetailBoard from './src/screens/DetailBoard';
import BoardView from './src/screens/BoardView';
import Post from './src/screens/Post';
import ChatApp from './src/components/ChatApp';
import ChatList from './src/screens/ChatList';
import Todo from './src/screens/Todo';
import HokkaidoMap from './src/components/HokkaidoMap';
import TohokuMap from './src/components/TohokuMap';
import GantoMap from './src/components/GantoMap';
import GansaiMap from './src/components/GansaiMap';
import JugokuMap from './src/components/JugokuMap';
import KyushuMap from './src/components/KyushuMap';

import app from './firebase';
import { AuthProvider } from './src/contexts/AuthContext';  // AuthProvider 가져오기
import { Provider } from 'react-redux';
import store from './redux/store';
import Conversation from './src/screens/Conversation';

const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const BottomTabScreen = () => {
    return (
    <AuthProvider>  
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarActiveTintColor: '#ef4141',
          tabBarInactiveTintColor: '#767676',
          tabBarStyle: {
            height: 80,
            backgroundColor: route.name === 'AI 추천' ? '#222' : '#ffffff', // AI 추천 탭에서만 배경색을 검정색으로 변경
          },
          
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            let IconComponent = Ionic;

            color = focused ? '#ef4141' : '#767676';
            if (route.name === '지역별 추천') {
              iconName = focused ? 'map-outline' : 'map-outline';
              size = focused ? size + 4 : size + 1;
            } else if (route.name === '포스트') {
              IconComponent = AntDesign
              iconName = 'pluscircle';
              color = '#ef4141'
              size = size + 15;
            } else if (route.name === 'AI 추천') {
              IconComponent = Material;
              iconName = focused ? 'robot-outline' : 'robot-outline';
              size = focused ? size + 4 : size + 1;
              
            } else if (route.name === '실시간 채팅') {
              iconName = focused ? 'chatbubbles-outline' : 'chatbubbles-outline';
              size = focused ? size + 4 : size + 1;
            } else if (route.name === '마이페이지') {
              iconName = focused? 'person-circle-outline' : 'person-circle-outline';
              size = focused ? size + 4 : size + 1;
            }
            return <IconComponent name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="지역별 추천" component={Main} />
        <Tab.Screen name="AI 추천" component={Ai} />
        <Tab.Screen name="포스트" component={Post} options={{tabBarLabel: () => null}}/>
        <Tab.Screen name="실시간 채팅" component={ChatList} />
        <Tab.Screen name="마이페이지" component={MyPage} />
      </Tab.Navigator>
    </AuthProvider>  
    );
  };

  return (
    <Provider store={store}>
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Bottom" component={BottomTabScreen} />
        <Stack.Screen name="DetailLogin" component={DetailLogin} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Exchange" component={Exchange} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
        <Stack.Screen name="DetailBoard" component={DetailBoard} />
        <Stack.Screen name="BoardView" component={BoardView} />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="ChatApp" component={ChatApp} />
        <Stack.Screen name="Todo" component={Todo} />
        <Stack.Screen name="Conversation" component={Conversation} />
        <Stack.Screen name="HokkaidoMap" component={HokkaidoMap} />
        <Stack.Screen name="TohokuMap" component={TohokuMap} />
        <Stack.Screen name="GantoMap" component={GantoMap} />
        <Stack.Screen name="GansaiMap" component={GansaiMap} />
        <Stack.Screen name="JugokuMap" component={JugokuMap} />
        <Stack.Screen name="KyushuMap" component={KyushuMap} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
    </Provider>  
  );
};

export default App

const styles = StyleSheet.create({})