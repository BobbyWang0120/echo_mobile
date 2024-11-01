import React from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../../styles/ProfileScreen.styles';

type Props = {
  nickname: string;
  setNickname: (nickname: string) => void;
  editingNickname: boolean;
  setEditingNickname: (editing: boolean) => void;
  tempNickname: string;
  setTempNickname: (nickname: string) => void;
};

export const NicknameSection: React.FC<Props> = ({
  nickname,
  setNickname,
  editingNickname,
  setEditingNickname,
  tempNickname,
  setTempNickname,
}) => {
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

  return (
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
  );
};
