import * as React from 'react';
import {observer} from 'mobx-react';
import {HeaderBackButton, StackNavigationProp} from '@react-navigation/stack';
import {useTargetStore} from '@/stores';

export type Props = {
  navigation: StackNavigationProp<StackParamList>;
};

const HeaderLeft: React.ComponentType<Props> = observer(({navigation}) => {
  const {themeData} = useTargetStore('userStore');

  return (
    <HeaderBackButton
      tintColor={themeData.header_back_btn}
      labelVisible={false}
      onPress={() => navigation.goBack()}
    />
  );
});

export default HeaderLeft;
