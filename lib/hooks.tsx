import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {TouchableOpacity, Text} from 'react-native';

type HeaderLeftProps = {
  navigation: StackNavigationProp<StackParamList>;
  title: string;
  text: string;
};

export function useHeaderLeft({navigation, title, text}: HeaderLeftProps) {
  const backHandler = () => {
    navigation.goBack();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title,
      headerLeft: () => (
        <TouchableOpacity
          style={{marginLeft: 16}}
          activeOpacity={0.6}
          onPress={backHandler}>
          <Text style={{fontSize: 18}}>{text}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
}
