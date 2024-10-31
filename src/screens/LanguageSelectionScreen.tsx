import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 支持的语言列表
const LANGUAGES = [
  {code: 'zh', name: '中文'},
  {code: 'en', name: 'English'},
  {code: 'ja', name: '日本語'},
  {code: 'ko', name: '한국어'},
  {code: 'fr', name: 'Français'},
  {code: 'de', name: 'Deutsch'},
  {code: 'es', name: 'Español'},
];

interface LanguageSelectionScreenProps {
  onLanguageSelected: () => void;
}

const LanguageSelectionScreen: React.FC<LanguageSelectionScreenProps> = ({
  onLanguageSelected,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  // 保存选择的语言
  const handleLanguageSelect = async (languageCode: string) => {
    try {
      await AsyncStorage.setItem('userLanguage', languageCode);
      await AsyncStorage.setItem('isFirstLaunch', 'false');
      setSelectedLanguage(languageCode);
      onLanguageSelected();
    } catch (error) {
      console.error('保存语言选择时出错:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>请选择您的语言</Text>
      <Text style={styles.subtitle}>Select Your Language</Text>
      <ScrollView style={styles.languageList}>
        {LANGUAGES.map(language => (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.languageButton,
              selectedLanguage === language.code && styles.selectedButton,
            ]}
            onPress={() => handleLanguageSelect(language.code)}>
            <Text
              style={[
                styles.languageText,
                selectedLanguage === language.code && styles.selectedText,
              ]}>
              {language.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 10,
    color: '#000000',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666666',
  },
  languageList: {
    flex: 1,
  },
  languageButton: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#F5F5F5',
  },
  selectedButton: {
    backgroundColor: '#007AFF',
  },
  languageText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333333',
  },
  selectedText: {
    color: '#FFFFFF',
  },
});

export default LanguageSelectionScreen;
