import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import LanguageSelectionScreen from './src/screens/LanguageSelectionScreen';

// App组件：应用的根组件
const App = () => {
  // 控制是否显示欢迎页面
  const [showSplash, setShowSplash] = useState(true);
  // 控制是否是首次启动
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : isFirstLaunch ? (
        <LanguageSelectionScreen onLanguageSelected={handleLanguageSelected} />
      ) : (
        <HomeScreen />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App;
