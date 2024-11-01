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

type CreateMeetingScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const CreateMeetingScreen: React.FC<CreateMeetingScreenProps> = ({
  navigation,
}) => {
  const [meetingName, setMeetingName] = useState('');

  const handleCreate = () => {
    if (!meetingName.trim()) {
      Alert.alert('提示', '请输入会议名称');
      return;
    }

    // TODO: 实现创建会议的功能
    console.log('创建会议:', meetingName);
    navigation.replace('MeetingRoom', {
      meetingName: meetingName.trim(),
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.title}>创建会议</Text>
        <View style={styles.placeholder} />
      </View>
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="请输入会议名称"
            value={meetingName}
            onChangeText={setMeetingName}
            maxLength={50}
            autoFocus
          />
        </View>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreate}
          activeOpacity={0.8}>
          <Text style={styles.createButtonText}>创建</Text>
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
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  input: {
    padding: 12,
    fontSize: 16,
    color: '#000000',
  },
  createButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreateMeetingScreen;
