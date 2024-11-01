import React, {useState, useEffect, useCallback} from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {styles} from '../styles/ProfileScreen.styles';
import {NicknameSection} from '../components/profile/NicknameSection';
import {LanguageSection} from '../components/profile/LanguageSection';
import {PhoneSection} from '../components/profile/PhoneSection';
import {LogoutButton} from '../components/profile/LogoutButton';

type Props = {
  navigation: NativeStackScreenProps<any>['navigation'];
};

const ProfileScreen: React.FC<Props> = ({navigation}) => {
  const [nickname, setNickname] = useState('');
  const [editingNickname, setEditingNickname] = useState(false);
  const [tempNickname, setTempNickname] = useState('');
  const [userLanguage, setUserLanguage] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('未绑定');
  const [editingPhone, setEditingPhone] = useState(false);
  const [tempPhone, setTempPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [showVerification, setShowVerification] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const [savedNickname, savedLanguage] = await Promise.all([
        AsyncStorage.getItem('userNickname'),
        AsyncStorage.getItem('userLanguage'),
      ]);
      setNickname(savedNickname || '未设置昵称');
      setUserLanguage(savedLanguage || 'zh');
    } catch (error) {
      console.error('加载用户数据时出错:', error);
    }
  };

  const startCountdown = useCallback(() => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>我的</Text>
      </View>

      <View style={styles.content}>
        <NicknameSection
          nickname={nickname}
          setNickname={setNickname}
          editingNickname={editingNickname}
          setEditingNickname={setEditingNickname}
          tempNickname={tempNickname}
          setTempNickname={setTempNickname}
        />

        <LanguageSection
          userLanguage={userLanguage}
          setUserLanguage={setUserLanguage}
        />

        <PhoneSection
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          editingPhone={editingPhone}
          setEditingPhone={setEditingPhone}
          tempPhone={tempPhone}
          setTempPhone={setTempPhone}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          countdown={countdown}
          showVerification={showVerification}
          setShowVerification={setShowVerification}
          startCountdown={startCountdown}
        />

        <LogoutButton navigation={navigation} bottomInset={insets.bottom} />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
