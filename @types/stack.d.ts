type RootStackParamList = {
  Main: undefined;
  ModalParent: {} | undefined;
  ModalChild: {} | undefined;
  Test: {} | undefined;
};

type ModalParentStackParamList = {
  Settings: undefined;
  Profile: undefined;
  Appearance: undefined;
  Theme: undefined;
};

type ModalChildStackParamList = {
  EditName: {} | undefined;
  Account: {} | undefined;
};

type StackParamList = RootStackParamList &
  ModalParentStackParamList &
  ModalChildStackParamList;
