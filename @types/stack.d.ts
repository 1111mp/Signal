type RootStackParamList = {
  Main: undefined;
  ModalParent: {} | undefined;
  ModalChild: {} | undefined;
};

type ModalParentStackParamList = {
  Settings: undefined;
  Info: undefined;
  OutWard: undefined;
  Theme: undefined;
};

type ModalChildStackParamList = {
  EditName: {} | undefined;
  Account: {} | undefined;
};

type StackParamList = RootStackParamList &
  ModalParentStackParamList &
  ModalChildStackParamList;
