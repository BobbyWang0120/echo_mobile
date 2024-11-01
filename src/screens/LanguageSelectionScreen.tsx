import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// 调整语言顺序，简体中文放在第三位
const LANGUAGES = [
  {code: 'en', name: 'English', confirmText: 'Confirm'},
  {code: 'ja', name: '日本語', confirmText: '確認'},
  {code: 'zh', name: '简体中文', confirmText: '确定'},
  {code: 'ko', name: '한국어', confirmText: '확인'},
  {code: 'fr', name: 'Français', confirmText: 'Confirmer'},
  {code: 'de', name: 'Deutsch', confirmText: 'Bestätigen'},
  {code: 'es', name: 'Español', confirmText: 'Confirmar'},
];

const {height} = Dimensions.get('window');
const VISIBLE_ITEMS = 5; // 显示5个选项
const ITEM_HEIGHT = Math.floor(height / 8); // 调整每个选项的高度，确保一屏能显示5个
const DEFAULT_LANGUAGE_INDEX = 2; // 简体中文的索引

type Props = {
  onLanguageSelected: (languageCode: string) => void;
};

const LanguageSelectionScreen: React.FC<Props> = ({onLanguageSelected}) => {
  const [selectedIndex, setSelectedIndex] = useState(DEFAULT_LANGUAGE_INDEX);
  const scrollY = new Animated.Value(DEFAULT_LANGUAGE_INDEX * ITEM_HEIGHT);
  const scrollViewRef = useRef<ScrollView>(null);

  // 组件加载后滚动到默认语言位置
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: DEFAULT_LANGUAGE_INDEX * ITEM_HEIGHT,
        animated: false,
      });
    }, 0);
  }, []);

  const renderItem = (item: typeof LANGUAGES[0], index: number) => {
    const position = Animated.subtract(index * ITEM_HEIGHT, scrollY);
    const scale = position.interpolate({
      inputRange: [-ITEM_HEIGHT, 0, ITEM_HEIGHT],
      outputRange: [0.8, 1.2, 0.8],
    });
    const opacity = position.interpolate({
      inputRange: [-ITEM_HEIGHT, 0, ITEM_HEIGHT],
      outputRange: [0.3, 1, 0.3],
    });

    return (
      <Animated.View
        key={index}
        style={[
          styles.itemContainer,
          {
            opacity,
            transform: [{scale}],
          },
        ]}>
        <Text style={[styles.itemText, index === selectedIndex && styles.selectedItemText]}>
          {item.name}
        </Text>
      </Animated.View>
    );
  };

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: true,
      listener: (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
        if (index !== selectedIndex && index >= 0 && index < LANGUAGES.length) {
          setSelectedIndex(index);
        }
      },
    },
  );

  const handleConfirm = () => {
    onLanguageSelected(LANGUAGES[selectedIndex].code);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Echo</Text>
      </View>

      {/* 语言选择器 */}
      <View style={styles.pickerContainer}>
        <Animated.ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          scrollEventThrottle={16}
          onScroll={handleScroll}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: (height - ITEM_HEIGHT * VISIBLE_ITEMS) / 2,
              paddingBottom: (height - ITEM_HEIGHT * VISIBLE_ITEMS) / 2,
            },
          ]}>
          {LANGUAGES.map((item, index) => renderItem(item, index))}
        </Animated.ScrollView>
      </View>

      {/* 确认按钮 */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>
          {LANGUAGES[selectedIndex].confirmText}
        </Text>
      </TouchableOpacity>
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
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 24,
    color: '#999999',
    textAlign: 'center',
  },
  selectedItemText: {
    color: '#000000',
    fontWeight: '600',
  },
  confirmButton: {
    marginHorizontal: 16,
    marginBottom: 32,
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingVertical: 16,
  },
  confirmText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default LanguageSelectionScreen;
