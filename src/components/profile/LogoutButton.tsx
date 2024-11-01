import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {styles} from '../../styles/ProfileScreen.styles';
import {authManager} from '../../utils/auth';

type Props = {
  navigation: NativeStackScreenProps<any>['navigation'];
  bottomInset: number;
};

export const LogoutButton: React.FC<Props> = ({navigation, bottomInset}) => {
  const handleLogout = async () => {
    try {
      await authManager.setLoggedIn(false);
    } catch (error) {
      console.error('登出时出错:', error);
    }
  };

  return (
    <View style={[styles.logoutContainer, {marginBottom: bottomInset}]}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>退出登录</Text>
      </TouchableOpacity>
    </View>
  );
};
