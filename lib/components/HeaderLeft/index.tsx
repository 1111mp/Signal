import * as React from 'react';
import {useColorScheme} from 'react-native';
import {HeaderBackButton, StackNavigationProp} from '@react-navigation/stack';

export type Props = {
  navigation: StackNavigationProp<StackParamList>;
};

const HeaderLeft: React.ComponentType<Props> = ({navigation}) => {
  const scheme = useColorScheme();

  return (
    <HeaderBackButton
      tintColor={scheme === 'dark' ? '#F6F6F6' : '#3B3B3B'}
      labelVisible={false}
      onPress={() => navigation.goBack()}
    />
  );
};

export default HeaderLeft;
