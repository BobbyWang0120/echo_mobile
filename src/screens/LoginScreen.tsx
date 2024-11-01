import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  // 重置到首次启动状态
  const handleReset = async () => {
    try {
      await AsyncStorage.multiRemove(['isFirstLaunch', 'userLanguage']);
      // 重启应用到首次启动状态
      navigation.replace('Splash');
    } catch (error) {
      console.error('重置应用状态时出错:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>登录</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.placeholder}>手机号登录页面（开发中）</Text>
        
        {/* 开发调试用的重置按钮 */}
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleReset}>
          <Text style={styles.resetButtonText}>重置到首次启动状态</Text>
          <Text style={styles.resetButtonSubText}>
            （仅用于开发调试）
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  placeholder: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 32,
  },
  resetButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButtonSubText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 4,
    opacity: 0.8,
  },
});

export default LoginScreen;
