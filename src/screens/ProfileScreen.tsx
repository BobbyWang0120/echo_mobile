import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

const ProfileScreen: React.FC = () => {
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

  // 加载用户数据
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

  // 开始倒计时
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

  // 发送验证码
  const handleSendCode = () => {
    if (!tempPhone.trim() || tempPhone.length !== 11) {
      Alert.alert('提示', '请输入正确的手机号');
      return;
    }
    startCountdown();
    setShowVerification(true);
    Alert.alert('提示', '验证码已发送');
  };

  // 验证并保存手机号
  const handleVerifyAndSave = async () => {
    if (!verificationCode.trim() || verificationCode.length !== 6) {
      Alert.alert('提示', '请输入6位验证码');
      return;
    }

    try {
      await AsyncStorage.setItem('userPhone', tempPhone);
      setPhoneNumber(tempPhone);
      setEditingPhone(false);
      setShowVerification(false);
      setVerificationCode('');
      Alert.alert('成功', '手机号修改成功');
    } catch (error) {
      console.error('保存手机号时出错:', error);
      Alert.alert('错误', '保存失败，请重试');
    }
  };

  // 保存昵称
  const handleSaveNickname = async () => {
    if (!tempNickname.trim()) {
      Alert.alert('提示', '昵称不能为空');
      return;
    }

    try {
      await AsyncStorage.setItem('userNickname', tempNickname.trim());
      setNickname(tempNickname.trim());
      setEditingNickname(false);
    } catch (error) {
      console.error('保存昵称时出错:', error);
      Alert.alert('错误', '保存失败，请重试');
    }
  };

  // 显示语言选择
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

  // 处理语言选择
  const handleLanguageSelect = async (languageCode: string) => {
    try {
      await AsyncStorage.setItem('userLanguage', languageCode);
      setUserLanguage(languageCode);
    } catch (error) {
      console.error('保存语言选择时出错:', error);
      Alert.alert('错误', '保存失败，请重试');
    }
  };

  // 获取当前语言名称
  const getCurrentLanguageName = () => {
    return LANGUAGES.find(lang => lang.code === userLanguage)?.name || '未选择';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>我的</Text>
      </View>

      <View style={styles.content}>
        {/* 昵称设置 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>我的昵称</Text>
          {editingNickname ? (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.input}
                value={tempNickname}
                onChangeText={setTempNickname}
                placeholder="请输入昵称"
                maxLength={20}
                autoFocus
              />
              <View style={styles.editButtons}>
                <TouchableOpacity
                  style={[styles.editButton, styles.cancelButton]}
                  onPress={() => setEditingNickname(false)}>
                  <Text style={styles.editButtonTextCancel}>取消</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.editButton, styles.saveButton]}
                  onPress={handleSaveNickname}>
                  <Text style={styles.editButtonTextSave}>保存</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.valueContainer}
              onPress={() => {
                setTempNickname(nickname);
                setEditingNickname(true);
              }}>
              <Text style={styles.value}>{nickname}</Text>
              <Icon name="edit" size={20} color="#666666" />
            </TouchableOpacity>
          )}
        </View>

        {/* 语言设置 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>我说的语言</Text>
          <TouchableOpacity
            style={styles.valueContainer}
            onPress={showLanguageSelection}>
            <Text style={styles.value}>{getCurrentLanguageName()}</Text>
            <Icon name="arrow-forward-ios" size={16} color="#666666" />
          </TouchableOpacity>
        </View>

        {/* 手机号设置 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>手机号</Text>
          {editingPhone ? (
            <View style={styles.editContainer}>
              <View style={styles.phoneInputContainer}>
                <Text style={styles.countryCode}>+86</Text>
                <TextInput
                  style={styles.phoneInput}
                  value={tempPhone}
                  onChangeText={setTempPhone}
                  placeholder="请输入手机号"
                  maxLength={11}
                  keyboardType="number-pad"
                  autoFocus
                />
              </View>
              {showVerification && (
                <View style={styles.verificationContainer}>
                  <TextInput
                    style={styles.verificationInput}
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                    placeholder="请输入验证码"
                    maxLength={6}
                    keyboardType="number-pad"
                  />
                  <TouchableOpacity
                    style={[
                      styles.sendCodeButton,
                      countdown > 0 && styles.sendCodeButtonDisabled,
                    ]}
                    onPress={handleSendCode}
                    disabled={countdown > 0}>
                    <Text
                      style={[
                        styles.sendCodeText,
                        countdown > 0 && styles.sendCodeTextDisabled,
                      ]}>
                      {countdown > 0 ? `${countdown}秒后重发` : '发送验证码'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <View style={styles.editButtons}>
                <TouchableOpacity
                  style={[styles.editButton, styles.cancelButton]}
                  onPress={() => {
                    setEditingPhone(false);
                    setShowVerification(false);
                    setVerificationCode('');
                  }}>
                  <Text style={styles.editButtonTextCancel}>取消</Text>
                </TouchableOpacity>
                {showVerification ? (
                  <TouchableOpacity
                    style={[styles.editButton, styles.saveButton]}
                    onPress={handleVerifyAndSave}>
                    <Text style={styles.editButtonTextSave}>确认</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.editButton, styles.saveButton]}
                    onPress={handleSendCode}>
                    <Text style={styles.editButtonTextSave}>下一步</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.valueContainer}
              onPress={() => {
                setTempPhone(phoneNumber === '未绑定' ? '' : phoneNumber);
                setEditingPhone(true);
              }}>
              <Text style={styles.value}>{phoneNumber}</Text>
              <Icon name="edit" size={20} color="#666666" />
            </TouchableOpacity>
          )}
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
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 8,
  },
  value: {
    fontSize: 16,
    color: '#000000',
    flex: 1,
  },
  editContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 16,
  },
  input: {
    fontSize: 16,
    color: '#000000',
    padding: 0,
    marginBottom: 16,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    marginLeft: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  editButtonTextCancel: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '600',
  },
  editButtonTextSave: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  countryCode: {
    fontSize: 16,
    color: '#000000',
    marginRight: 8,
    fontWeight: '600',
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    padding: 0,
  },
  verificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  verificationInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    padding: 0,
    marginRight: 12,
  },
  sendCodeButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  sendCodeButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  sendCodeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  sendCodeTextDisabled: {
    color: '#FFFFFF',
  },
});

export default ProfileScreen;
