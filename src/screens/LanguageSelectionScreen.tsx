import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

const LANGUAGES = [
  {code: 'en', name: 'English', confirmText: 'Confirm'},
  {code: 'ja', name: '日本語', confirmText: '確認'},
  {code: 'zh', name: '简体中文', confirmText: '确定'},
  {code: 'ko', name: '한국어', confirmText: '확인'},
  {code: 'fr', name: 'Français', confirmText: 'Confirmer'},
  {code: 'de', name: 'Deutsch', confirmText: 'Bestätigen'},
  {code: 'es', name: 'Español', confirmText: 'Confirmar'},
];

const {height: screenHeight} = Dimensions.get('window');
const ITEM_HEIGHT = 60;

type Props = {
  onLanguageSelected: (languageCode: string) => void;
};

const LanguageSelectionScreen: React.FC<Props> = ({onLanguageSelected}) => {
  const [selectedIndex, setSelectedIndex] = useState(2); // 默认选中简体中文
  const insets = useSafeAreaInsets();

  const renderItem = ({item, index}: {item: typeof LANGUAGES[0]; index: number}) => (
    <TouchableOpacity
      style={[
        styles.languageItem,
        index === selectedIndex && styles.selectedItem,
      ]}
      onPress={() => setSelectedIndex(index)}>
      <Text
        style={[
          styles.languageText,
          index === selectedIndex && styles.selectedText,
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const handleConfirm = () => {
    onLanguageSelected(LANGUAGES[selectedIndex].code);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Echo</Text>
      </View>

      {/* 语言列表 */}
      <FlatList
        data={LANGUAGES}
        renderItem={renderItem}
        keyExtractor={item => item.code}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        initialScrollIndex={selectedIndex - 1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          {
            paddingBottom: insets.bottom + 80,
            minHeight: screenHeight - 180, // 确保内容可以滚动
          },
        ]}
      />

      {/* 确认按钮 */}
      <View style={[styles.buttonContainer, {paddingBottom: insets.bottom}]}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmText}>
            {LANGUAGES[selectedIndex].confirmText}
          </Text>
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
  logoContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000000',
  },
  listContent: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  languageItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F8F8F8',
  },
  selectedItem: {
    backgroundColor: '#000000',
  },
  languageText: {
    fontSize: 20,
    color: '#666666',
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#EEEEEE',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  confirmButton: {
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 8,
  },
  confirmText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default LanguageSelectionScreen;
