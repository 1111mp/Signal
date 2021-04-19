import {observable, action, computed, makeAutoObservable} from 'mobx';
import Store from '../Store';
import {system, light, dark} from '@/theme';

type ThemeType = {
  system: typeof system;
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

const themes: ThemeType = {system, light, dark};

export default class UserStore {
  @observable isLoading: boolean = true;

  @observable setting: SettingType = {};

  @observable info: InfoType = {
    token: null,
  };

  @observable token: string | null = null;

  @observable theme: ThemeNameType | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  @computed get themeData() {
    return {...themes[this.theme!]};
  }

  @action
  setTheme = (theme: ThemeNameType) => {
    this.theme = theme;
  };

  @action
  signIn = () => {
    this.isLoading = false;
    this.token = 'test';
  };

  @action
  signOut = () => {
    this.token = null;
  };
}
