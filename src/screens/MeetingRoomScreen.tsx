import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
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

// 生成随机消息
const generateRandomMessages = () => {
  const messages = [];
  const sampleTexts = [
    '我认为这个方案可行',
    '需要考虑一下性能问题',
    '用户体验是我们的首要考虑因素',
    '这个功能下周就能完成开发',
    '测试结果看起来不错',
    '我们需要更多的用户反馈',
    '界面设计还需要优化',
    '这个问题我们之前讨论过',
    '建议先完成核心功能',
    '时间节点需要调整一下',
  ];
  const names = ['张三', '李四', '王五', '我', '赵六'];
  const hours = ['10', '11', '12'];
  const minutes = ['00', '01', '02', '03', '04', '05'];

  for (let i = 0; i < 50; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    const hour = hours[Math.floor(Math.random() * hours.length)];
    const minute = minutes[Math.floor(Math.random() * minutes.length)];

    messages.push({
      id: i.toString(),
      message: text,
      senderName: name,
      timestamp: `${hour}:${minute}`,
      isSelf: name === '我',
    });
  }

  return messages.sort((a, b) => {
    const timeA = a.timestamp.split(':').join('');
    const timeB = b.timestamp.split(':').join('');
    return parseInt(timeA) - parseInt(timeB);
  });
};

const MOCK_MESSAGES = generateRandomMessages();

const MeetingRoomScreen: React.FC<Props> = ({navigation, route}) => {
  const {meetingName} = route.params;
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  // 发送消息
  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      message: inputText.trim(),
      senderName: '我',
      timestamp: new Date().toLocaleTimeString().slice(0, 5),
      isSelf: true,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    scrollToBottom();
  };

  // 滚动到底部
  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({animated: true});
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}>
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
          ref={flatListRef}
          data={messages}
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
          onContentSizeChange={scrollToBottom}
          onLayout={scrollToBottom}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={15}
        />

        {/* 底部控制栏 */}
        <View style={styles.controlBar}>
          {showKeyboard ? (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={setInputText}
                placeholder="输入消息..."
                multiline
                maxLength={500}
                autoFocus
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSend}
                disabled={!inputText.trim()}>
                <Icon
                  name="send"
                  size={24}
                  color={inputText.trim() ? '#007AFF' : '#999999'}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <View style={styles.placeholder} />
              <TouchableOpacity style={styles.micButton}>
                <Icon name="mic" size={32} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.keyboardButton}
                onPress={() => setShowKeyboard(true)}>
                <Icon name="keyboard" size={24} color="#666666" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
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
    minHeight: 64,
    maxHeight: 120,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
  },
  placeholder: {
    width: 40,
  },
  micButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 40,
    maxHeight: 100,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    paddingTop: 0,
    paddingBottom: 0,
    maxHeight: 80,
  },
  sendButton: {
    padding: 4,
    marginLeft: 8,
  },
});

export default MeetingRoomScreen;
