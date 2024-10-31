import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

// 模拟会议数据
const MOCK_MEETINGS = [
  {
    id: '1',
    name: '产品周会',
    lastUpdateTime: '2024-01-20 10:30',
    onlineCount: 8,
    isHost: true,
  },
  {
    id: '2',
    name: '技术评审会议',
    lastUpdateTime: '2024-01-19 15:45',
    onlineCount: 12,
    isHost: false,
  },
  {
    id: '3',
    name: '项目进度同步',
    lastUpdateTime: '2024-01-19 09:20',
    onlineCount: 5,
    isHost: true,
  },
  {
    id: '4',
    name: '团队建设会议',
    lastUpdateTime: '2024-01-18 14:00',
    onlineCount: 15,
    isHost: false,
  },
  {
    id: '5',
    name: '客户需求讨论',
    lastUpdateTime: '2024-01-18 11:30',
    onlineCount: 6,
    isHost: true,
  },
];

// 会议项目组件
const MeetingItem = ({
  name,
  lastUpdateTime,
  onlineCount,
  isHost,
}: {
  name: string;
  lastUpdateTime: string;
  onlineCount: number;
  isHost: boolean;
}) => (
  <TouchableOpacity style={styles.meetingItem}>
    <View style={styles.meetingHeader}>
      <Text style={styles.meetingName}>{name}</Text>
      {isHost && (
        <View style={styles.hostBadge}>
          <Text style={styles.hostText}>主持人</Text>
        </View>
      )}
    </View>
    <View style={styles.meetingFooter}>
      <Text style={styles.updateTime}>{lastUpdateTime}</Text>
      <View style={styles.onlineCount}>
        <Icon name="people" size={16} color="#666666" />
        <Text style={styles.onlineCountText}>{onlineCount}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

// 会议列表页面
const MeetingsScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [meetings, setMeetings] = useState(MOCK_MEETINGS);

  // 处理下拉刷新
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // 模拟刷新数据
    setTimeout(() => {
      // 随机调整在线人数来模拟数据更新
      const updatedMeetings = meetings.map(meeting => ({
        ...meeting,
        onlineCount: Math.floor(Math.random() * 20) + 1,
      }));
      setMeetings(updatedMeetings);
      setRefreshing(false);
    }, 1500);
  }, [meetings]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>会议</Text>
        <Icon name="add" size={24} color="#000000" style={styles.addIcon} />
      </View>
      <FlatList
        data={meetings}
        renderItem={({item}) => (
          <MeetingItem
            name={item.name}
            lastUpdateTime={item.lastUpdateTime}
            onlineCount={item.onlineCount}
            isHost={item.isHost}
          />
        )}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
      />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  addIcon: {
    padding: 4,
  },
  listContainer: {
    padding: 16,
  },
  meetingItem: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  meetingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  meetingName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  hostBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  hostText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  meetingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  updateTime: {
    fontSize: 14,
    color: '#666666',
  },
  onlineCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineCountText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666666',
  },
});

export default MeetingsScreen;
