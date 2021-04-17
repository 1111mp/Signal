type RootStackParamList = {
  Main: undefined;
  SettingsStack: {} | undefined;
  Account: {} | undefined;
  EditName: {} | undefined;
};

type SettingsStackParamList = {
  Settings: undefined;
  Info: undefined;
};

type StackParamList = RootStackParamList & SettingsStackParamList;
