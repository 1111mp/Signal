import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {TouchableOpacity, Text} from 'react-native';
import {ThemeDataType} from '@/stores/user';

type HeaderLeftProps = {
  navigation: StackNavigationProp<StackParamList>;
  title: string;
  text?: string;
  themeData: ThemeDataType;
};

export function useHeaderLeft({
  navigation,
  title,
  text,
  themeData,
}: HeaderLeftProps) {
  const backHandler = () => {
    navigation.goBack();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions(
      Object.assign(
        {
          title,
          headerTitleStyle: {
            color: themeData.header_title_color,
          },
        },
        text
          ? {
              headerLeft: () => (
                <TouchableOpacity
                  style={{marginLeft: 16}}
                  activeOpacity={0.6}
                  onPress={backHandler}>
                  <Text
                    style={{fontSize: 18, color: themeData.header_back_btn}}>
                    {text}
                  </Text>
                </TouchableOpacity>
              ),
            }
          : {},
      ),
    );
  }, [navigation, themeData]);
}
