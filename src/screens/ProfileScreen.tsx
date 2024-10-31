import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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

// 个人资料页面
const ProfileScreen: React.FC = () => {
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
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>我的</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.languageCard}>
          <Text style={styles.languageLabel}>我使用的语言</Text>
          <Text style={styles.languageValue}>
            {LANGUAGE_NAMES[userLanguage] || '未选择'}
          </Text>
        </View>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  languageCard: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 10,
    marginTop: 16,
  },
  languageLabel: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  languageValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default ProfileScreen;
