import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

const COUNTRY_CODES = [
  {code: '+86', country: '中国'},
  {code: '+1', country: '美国/加拿大'},
  {code: '+81', country: '日本'},
  {code: '+82', country: '韩国'},
  {code: '+44', country: '英国'},
];

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0].code);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const insets = useSafeAreaInsets();

  // 处理发送验证码
  const handleSendCode = () => {
    if (!phoneNumber.trim() || phoneNumber.length !== 11) {
      Alert.alert('提示', '请输入正确的手机号');
      return;
    }
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
  };

  // 重置到首次启动状态（仅用于开发调试）
  const handleReset = async () => {
    try {
      await AsyncStorage.multiRemove(['isFirstLaunch', 'userLanguage']);
      navigation.replace('Splash');
    } catch (error) {
      console.error('重置应用状态时出错:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* 欢迎文案 */}
      <View style={styles.header}>
        <Text style={styles.title}>欢迎使用会议翻译</Text>
      </View>

      {/* 手机号输入区域 */}
      <View style={styles.inputSection}>
        <View style={styles.phoneInputContainer}>
          {/* 国际区号选择 */}
          <TouchableOpacity
            style={styles.countryCodeButton}
            onPress={() => setShowCountryPicker(!showCountryPicker)}>
            <Text style={styles.countryCodeText}>{countryCode}</Text>
            <Icon
              name={showCountryPicker ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={20}
              color="#666666"
            />
          </TouchableOpacity>

          {/* 手机号输入框 */}
          <TextInput
            style={styles.phoneInput}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="请输入手机号"
            keyboardType="number-pad"
            maxLength={11}
          />
        </View>

        {/* 国际区号选择器 */}
        {showCountryPicker && (
          <View style={styles.countryPickerContainer}>
            {COUNTRY_CODES.map(item => (
              <TouchableOpacity
                key={item.code}
                style={styles.countryItem}
                onPress={() => {
                  setCountryCode(item.code);
                  setShowCountryPicker(false);
                }}>
                <Text style={styles.countryItemText}>
                  {item.country} {item.code}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* 获取验证码按钮 */}
        <TouchableOpacity
          style={[styles.codeButton, countdown > 0 && styles.codeButtonDisabled]}
          onPress={handleSendCode}
          disabled={countdown > 0}>
          <Text style={styles.codeButtonText}>
            {countdown > 0 ? `${countdown}秒后重发` : '获取验证码'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 隐私政策说明 */}
      <View style={[styles.privacyContainer, {paddingBottom: insets.bottom}]}>
        <Text style={styles.privacyText}>
          登录即表示同意
          <Text style={styles.privacyLink}>《服务条款》</Text>
          和
          <Text style={styles.privacyLink}>《隐私政策》</Text>
        </Text>
      </View>

      {/* 开发调试用重置按钮 */}
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>重置到首次启动状态</Text>
        <Text style={styles.resetButtonSubText}>（仅用于开发调试）</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  inputSection: {
    paddingHorizontal: 20,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  countryCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  countryCodeText: {
    fontSize: 16,
    color: '#000000',
    marginRight: 4,
  },
  phoneInput: {
    flex: 1,
    marginLeft: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  countryPickerContainer: {
    marginTop: -16,
    marginBottom: 20,
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  countryItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  countryItemText: {
    fontSize: 16,
    color: '#000000',
  },
  codeButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  codeButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  codeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  privacyContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 16,
    alignItems: 'center',
  },
  privacyText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  privacyLink: {
    color: '#000000',
  },
  resetButton: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: '#FF3B30',
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
