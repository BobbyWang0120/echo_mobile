import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Main: undefined;
  Verification: {
    phoneNumber: string;
    countryCode: string;
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Verification'>;

const CODE_LENGTH = 6;

const VerificationScreen: React.FC<Props> = ({navigation, route}) => {
  const {phoneNumber, countryCode} = route.params;
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const inputs = useRef<TextInput[]>([]);

  // 开始倒计时
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 处理输入
  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // 自动跳转到下一个输入框
    if (text && index < CODE_LENGTH - 1) {
      inputs.current[index + 1].focus();
    }

    // 检查是否所有验证码都已输入
    if (newCode.every(digit => digit !== '')) {
      // TODO: 实际验证码验证逻辑
      setTimeout(() => {
        navigation.replace('Main');
      }, 500);
    }
  };

  // 处理删除
  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
      inputs.current[index - 1].focus();
    }
  };

  // 重新发送验证码
  const handleResend = () => {
    if (countdown === 0) {
      setCountdown(60);
      // TODO: 实际重发验证码逻辑
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 返回按钮 */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000000" />
      </TouchableOpacity>

      {/* 手机号显示 */}
      <View style={styles.phoneContainer}>
        <Text style={styles.phoneLabel}>验证码已发送至</Text>
        <Text style={styles.phoneNumber}>
          {countryCode} {phoneNumber}
        </Text>
      </View>

      {/* 验证码输入框 */}
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={el => {
              if (el) inputs.current[index] = el;
            }}
            style={styles.codeInput}
            value={digit}
            onChangeText={text => handleCodeChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
          />
        ))}
      </View>

      {/* 重发按钮 */}
      <TouchableOpacity
        style={[styles.resendButton, countdown > 0 && styles.resendButtonDisabled]}
        onPress={handleResend}
        disabled={countdown > 0}>
        <Text
          style={[
            styles.resendButtonText,
            countdown > 0 && styles.resendButtonTextDisabled,
          ]}>
          {countdown > 0 ? `${countdown}秒后重新发送` : '重新发送验证码'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 16,
  },
  phoneContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 60,
  },
  phoneLabel: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  phoneNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  codeInput: {
    width: 50,
    height: 60,
    margin: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#EEEEEE',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  resendButton: {
    alignSelf: 'center',
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  resendButtonDisabled: {
    opacity: 0.6,
  },
  resendButtonText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  resendButtonTextDisabled: {
    color: '#666666',
  },
});

export default VerificationScreen;
