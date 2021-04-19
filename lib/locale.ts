import {findBestAvailableLanguage, getLocales} from 'react-native-localize';
import messages_en from 'locales/en/messages.json';
import messages_zh_CN from 'locales/zh_CN/messages.json';

export type LocaleType = {
  localeName: string;
  messages: {[key: string]: {message: string}};
};

const locales: {[key: string]: {[key: string]: {message: string}}} = {
  'en-US': messages_en,
  'zh-Hans-US': messages_zh_CN, // 简体中文
  'zh-Hant-TW': messages_zh_CN, // 台湾繁体中文
  'zh-Hant-HK': messages_zh_CN, // 香港地区使用的简体中文
  'zh-Hant-MO': messages_zh_CN, // 澳门使用的简体中文
  'zh-Hant-SG': messages_zh_CN, // 新加坡使用的简体中文
};

function normalizeLocaleName(locale: string) {
  if (/^en-/.test(locale)) {
    return 'en';
  }

  return locale;
}

export function getLocaleMessages(): LocaleType {
  const fallback = {languageTag: 'en-US', isRTL: false};

  const {languageTag} = getLocales()[0] || fallback;

  return {
    localeName: languageTag,
    messages: locales[languageTag],
  };
}

export default function loadLocale(): LocaleType {
  return getLocaleMessages();
}
