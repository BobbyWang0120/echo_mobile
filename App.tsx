import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MenuProvider} from 'react-native-popup-menu';
import {enableScreens} from 'react-native-screens';

import SplashScreen from './src/screens/SplashScreen';
import LanguageSelectionScreen from './src/screens/LanguageSelectionScreen';
import MeetingsScreen from './src/screens/MeetingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CreateMeetingScreen from './src/screens/CreateMeetingScreen';
import JoinMeetingScreen from './src/screens/JoinMeetingScreen';
import MeetingRoomScreen from './src/screens/MeetingRoomScreen';

// 启用screens
enableScreens();

// 定义导航参数类型
type RootStackParamList = {
  Splash: undefined;
  LanguageSelection: undefined;
  Main: undefined;
  CreateMeeting: undefined;
  JoinMeeting: undefined;
  MeetingRoom: {
    meetingName: string;
  };
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

// 主应用导航结构
const MainApp = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: '#8E8E93',
      tabBarStyle: {
        borderTopColor: '#EEEEEE',
      },
      headerShown: false,
    }}>
    <Tab.Screen
      name="Meetings"
      component={MeetingsScreen}
      options={{
        tabBarLabel: '会议',
        tabBarIcon: ({color, size}) => (
          <Icon name="groups" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: '我的',
        tabBarIcon: ({color, size}) => (
          <Icon name="person" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

// 主导航结构
const MainStack = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  // 检查是否是首次启动
  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const value = await AsyncStorage.getItem('isFirstLaunch');
      // 如果没有isFirstLaunch记录，说明是首次启动
      setIsFirstLaunch(value === null);
    } catch (error) {
      console.error('检查首次启动状态时出错:', error);
      setIsFirstLaunch(true); // 发生错误时默认为首次启动
    }
  };

  // 处理欢迎页面完成的回调
  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // 处理语言选择完成的回调
  const handleLanguageSelected = () => {
    setIsFirstLaunch(false);
  };

  // 如果还在检查是否首次启动，显示启动页面
  if (isFirstLaunch === null) {
    return <SplashScreen onComplete={() => {}} />;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {showSplash ? (
        <Stack.Screen name="Splash">
          {props => <SplashScreen {...props} onComplete={handleSplashComplete} />}
        </Stack.Screen>
      ) : isFirstLaunch ? (
        <Stack.Screen name="LanguageSelection">
          {props => (
            <LanguageSelectionScreen
              {...props}
              onLanguageSelected={handleLanguageSelected}
            />
          )}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="Main" component={MainApp} />
          <Stack.Screen
            name="CreateMeeting"
            component={CreateMeetingScreen}
            options={{
              headerShown: false,
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="JoinMeeting"
            component={JoinMeetingScreen}
            options={{
              headerShown: false,
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="MeetingRoom"
            component={MeetingRoomScreen}
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',
              animation: 'slide_from_right',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

// App组件：应用的根组件
const App = () => {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
          <MainStack />
        </NavigationContainer>
      </MenuProvider>
    </SafeAreaProvider>
  );
};

export default App;
