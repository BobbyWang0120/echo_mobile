import React from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../../styles/ProfileScreen.styles';

type Props = {
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  editingPhone: boolean;
  setEditingPhone: (editing: boolean) => void;
  tempPhone: string;
  setTempPhone: (phone: string) => void;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  countdown: number;
  showVerification: boolean;
  setShowVerification: (show: boolean) => void;
  startCountdown: () => void;
};

export const PhoneSection: React.FC<Props> = ({
  phoneNumber,
  setPhoneNumber,
  editingPhone,
  setEditingPhone,
  tempPhone,
  setTempPhone,
  verificationCode,
  setVerificationCode,
  countdown,
  showVerification,
  setShowVerification,
  startCountdown,
}) => {
  const handleSendCode = () => {
    if (!tempPhone.trim() || tempPhone.length !== 11) {
      Alert.alert('提示', '请输入正确的手机号');
      return;
    }
    startCountdown();
    setShowVerification(true);
    Alert.alert('提示', '验证码已发送');
  };

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

  return (
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
  );
};
