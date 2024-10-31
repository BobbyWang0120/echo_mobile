import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// SplashScreen组件：展示应用Logo的欢迎页面
interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({onComplete}) => {
  useEffect(() => {
    // 1.5秒后触发完成回调
    const timer = setTimeout(() => {
      onComplete();
    }, 1500);

    // 清理定时器
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Echo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default SplashScreen;
