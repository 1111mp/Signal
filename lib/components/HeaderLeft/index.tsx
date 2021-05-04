import * as React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {observer} from 'mobx-react';
import {HeaderBackButton, StackNavigationProp} from '@react-navigation/stack';
import {useTargetStore} from '@/stores';

export type Props = {
  navigation: StackNavigationProp<StackParamList>;
  text?: string;
};

const HeaderLeft: React.ComponentType<Props> = observer(
  ({navigation, text}) => {
    const {themeData} = useTargetStore('userStore');

    const backHandler = () => {
      navigation.goBack();
    };

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerTitleStyle: {
          color: themeData.header_title_color,
        },
      });
    }, [themeData]);

    if (text) {
      return (
        <TouchableOpacity
          style={{marginLeft: 16}}
          activeOpacity={0.6}
          onPress={backHandler}>
          <Text
            style={{
              fontSize: 18,
              color: themeData.header_back_btn,
            }}>
            {text}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <HeaderBackButton
        tintColor={themeData.header_back_btn}
        labelVisible={false}
        onPress={() => navigation.goBack()}
      />
    );
  },
);

export default HeaderLeft;
