import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

type JoinMeetingScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const JoinMeetingScreen: React.FC<JoinMeetingScreenProps> = ({navigation}) => {
  const [inviteCode, setInviteCode] = useState('');

  const handleJoin = () => {
    if (!inviteCode.trim()) {
      Alert.alert('提示', '请输入邀请码');
      return;
    }

    // TODO: 实现加入会议的功能
    navigation.replace('MeetingRoom', {
      meetingName: '测试会议', // TODO: 从服务器获取会议名称
    });
  };

  // 处理邀请码输入，自动去除空格
  const handleInviteCodeChange = (text: string) => {
    setInviteCode(text.replace(/\s/g, ''));
  };

  // TODO: 实现扫码功能
  const handleScan = () => {
    Alert.alert('提示', '扫码功能即将上线');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.title}>加入会议</Text>
        <View style={styles.placeholder} />
      </View>
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="请输入邀请码"
            value={inviteCode}
            onChangeText={handleInviteCodeChange}
            maxLength={20}
            autoFocus
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity onPress={handleScan} style={styles.scanButton}>
            <Icon name="qr-code-scanner" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.joinButton}
          onPress={handleJoin}
          activeOpacity={0.8}>
          <Text style={styles.joinButtonText}>加入</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 4,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginHorizontal: 16,
  },
  placeholder: {
    width: 32, // 与返回按钮宽度相同，保持标题居中
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#000000',
  },
  scanButton: {
    padding: 12,
  },
  joinButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default JoinMeetingScreen;
