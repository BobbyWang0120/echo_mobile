export type Language = {
  code: string;
  name: string;
  confirmText: string;
};

export const LANGUAGES: Language[] = [
  {code: 'zh', name: '中文', confirmText: '确定'},
  {code: 'en', name: 'English', confirmText: 'Confirm'},
  {code: 'ja', name: '日本語', confirmText: '確認'},
  {code: 'ko', name: '한국어', confirmText: '확인'},
  {code: 'fr', name: 'Français', confirmText: 'Confirmer'},
  {code: 'de', name: 'Deutsch', confirmText: 'Bestätigen'},
  {code: 'es', name: 'Español', confirmText: 'Confirmar'},
];
