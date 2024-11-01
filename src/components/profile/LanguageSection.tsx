import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../../styles/ProfileScreen.styles';
import {LANGUAGES} from '../../constants/languages';

type Props = {
  userLanguage: string;
  setUserLanguage: (language: string) => void;
};

export const LanguageSection: React.FC<Props> = ({userLanguage, setUserLanguage}) => {
  const showLanguageSelection = () => {
    Alert.alert(
      '选择语言',
      '请选择您使用的语言',
      LANGUAGES.map(lang => ({
        text: lang.name,
        onPress: () => handleLanguageSelect(lang.code),
      })),
      {cancelable: true},
    );
  };

  const handleLanguageSelect = async (languageCode: string) => {
    try {
      await AsyncStorage.setItem('userLanguage', languageCode);
      setUserLanguage(languageCode);
    } catch (error) {
      console.error('保存语言选择时出错:', error);
      Alert.alert('错误', '保存失败，请重试');
    }
  };

  const getCurrentLanguageName = () => {
    return LANGUAGES.find(lang => lang.code === userLanguage)?.name || '未选择';
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>我说的语言</Text>
      <TouchableOpacity
        style={styles.valueContainer}
        onPress={showLanguageSelection}>
        <Text style={styles.value}>{getCurrentLanguageName()}</Text>
        <Icon name="arrow-forward-ios" size={16} color="#666666" />
      </TouchableOpacity>
    </View>
  );
};
