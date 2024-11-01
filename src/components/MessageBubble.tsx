import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface MessageBubbleProps {
  message: string;
  senderName: string;
  timestamp: string;
  isSelf: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  senderName,
  timestamp,
  isSelf,
}) => {
  return (
    <View style={[styles.container, isSelf ? styles.selfContainer : null]}>
      {/* 发送者名称 */}
      <Text
        style={[
          styles.senderName,
          isSelf ? styles.selfSenderName : null,
        ]}>
        {senderName}
      </Text>

      {/* 消息气泡 */}
      <View
        style={[
          styles.bubble,
          isSelf ? styles.selfBubble : styles.otherBubble,
        ]}>
        <Text
          style={[
            styles.messageText,
            isSelf ? styles.selfMessageText : styles.otherMessageText,
          ]}>
          {message}
        </Text>
      </View>

      {/* 时间戳 */}
      <Text
        style={[
          styles.timestamp,
          isSelf ? styles.selfTimestamp : null,
        ]}>
        {timestamp}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  selfContainer: {
    alignSelf: 'flex-end',
  },
  senderName: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
    textAlign: 'left',
  },
  selfSenderName: {
    textAlign: 'right',
  },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: '100%',
  },
  otherBubble: {
    backgroundColor: '#F0F0F0',
    borderTopLeftRadius: 4,
  },
  selfBubble: {
    backgroundColor: '#007AFF',
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  otherMessageText: {
    color: '#000000',
  },
  selfMessageText: {
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 11,
    color: '#999999',
    marginTop: 4,
    textAlign: 'left',
  },
  selfTimestamp: {
    textAlign: 'right',
  },
});

export default MessageBubble;
