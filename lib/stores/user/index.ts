import {Appearance} from 'react-native';
import {observable, action, computed, reaction, makeAutoObservable} from 'mobx';
import Store from '../Store';
import {light, dark} from '@/theme';

type ThemeType = {
  // system: typeof system;
  light: typeof light;
  dark: typeof dark;
};

export type StateType = {
  isLoading: boolean;
  isSignout: boolean;
};

type SettingType = {
  theme?: ThemeNameType;
};

type InfoType = {
  token: string | null;
};

export type ThemeDataType = typeof light | typeof dark;

const themes: ThemeType = {light, dark};

export default class UserStore {
  @observable isLoading: boolean = true;

  @observable setting: SettingType = {};

  @observable info: InfoType = {
    token: null,
  };

  @observable token: string | null = null;

  @observable theme: ThemeNameType | null = null;
  @observable appTheme: AppThemeNameType | null = null;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.theme,
      theme => {
        this.appTheme =
          theme === 'system' ? Appearance.getColorScheme()! : theme;
      },
      {
        fireImmediately: true,
      },
    );

    this.isLoading = false;
    this.theme = 'system';
    this.signIn();
  }

  @computed get themeData() {
    return {
      ...themes[this.appTheme!],
    };
  }

  @action
  setTheme = (theme: ThemeNameType) => {
    this.theme = theme;
  };

  @action
  setAppTheme = (theme: AppThemeNameType) => {
    if (this.theme !== 'system') return;
    this.appTheme = theme;
  };

  @action
  signIn = () => {
    this.token = 'test';
  };

  @action
  signOut = () => {
    this.token = null;
  };
}
