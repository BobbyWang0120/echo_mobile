import React, {useState, useEffect} from 'react';
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
                  style={styles.editButton}
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
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  editButton: {
    marginLeft: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  editButtonTextCancel: {
    fontSize: 16,
    color: '#666666',
  },
  editButtonTextSave: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default ProfileScreen;
