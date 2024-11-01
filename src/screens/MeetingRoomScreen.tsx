import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import MessageBubble from '../components/MessageBubble';

type RootStackParamList = {
  MeetingRoom: {
    meetingName: string;
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'MeetingRoom'>;

// 模拟消息数据
const MOCK_MESSAGES = [
  {
    id: '1',
    message: '大家好，会议开始了',
    senderName: '张三',
    timestamp: '10:00',
    isSelf: false,
  },
  {
    id: '2',
    message: '好的，我们开始讨论第一个议题',
    senderName: '我',
    timestamp: '10:01',
    isSelf: true,
  },
  {
    id: '3',
    message: '关于新功能的开发进度，目前已经完成了70%',
    senderName: '李四',
    timestamp: '10:02',
    isSelf: false,
  },
  {
    id: '4',
    message: '预计下周可以完成全部开发工作，然后进入测试阶段',
    senderName: '李四',
    timestamp: '10:02',
    isSelf: false,
  },
  {
    id: '5',
    message: '测试团队这边已经准备好了，随时可以开始测试',
    senderName: '我',
    timestamp: '10:03',
    isSelf: true,
  },
];

const MeetingRoomScreen: React.FC<Props> = ({navigation, route}) => {
  const {meetingName} = route.params;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* 顶部信息条 */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.meetingName} numberOfLines={1}>
            {meetingName}
          </Text>
          <View style={styles.participantsInfo}>
            <Icon name="people" size={16} color="#666666" />
            <Text style={styles.participantsCount}>12</Text>
          </View>
        </View>
      </View>

      {/* 中间聊天区域 */}
      <FlatList
        data={MOCK_MESSAGES}
        renderItem={({item}) => (
          <MessageBubble
            message={item.message}
            senderName={item.senderName}
            timestamp={item.timestamp}
            isSelf={item.isSelf}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatArea}
      />

      {/* 底部控制栏 */}
      <View style={styles.controlBar}>
        <TouchableOpacity style={styles.controlButton}>
          <Icon
            name="mic"
            size={24}
            color="#FFFFFF"
            style={styles.controlIcon}
          />
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
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  meetingName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
    marginRight: 16,
  },
  participantsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  participantsCount: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  chatArea: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
  },
  controlBar: {
    height: 80,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20, // 为底部安全区域预留空间
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlIcon: {
    marginLeft: 2, // 微调图标位置使其视觉居中
  },
});

export default MeetingRoomScreen;
