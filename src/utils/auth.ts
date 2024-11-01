import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthListener = (isLoggedIn: boolean) => void;

class AuthManager {
  private listeners: AuthListener[] = [];

  addListener(listener: AuthListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(isLoggedIn: boolean) {
    this.listeners.forEach(listener => listener(isLoggedIn));
  }

  async setLoggedIn(value: boolean) {
    await AsyncStorage.setItem('isLoggedIn', value ? 'true' : 'false');
    this.notifyListeners(value);
  }

  async isLoggedIn() {
    const value = await AsyncStorage.getItem('isLoggedIn');
    return value === 'true';
  }
}

export const authManager = new AuthManager();
