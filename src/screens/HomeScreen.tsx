import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 语言名称映射
const LANGUAGE_NAMES: {[key: string]: string} = {
  zh: '中文',
  en: 'English',
  ja: '日本語',
  ko: '한국어',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
};

const HomeScreen: React.FC = () => {
  const [userLanguage, setUserLanguage] = useState<string>('');

  // 获取用户选择的语言
  useEffect(() => {
    const getUserLanguage = async () => {
      try {
        const language = await AsyncStorage.getItem('userLanguage');
        if (language) {
          setUserLanguage(language);
        }
      } catch (error) {
        console.error('获取用户语言时出错:', error);
      }
    };

    getUserLanguage();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>欢迎使用Echo</Text>
      <Text style={styles.subtitle}>多语言实时翻译，让沟通无障碍</Text>
      <View style={styles.languageContainer}>
        <Text style={styles.languageLabel}>当前语言：</Text>
        <Text style={styles.languageText}>
          {LANGUAGE_NAMES[userLanguage] || '未选择'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
  },
  languageLabel: {
    fontSize: 16,
    color: '#666666',
  },
  languageText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
