import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  MeetingRoom: {
    meetingName: string;
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'MeetingRoom'>;

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
      <View style={styles.chatArea}>
        <Text style={styles.placeholder}>聊天区域</Text>
      </View>

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
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    fontSize: 16,
    color: '#999999',
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
