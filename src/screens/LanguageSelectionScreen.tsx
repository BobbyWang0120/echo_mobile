import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Language = {
  code: string;
  name: string;
  confirmText: string;
};

// 语言列表
const LANGUAGES: Language[] = [
  {code: 'en', name: 'English', confirmText: 'Confirm'},
  {code: 'ja', name: '日本語', confirmText: '確認'},
  {code: 'zh', name: '简体中文', confirmText: '确定'},
  {code: 'ko', name: '한국어', confirmText: '확인'},
  {code: 'fr', name: 'Français', confirmText: 'Confirmer'},
  {code: 'de', name: 'Deutsch', confirmText: 'Bestätigen'},
  {code: 'es', name: 'Español', confirmText: 'Confirmar'},
  {code: 'ru', name: 'Русский', confirmText: 'Подтвердить'},
  {code: 'pt', name: 'Português', confirmText: 'Confirmar'},
  {code: 'it', name: 'Italiano', confirmText: 'Conferma'},
  {code: 'vi', name: 'Tiếng Việt', confirmText: 'Xác nhận'},
  {code: 'th', name: 'ไทย', confirmText: 'ยืนยัน'},
  {code: 'ar', name: 'العربية', confirmText: 'تأكيد'},
  {code: 'hi', name: 'हिन्दी', confirmText: 'पुष्टि करें'},
  {code: 'id', name: 'Bahasa Indonesia', confirmText: 'Konfirmasi'},
];

type Props = {
  onLanguageSelected: (languageCode: string) => void;
};

const LanguageSelectionScreen: React.FC<Props> = ({onLanguageSelected}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[2]); // 默认选中简体中文
  const [searchText, setSearchText] = useState('');
  const insets = useSafeAreaInsets();

  // 过滤语言
  const getFilteredLanguages = () => {
    if (!searchText) return LANGUAGES;
    return LANGUAGES.filter(
      lang =>
        lang.name.toLowerCase().includes(searchText.toLowerCase()) ||
        lang.code.toLowerCase().includes(searchText.toLowerCase()),
    );
  };

  const renderItem = ({item}: {item: Language}) => (
    <TouchableOpacity
      style={[
        styles.languageItem,
        item.code === selectedLanguage.code && styles.selectedItem,
      ]}
      onPress={() => setSelectedLanguage(item)}>
      <Text
        style={[
          styles.languageText,
          item.code === selectedLanguage.code && styles.selectedText,
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const handleConfirm = () => {
    onLanguageSelected(selectedLanguage.code);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Echo</Text>
      </View>

      {/* 搜索栏 */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#999999" />
        <TextInput
          style={styles.searchInput}
          placeholder="搜索语言..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#999999"
        />
        {searchText ? (
          <TouchableOpacity
            onPress={() => setSearchText('')}
            style={styles.clearButton}>
            <Icon name="close" size={20} color="#999999" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* 语言列表 */}
      <FlatList
        data={getFilteredLanguages()}
        renderItem={renderItem}
        keyExtractor={item => item.code}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          {
            paddingBottom: insets.bottom + 80,
          },
        ]}
      />

      {/* 确认按钮 */}
      <View style={[styles.buttonContainer, {paddingBottom: insets.bottom}]}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmText}>{selectedLanguage.confirmText}</Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  clearButton: {
    padding: 4,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  languageItem: {
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F8F8F8',
  },
  selectedItem: {
    backgroundColor: '#000000',
  },
  languageText: {
    fontSize: 18,
    color: '#666666',
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: '500',
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
